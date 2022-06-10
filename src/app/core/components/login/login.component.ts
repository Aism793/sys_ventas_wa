import {AfterViewInit, Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {FormGroup, FormControl, Validators, FormBuilder} from '@angular/forms';
import {AuthService, Usuario} from './auth.service';
import {MensajesModule} from "@app/mensajes/mensajes.module";


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, AfterViewInit {

  hide: Boolean = true;
  formGroup: FormGroup;
  isRememberMe: boolean = false;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private mensaje : MensajesModule
  ) {
  }

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
    if (this.formGroup.invalid) return;
    const usuario: Usuario = {email: this.formGroup.value.user, password: this.formGroup.value.password}
    this.authService.login(usuario).subscribe(response => {
      this.router.navigate(['a/home']);
    },error => this.mensaje.mensajeAlertaError(error.Message));
  }

  private validateSession(): void {
    if (this.authService.getToken() == null || this.authService.getToken() === '') {
      this.router.navigate(['']);
    }
  }
}

