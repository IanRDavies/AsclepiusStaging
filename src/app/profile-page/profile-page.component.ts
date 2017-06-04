import { Component, OnInit } from '@angular/core';
import { AngularFire } from 'angularfire2';
import { FirebaseService } from '../services/firebase.service';
import * as firebase from 'firebase';

@Component({
  selector: 'profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.css']
})
export class ProfilePageComponent implements OnInit {
	// @TODO -- bring in user profile, check if authenticated, create listings database, link listings to user, allow profile editing, test getUserDetails on firebaseService
	// @TODO -- work out how to link user to listings -- when add listing update user with id of listings in a list
	// @TODO -- More Broadly: neaten up styles - put profile pic in navbar - fix image uploading
	// @TODO -- Messaging Service - long run

	user: any; // should be FirebaseObjectObservable<User>; ? 

   constructor(
   	private firebaseService: FirebaseService,
   	private af: AngularFire
   )
   {  }

  ngOnInit() {
  	  // Get User
  	  this.firebaseService.getUserDetails(firebase.auth().currentUser.email)
      .subscribe(user => {
        this.user = user;
      });
    }

}
