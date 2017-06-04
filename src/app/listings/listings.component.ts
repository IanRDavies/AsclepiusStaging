import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../services/firebase.service';
import { AngularFire } from 'angularfire2';

import * as firebase from 'firebase';


@Component({
  selector: 'app-listings',
  templateUrl: './listings.component.html',
  styleUrls: ['./listings.component.css']
})
export class ListingsComponent implements OnInit {

  listings:any;

  constructor(
    private firebaseService: FirebaseService,
    private af: AngularFire
  ) { }

  ngOnInit() {
  	
  	this.firebaseService.getListings().subscribe(listings => {
  		this.listings = listings;
      let storageRef = firebase.storage().ref();

      for(let listing of listings){
        let spaceRef = storageRef.child(listing.path);
        spaceRef.getDownloadURL().then(url => {listing.imageUrl = url;})
      }
  	})


  }

}
