import { Input, Component, Output, EventEmitter, OnInit } from '@angular/core';
import { UserService  } from "../../services/user.service";
import { Apollo } from 'apollo-angular';
import { loginUser } from '../accountGraphql'
import { FormGroup, FormControl,FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit{
  form: FormGroup = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
  });
  
  constructor(
    private user$: UserService,
    private apollo: Apollo
    ) { }
  ngOnInit() {
  }

  // onSubmit(form:any){
  //   this.apollo.query({query:loginUser,variables:{userId:this.user.userid,password:this.user.password}}).subscribe((data:any)=>{
  //     if(data.data.users.length > 0){
  //       console.log("loggedin")
  //     }
  //     else{
  //       console.log("please check your credentials");
  //     }
      
  //   })

  //   console.log(this.user)
  // //  this.user$.loginUser(this.user)
  // }
  submit() {
    if (this.form.valid) {
      this.submitEM.emit(this.form.value);
      this.apollo.query({query:loginUser,variables:{userId:this.form.value.userId,password:this.form.value.password}}).subscribe((data:any)=>{
      if(data.data.users.length > 0){
        console.log("loggedin")
      }
      else{
        console.log("please check your credentials");
      }
      
    })
    }
  }
  @Input() error: string | null | undefined;

  @Output() submitEM = new EventEmitter();

}
