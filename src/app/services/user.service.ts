import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';

@Injectable()
export class UserService {
  baseUrl: string = "https://winter-2017-phortonssf.c9users.io:8080/api/appUsers";
  waynesWorld:string = "https://wayne-spring-2018-phortonssf.c9users.io:8080/api/appUsers"
  returnUrl: string = "home";
  loginPage: string = "";
  userData: any;
  constructor( 
    private http: HttpClient,
    private router: Router 
  ) { }

  toLogin(){
    this.router.navigate([this.loginPage])  
  }

  registerUser(userData: any){
    this.http.post(`${this.baseUrl}`, userData)
      .subscribe( resData => {
        this.toHomePage(resData)
    })
  }


  loginUser(userData:any){
    // this.http.post(`${this.waynesWorld}/login`, userData)
     
    //   .subscribe( resData => {
    //     console.log("$ data", resData)
    //     this.toHomePage(resData)
    //   })
  }
   
  toHomePage(resData:any){
    //Save data from our succesfull login in sessionStorage
    window.sessionStorage.setItem( "token", resData.token)
    window.sessionStorage.setItem( "userId", resData.userId)
    this.router.navigate([this.returnUrl])   
  }
}