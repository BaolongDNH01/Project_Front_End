import { FormatUsernameService } from './../../services/format-username.service';
import { SocialSignUpInfo } from './../../models/social-signup-info';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { SocialAuthService, SocialUser } from 'angularx-social-login';
import { FacebookLoginProvider, GoogleLoginProvider } from 'angularx-social-login';

import { LoginInfo } from './../../models/login-info';
import { AuthService } from './../../services/auth.service';
import { JwtService } from './../../services/jwt.service';

@Component({
  selector: 'app-auth-login',
  templateUrl: './auth-login.component.html',
  styleUrls: ['./auth-login.component.css']
})
export class AuthLoginComponent implements OnInit, OnDestroy {

  subscription: Subscription;
  loginForm: FormGroup;
  loginInfo: LoginInfo;

  isLoggedIn = false;
  isLogInFailed = false;

  roles: string[] = [];
  username: string;
  authority: string;
  email: string;
  avatar: string;

  socialSignUpInfo: SocialSignUpInfo;
  socialUser: SocialUser;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private jwtService: JwtService,
    private socialAuthService: SocialAuthService,
    private formatUsername: FormatUsernameService
  ) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });

    if (this.jwtService.getToken()) {
      this.isLoggedIn = true;
      this.username = this.jwtService.getUsername();
      this.roles = this.jwtService.getAuthorities();
      this.email = this.jwtService.getEmail();
      this.avatar = this.jwtService.getAvatar();

      // Handling authorities granted
      this.roles.every(role => {
        if (role === 'ROLE_ADMIN') {
          this.authority = 'admin';
          return false;
        } else if (role === 'ROLE_MEMBER') {
          this.authority = 'member';
          return false;
        }
        return true;
      });
    }

    this.socialAuthService.authState.subscribe((user) => {
      this.socialUser = user;
      this.isLoggedIn = (user != null);
    });
  }

  onLogin(): void {
    this.loginInfo = new LoginInfo(
      this.loginForm.value.username,
      this.loginForm.value.password
    );
    this.authLogin(this.loginInfo);
  }

  authLogin(loginInfo: LoginInfo): void {
    this.subscription = this.authService.authLogin(loginInfo).subscribe({
      next: data => {
        this.jwtService.saveToken(data.token);
        this.jwtService.saveUsername(data.username);
        this.jwtService.saveAuthorities(data.authorities);
        this.jwtService.saveEmail(data.email);
        this.jwtService.saveAvatar(data.avatar);
        this.isLoggedIn = true;
        this.reloadPage();
      },
      error: (err) => {
        console.error(err);
        this.isLogInFailed = true;
      },
    });
  }

  signInWithGoogle(): void {
    this.socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID)
      .then(userData => {
        this.socialUser = userData;
        const usernameConverted = this.formatUsername.removeVietnameseTones(userData.name).replace(/\s/g, '');
        this.socialSignUpInfo = new SocialSignUpInfo(
          usernameConverted,
          userData.name,
          userData.email,
          userData.provider,
          userData.id,
          userData.photoUrl,
        );

        this.authService.signUpSocialUser(this.socialSignUpInfo).subscribe({
          next: () => {
            this.loginInfo = new LoginInfo(this.socialSignUpInfo.username, this.socialSignUpInfo.userPassword);
            this.authLogin(this.loginInfo);
          },
          error: () => {
            this.loginInfo = new LoginInfo(this.socialSignUpInfo.username, this.socialSignUpInfo.userPassword);
            this.authLogin(this.loginInfo);
          }
        });
      });
    console.log(this.socialUser);
  }

  signInWithFB(): void {
    this.socialAuthService.signIn(FacebookLoginProvider.PROVIDER_ID).then(data => console.log(data));
  }

  valid(field: string, errorCode: string): boolean {
    return (
      this.loginForm.get(field).hasError(errorCode) &&
      this.loginForm.get(field).touched
    );
  }

  logOut(): void {
    this.jwtService.logOut();
    this.reloadPage();
  }

  reloadPage(): void {
    window.location.href = '';
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
