import { Component, OnInit } from '@angular/core';
import { AngularFire } from 'angularfire2';
import { AngularFireAuth } from 'angularfire2/auth';
import { FirebaseService } from '../services/firebase.service';

import * as firebase from 'firebase';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  currentUser: any;
  userSubscription: any;
  authSubscription: any;

  constructor(
  	private af: AngularFire,
    private afAuth: AngularFireAuth,
    private firebaseService: FirebaseService
  ) { }

  ngOnInit() {
    // Initialise current user 
    this.currentUser = {};

    // when loging in ensure to then get the autual user info
    this.authSubscription = firebase.auth().onAuthStateChanged((user) => {
      let authorised = this.afAuth.getAuth();
      if(authorised) {
        this.userSubscription = this.firebaseService.getUserDetails(firebase.auth().currentUser.email)
        .subscribe(user => {
          this.currentUser = user;
        });
      }
    },
    (error) => {console.log(error);}
    ,
    () => {this.userSubscription.unsubscribe();});
  }


  signOut() {
    this.af.auth.logout();
  };

}
