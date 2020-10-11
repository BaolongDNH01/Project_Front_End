import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {AngularFirestore} from '@angular/fire/firestore';

@Injectable()
export class FirebaseService {

  ava: Observable<any[]>;

  constructor( private angularFirestore: AngularFirestore ) { }

  getAva() {
    this.ava = this.angularFirestore.collection('test').valueChanges();
    return this.ava;
  }

}
