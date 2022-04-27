import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators
} from '@angular/forms';
import Validation from '../../utils/validation';
import { signUpUser } from '../accountGraphql'
import { Apollo } from 'apollo-angular';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  form!: FormGroup;
  submitted = false;

  constructor(private formBuilder: FormBuilder,private apollo: Apollo) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group(
      {
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
        userId: [
          '',
          [
            Validators.required,
            Validators.minLength(6),
            Validators.maxLength(20)
          ]
        ],
        phone: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        password: [
          '',
          [
            Validators.required,
            Validators.minLength(6),
            Validators.maxLength(40)
          ]
        ],
        confirmPassword: ['', Validators.required],
        acceptTerms: [false, Validators.requiredTrue]
      },
      {
        validators: [Validation.match('password', 'confirmPassword')]
      }
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
    console.log(JSON.stringify(this.form.value));
    let userObj={
      firstName:this.form.value.firstName,
      lastName:this.form.value.lastName,
      userId:this.form.value.userId,
      phone:this.form.value.phone,
      email:this.form.value.email,
      password:this.form.value.password
    }
    this.apollo.mutate({mutation:signUpUser,variables:{userObj:userObj}}).subscribe((data:any)=>{
      if(data.data.insert_users_one){
        console.log("sucess")
      }
      else{
        console.log("err")
      }
    })
  }

  onReset(): void {
    this.submitted = false;
    this.form.reset();
  }
}