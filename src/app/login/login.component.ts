import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import { UserService } from "../services/user.services";
import { first } from "rxjs/operators";

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{

  user!: FormGroup;

private _userService: any;

 constructor(private authService: UserService) { }

  ngOnInit(): void {
    this.user = new FormGroup({
      email: new FormControl(''),
      password: new FormControl(''),
    });
  }

  get f(){
    return this.user!.controls;
  }
  onSubmit(){
    this._userService.login('admin@wp.pl','admin').pipe(first()).subs
  }
}