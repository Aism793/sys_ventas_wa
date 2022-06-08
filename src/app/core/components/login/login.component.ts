import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  
  hide: Boolean = true;
  formGroup: FormGroup;
  isRememberMe: boolean = false;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.initForm();
  }

  ngAfterViewInit(): void {
    this.validateSession();
  }

  private initForm(): void {
    this.formGroup = this.formBuilder.group({
      user: new FormControl('', [Validators.required, Validators.maxLength(255)]),
      password: new FormControl('', [Validators.required, Validators.maxLength(254)]),
      lang: new FormControl()
    });
  }
  
  get formLogin() { 
    return this.formGroup.controls; 
  }

  onLogin(): void {
    if(this.formGroup.invalid) return;
    if(this.formGroup.value.user == "sysventas" && 
      this.formGroup.value.password == "123"){
        this.router.navigate(['a/home']);
    }
  }

  private validateSession(): void {
    //const token: string = this.storageService.getCurrentToken();
    // if (!token) return;
    // this.router.navigate(['a/home']);
  }
}

