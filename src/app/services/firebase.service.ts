import { Injectable } from '@angular/core';
import { AngularFire, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2';
import * as firebase from 'firebase';

@Injectable()
export class FirebaseService {

	listings: FirebaseListObservable<any[]>;
  users: FirebaseListObservable<any[]>;
	listing: FirebaseObjectObservable<any>;
  user: FirebaseObjectObservable<any>;
  //currentUser: FirebaseObjectObservable<User>;
  currentUser: FirebaseObjectObservable<any>;
	profileImgsFolder: any;
  listingImgsFolder: any;

  constructor(private af: AngularFire) { 
  	this.profileImgsFolder = 'profileimages';
    this.listingImgsFolder = 'listingimages';

    this.listings = this.af.database.list('/listings') as FirebaseListObservable<Listing[]>;
    this.users = this.af.database.list('/users') as FirebaseListObservable<User[]>;

  }

  getListings(){
  	console.log(firebase.auth().currentUser.uid);
    return this.listings;

  }

  getListingDetails(id){
  	this.listing = this.af.database.object('/listings/'+id) as FirebaseObjectObservable<Listing>
  	return this.listing;
  }
  getUserDetails(emailAddress) {
    let email = this.cleanEmail(emailAddress);
    this.currentUser = this.af.database.object('/users/'+email) as FirebaseObjectObservable<User>;
    return this.currentUser;
  }

  addListing(listing){
    	// Create root reference
    	let storageRef = firebase.storage().ref();

    	for(let selectedFile of [(<HTMLInputElement>document.getElementById('image')).files[0]]){
    	let path = `/${this.listingImgsFolder}/${selectedFile.name}`;
    	let iRef = storageRef.child(path);
      iRef.put(selectedFile)
      .then((snapshot) => {
    		listing.image = selectedFile.name;
    		listing.path = path;
    		return this.listings.push(listing);
    	 });
    	}
    }

  cleanEmail(emailAddress) {
    if(!emailAddress) {
      return false;
    }
    // replace '.' with ',' since . not allowed in firebase key and , not allowed in email
    emailAddress = emailAddress.toLowerCase();
    emailAddress = emailAddress.replace(/\./g, ',');
    return emailAddress;
  }

  addUser(user){
      // Create root reference
      let storageRef = firebase.storage().ref();

      for(let selectedFile of [(<HTMLInputElement>document.getElementById('image')).files[0]]){
      let path = `/${this.profileImgsFolder}/${selectedFile.name}`;
      let iRef = storageRef.child(path);
      iRef.put(selectedFile).then((snapshot) => {
        user.image = selectedFile.name;
        iRef.getDownloadURL().then((URL) => {
          user.imageUrl = URL;
        });
        let newUser = firebase.database().ref().child('users').child(user.email);


        try {
          newUser.set(user);
          return "success";
        }
        catch(error) {
          console.log(error);
          return "failure";
        }
       });
      }
    }

    getCurrentUser(authorised) {
      if(authorised) {
        return this.currentUser
      }
      else {
       throw new Error('Must be signed in to get current user');
      }
    }

    updateListing(id, listing) {
      return this.listings.update(id, listing);
    }
    deleteListing(id){
      return this.listings.remove(id);
    }
    addListingToUser(userEmail, listingTitle){
      let usersListings = firebase.database().ref().child('users').child(userEmail).child('myListings');
      usersListings.push(listingTitle);
    }
  }



interface Listing{
	$key?:string;
	$title?:string;
	$image:string;
  $tutor?:string;
}

interface User {
  $key?: string;
  $name?:string;
  $email?:string;
  $area?:string;
  $image?:string;
  $imageURL:string;
  $classes?: any[];
}