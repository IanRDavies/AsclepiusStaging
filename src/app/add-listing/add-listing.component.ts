import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../services/firebase.service';
import * as firebase from 'firebase';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-listing',
  templateUrl: './add-listing.component.html',
  styleUrls: ['./add-listing.component.css']
})
export class AddListingComponent implements OnInit {
	title:any;
  description: any;
	image: any;
  user: string;

  constructor(
  	private firebaseService: FirebaseService,
  	private router: Router
  ) { }

  ngOnInit() {
  }

  onAddSubmit() {
  	let listing = {
  		title: this.title,
      description: this.description,
  		image: this.image,
      user: this.firebaseService.cleanEmail(firebase.auth().currentUser.email)
  	}
  	this.firebaseService.addListing(listing);
  	this.router.navigate(['listings']);
  }

}
