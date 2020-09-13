import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {User} from '../user_model/User';
import {UserService} from '../user_service/user.service';
import {Router} from '@angular/router';
import {AngularFireStorage} from '@angular/fire/storage';
import {AngularFirestore} from '@angular/fire/firestore';
import {JwtService} from "../../login/services/jwt.service";
import {AuthService} from "../../login/services/auth.service";

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.css']
})
export class UpdateUserComponent implements OnInit {

  infoEditForm: FormGroup;
  userId: number;
  user: User;

  constructor(
    private formBuilder: FormBuilder,
    private jwtService: JwtService,
    private userService: UserService,
    private angularFireStorage: AngularFireStorage,
    private angularFirestore: AngularFirestore,
    private router: Router,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.infoEditForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.maxLength(50)]],
      address: ['', [Validators.required, Validators.maxLength(100)]],
      phoneNumber: ['', [Validators.required, Validators.pattern('^0[1-9]{2}[0-9]{7}$')]],
      email: ['', [Validators.required, Validators.email]],
    });

    this.getUserById();
  }

  getUserById() {
    this.userId = this.jwtService.getUser().id;
    this.userService.getUserById(this.userId).subscribe(data => {
      this.user = data;
      this.infoEditForm.patchValue(this.user);
    });
  }

  onSubmit() {
      this.userService.editUser(this.infoEditForm.value).subscribe(data => {
        this.authService.getCurrentUser();
        this.router.navigateByUrl('detail-user/' + this.userId);
      });
  }
}
