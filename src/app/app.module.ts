import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';

import { AngularFireModule, AuthProviders, AuthMethods } from 'angularfire2';
import { AppComponent } from './app.component';
import { SplashComponent } from './splash/splash.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';

import { FirebaseService } from './services/firebase.service';
import { ListingsComponent } from './listings/listings.component';
import { ListingComponent } from './listing/listing.component';
import { AddListingComponent } from './add-listing/add-listing.component';
import { EditListingComponent } from './edit-listing/edit-listing.component';
import { ContactComponent } from './contact/contact.component';
import { ProfilePageComponent } from './profile-page/profile-page.component';


export const firebaseConfig  = {
    apiKey: "AIzaSyAi64ml-moSxtJ7K_iYJpcXITXbdZaQruU",
    authDomain: "asclepiustutoring.firebaseapp.com",
    databaseURL: "https://asclepiustutoring.firebaseio.com",
    storageBucket: "asclepiustutoring.appspot.com",
    messagingSenderId: "581094401962"
}

const firebaseAuthConfig = {
  provider: AuthProviders.Password,
  method: AuthMethods.Password
}

const appRoutes: Routes = [
  {path:'', component:SplashComponent},
  {path:'about', component:AboutComponent},
  {path:'listings', component:ListingsComponent},
  {path:'listing/:id', component:ListingComponent},
  {path:'add-listing', component:AddListingComponent},
  {path: 'edit-listing/:id', component:EditListingComponent},
  {path: 'contact', component:ContactComponent},
  {path: 'my-profile', component:ProfilePageComponent}
]

@NgModule({
  declarations: [
    AppComponent,
    SplashComponent,
    NavbarComponent,
    HomeComponent,
    AboutComponent,
    ListingsComponent,
    ListingComponent,
    AddListingComponent,
    EditListingComponent,
    ContactComponent,
    ProfilePageComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AngularFireModule.initializeApp(firebaseConfig, firebaseAuthConfig),
    RouterModule.forRoot(appRoutes)
  ],
  providers: [FirebaseService],
  bootstrap: [AppComponent]
})
export class AppModule { }
