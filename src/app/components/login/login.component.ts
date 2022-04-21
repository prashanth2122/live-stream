import { Component, OnInit } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { loginUser } from '../accountGraphql'
import { AbstractControl,FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit{
  form!: FormGroup;
  submitted = false;
  constructor(private formBuilder: FormBuilder,private apollo: Apollo) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group(
      {
        username: ['', Validators.required],
        password: ['', Validators.required],

      },
    );
  }
  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }

  onSubmit(): void {
    this.submitted = true;

    if (this.form.invalid) {
      return;
    }
    this.apollo.query({query:loginUser,variables:{userId:this.form.value.username,password:this.form.value.password}}).subscribe((data:any)=>{
      if(data.data.users.length > 0){
        console.log("loggedin")
      }
      else{
        console.log("please check your credentials");
      }
      
    })
    console.log(JSON.stringify(this.form.value, null, 2));
  }
}
