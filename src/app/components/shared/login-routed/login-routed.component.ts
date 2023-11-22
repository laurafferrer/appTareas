import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { CryptoService } from 'src/app/service/crypto.service';
import { SessionAjaxService } from 'src/app/service/session.ajax.service';

@Component({
  selector: 'app-login-routed',
  templateUrl: './login-routed.component.html',
  styleUrls: ['./login-routed.component.css']
})

export class LoginRoutedComponent implements OnInit {

  loginForm: FormGroup;
  status: HttpErrorResponse | null = null;

  constructor(
    private fb: FormBuilder,
    private oSessionService: SessionAjaxService,
    private oMatSnackBar: MatSnackBar,
    private oRouter: Router,
    private oCryptoService: CryptoService
  ) {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  ngOnInit() {
  }

  onSubmit() {
    if (this.loginForm.valid) {
      this.oSessionService.login(this.loginForm.value.username, this.oCryptoService.getSHA256(this.loginForm.value.password)).subscribe({
        next: (data: string) => {
          this.oSessionService.setToken(data);
          this.oSessionService.emit({ type: 'login' });
          this.oMatSnackBar.open("Login successful.", '', { duration: 2000 });
          if (this.loginForm.value.username === 'superuser') {
            this.oRouter.navigate(['/home']); 
          } else {
            this.oRouter.navigate(['/userhome']); 
          }
        },
        error: (error: HttpErrorResponse) => {
          this.status = error;
          this.oMatSnackBar.open("Error in login operation.", '', { duration: 2000 });
        }
      });
    }
  }

  onReset() {
    this.loginForm.reset();
  }

  loginAdmin() {
    this.loginForm.setValue({
      username: 'superuser',
      password: 'foxforum'
    })
  }

  loginUsuario() {
    this.loginForm.setValue({
      username: 'pedro',
      password: 'foxforum'
    })
  }

}
