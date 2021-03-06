import {AfterViewInit, Component, OnInit} from '@angular/core';
import {UserService} from '../user_service/user.service';
import {User} from '../user_model/User';
import {JwtService} from '../../login/services/jwt.service';
import {FormBuilder, FormGroup} from '@angular/forms';
import {AngularFireStorage} from '@angular/fire/storage';
import {finalize} from 'rxjs/operators';
import {AuthService} from '../../login/services/auth.service';
import {Router} from '@angular/router';
import {AngularFirestore} from '@angular/fire/firestore';
import {Observable} from 'rxjs';
import {FirebaseService} from '../../firebase.service';

@Component({
    selector: 'app-detail-user',
    templateUrl: './detail-user.component.html',
    styleUrls: ['./detail-user.component.css']
})
export class DetailUserComponent implements OnInit{

    uploadForm: FormGroup;
    user: User;
    username: string;
    selectedFile: File = null;
    uploadPercent;
    downloadURL: Observable<string>;
    avatar: Observable<any[]>;
    private myAvatar: any;
    displayAvatar: string;

    constructor(
        private formBuilder: FormBuilder,
        private userService: UserService,
        private jwtService: JwtService,
        private angularFireStorage: AngularFireStorage,
        private angularFirestore: AngularFirestore,
        private authService: AuthService,
        private router: Router,
        private fs: FirebaseService) {
        this.getUser();
        this.uploadForm = formBuilder.group({
                category: ['myCategoria'],
            }
        );
    }

    ngOnInit(): void {
        this.getUser();
        this.uploadAvatar();
        console.log(this.avatar);
    }

    getUser() {
        this.username = this.jwtService.getUsername();
        this.userService.getUserByUsername(this.username).subscribe((data) => {
            this.user = data;
            this.displayAvatar = this.user.avatar;
            console.log(this.displayAvatar);
        });
    }

    detectFiles(event) {
        this.selectedFile = event.target.files[0];
        console.log(event);
    }

    uploadFile() {
        if (!(this.user.address === 'FACEBOOK') && !(this.user.address === 'GOOGLE')) {
            this.myAvatar = this.angularFirestore.collection('test').ref.doc();
            console.log(this.myAvatar.id);
        }

        const file = this.selectedFile;
        const filePath = `${this.myAvatar.id}`;
        const fileRef = this.angularFireStorage.ref(filePath);
        const task = this.angularFireStorage.upload(filePath, file);

        this.uploadPercent = task.percentageChanges();

        task.snapshotChanges().pipe(
            finalize(() => {
                fileRef.getDownloadURL().toPromise().then((url) => {
                    this.downloadURL = url;

                    this.myAvatar.set({
                        category: this.uploadForm.value.categoria,
                        image: this.downloadURL,
                        myId: this.myAvatar.id
                    });

                    console.log(this.downloadURL);
                }).catch(err => {
                    console.log(err);
                });
            })
        )
            .subscribe(() => {},
                error => {},
                () => {
                  // @ts-ignore
                  // this.displayAvatar = this.downloadURL;
                  console.log(this.displayAvatar + 'OK');
                });
    }

    saveAvatar() {
        // @ts-ignore
        this.user.avatar = this.downloadURL;
        this.jwtService.saveAvatar(this.user.avatar);
        console.log(this.user);
        this.userService.editUser(this.user).subscribe(next => {
                window.location.reload();
            }, error => {
                console.error();
            },
            () => {
                this.displayAvatar = this.user.avatar;
            });
    }

    uploadAvatar() {
        this.avatar = this.fs.getAva();
    }
}
