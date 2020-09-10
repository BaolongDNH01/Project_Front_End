import { Component, OnInit } from '@angular/core';
import {UserService} from '../user_service/user.service';
import {User} from '../user_model/User';
import {JwtService} from "../../login/services/jwt.service";
import {FormBuilder, FormGroup} from "@angular/forms";
import {AngularFireStorage} from "@angular/fire/storage";
import {finalize} from "rxjs/operators";
import {AuthService} from "../../login/services/auth.service";
import {Router} from "@angular/router";
import {AngularFirestore} from "@angular/fire/firestore";
import {Observable} from "rxjs";
import {FirebaseService} from "../../firebase.service";

@Component({
  selector: 'app-detail-user',
  templateUrl: './detail-user.component.html',
  styleUrls: ['./detail-user.component.css']
})
export class DetailUserComponent implements OnInit {

  uploadForm: FormGroup;
  user: User;
  userId: number;
  selectedFile: File = null;
  uploadPercent;
  downloadURL: Observable<string>;
  avatar: Observable<any[]>;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private jwtService: JwtService,
    private angularFireStorage: AngularFireStorage,
    private angularFirestore: AngularFirestore,
    private authService: AuthService,
    private router: Router,
    private fs: FirebaseService ) {
    this.uploadForm = formBuilder.group ({
    categoria: ['myCategoria'],
    }
    )}


  ngOnInit(): void {
    this.getUser();
    this.uploadAvatar();
  }

  getUser() {
    this.userId = this.jwtService.getUser().id;
    this.userService.getUserById(this.userId).subscribe(data => {
      this.user = data;
    });
  }

  detectFiles(event) {
    this.selectedFile = event.target.files[0];
    console.log(event);
  }

  uploadFile() {
    const myAvatar = this.angularFirestore.collection('test').ref.doc();
    console.log(myAvatar.id)

    const file = this.selectedFile
    const filePath = `${myAvatar.id}`;
    const fileRef = this.angularFireStorage.ref(filePath);
    const task = this.angularFireStorage.upload(filePath, file);

    this.uploadPercent = task.percentageChanges();

    task.snapshotChanges().pipe(
      finalize(() => {
        fileRef.getDownloadURL().toPromise().then( (url) => {
          this.downloadURL = url;

          myAvatar.set({
            categoria: this.uploadForm.value.categoria,
            imagenes : this.downloadURL,
            myId : myAvatar.id
          })

          console.log( this.downloadURL )
        }).catch(err=> { console.log(err) });
      })
    )
      .subscribe();
  }

  uploadAvatar() {
    this.avatar = this.fs.getAva();
  }
}
