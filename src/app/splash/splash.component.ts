import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { AngularFire } from 'angularfire2';
import { FirebaseService } from '../services/firebase.service';


@Component({
  selector: 'app-splash',
  templateUrl: './splash.component.html',
  styleUrls: ['./splash.component.css']
})
export class SplashComponent implements OnInit {
  showHideLoginPopup: any;
  showHideSignUpPopup: any;
  loginError: any;
  signUpError: any;
  offerSignUpRedir: Boolean;

  currentUser: any;

  firstName: string;
  surname: string;
  email: string;
  password: string;
  area: string;
  image: any;

  @Output() loggedIn: EventEmitter<any> = new EventEmitter();

  constructor(
    public af: AngularFire,
    public firebaseService: FirebaseService
  ) {
  	this.showHideLoginPopup='hide-popup';
    this.showHideSignUpPopup='hide-popup';
    this.loginError = {errorThrown: false, message: ""};
    this.signUpError = {errorThrown: false, message: ""};
    this.offerSignUpRedir = false;
  }

  ngOnInit() {
  }

  loginRedir() {
  	this.showHideLoginPopup = 'show-popup';
  }
  signUpRedir(){
    // Incase redirect is from login popup
    this.showHideLoginPopup = 'hide-popup';
    this.offerSignUpRedir = false;
    
    // Bring up sign up popup
    this.showHideSignUpPopup = 'show-popup';
  }

  login(inputEmail, inputPassword) {
    var loginDetails = {email:inputEmail, password:inputPassword};
    this.af.auth.login(loginDetails)
    .then((success) => {
      this.currentUser = this.firebaseService.getUserDetails(inputEmail);
      this.loggedIn.emit(this.currentUser);
    },
    (error) => {
      this.loginError.errorThrown = true;

      if(error['code'] === 'auth/user-not-found'){
        this.offerSignUpRedir = true;
      }

      this.loginError.message = error.message;
    }
    )
    .then(success => {
      this.closePopup('log in');
    });
  }

  createUser(inputFirstName, inputSurname, inputEmail, inputPassword, inputArea, inputImage) {
    // Creating user for our references
    let user = {
      firstName: inputFirstName,
      surname: inputSurname,
      email: this.firebaseService.cleanEmail(inputEmail),
      area: inputArea,
      image: inputImage,
      classes: []
    };


    // Creating user in firebase auth database
    var userCredentials = {email: inputEmail, password: inputPassword};
    var emailPasswordCredentials = this.af.auth.createUser(userCredentials)
    .then((success) => {
      this.firebaseService.addUser(user);
    })
    .then((success) => {
      this.closePopup('sign up');
    })
    .catch((error) => {
      this.signUpError.errorThrown = true;
      console.log(error);
      this.signUpError.message = error.message;

    })
  }
  closePopup(popup){
    switch(popup){
      case 'sign up':
        this.showHideSignUpPopup = 'hide-popup';
        break;
      case 'log in':
        this.showHideLoginPopup = 'hide-popup';
        break;
      default:
        console.log('check close popup click code -- name passed in is wrong');
    }
  }
}
