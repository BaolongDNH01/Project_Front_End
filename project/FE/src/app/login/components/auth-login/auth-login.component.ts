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

  socialSignUpInfo: SocialSignUpInfo;

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
        this.isLoggedIn = true;
        this.reloadPage();
      },
      error: (err) => {
        console.error(err);
        this.isLogInFailed = true;
      }
    });
  }

  signInWithGoogle(): void {
    this.socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID)
      .then(data => {
        const usernameConverted = this.formatUsername.removeVietnameseTones(data.name).replace(/\s/g, '');
        this.socialSignUpInfo = new SocialSignUpInfo(
          usernameConverted,
          data.name,
          data.email,
          data.provider,
          data.id,
          data.photoUrl,
          '123123',
          ['member']
        );
        console.log(this.socialSignUpInfo);
        this.authService.signUpSocialUser(this.socialSignUpInfo).subscribe({
          next: () => {
            alert('Register successfully');
          },
          error: (err) => {
            console.log(err.message);
          }
        });

        this.loginInfo = new LoginInfo(this.socialSignUpInfo.username, this.socialSignUpInfo.userPassword);
        console.log(this.loginInfo.username);
        console.log(this.loginInfo.password);
        this.authLogin(this.loginInfo);
      });
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
