import { formatDate } from '@angular/common';
import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import jwt_decode from 'jwt-decode';
import { UserService } from '../../../shared/services/user.service'
import { Modal } from 'bootstrap';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  loginForm!: FormGroup;
  loading = false;
  submitted = false;

  showLogin = false;

  errorMessage: string = '';
  successMessage: string = '';

  isLoggedIn: boolean;
  username: string;

  @ViewChild('errorModal') errorModalRef!: ElementRef;
  @ViewChild('successModal') successModalRef!: ElementRef;
  @ViewChild('loginContainer') loginElement: ElementRef;
  @ViewChild('loginButton') loginButton: ElementRef;

  constructor(private formBuilder: FormBuilder, private userService: UserService, private renderer: Renderer2, public router: Router, private translate: TranslateService) {
    
    this.renderer.listen('window', 'click',(e:Event)=>{
      if(!this.isLoggedIn) {
        if(e.target !== this.loginButton.nativeElement && e.target!==this.loginElement.nativeElement && !this.loginElement.nativeElement.contains(e.target)) {
          this.showLogin=false;
        }
      }
      
    });
  }
  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
      recaptcha: ['', [Validators.required]]
    });

    this.isLoggedIn = sessionStorage.getItem('isLoggedin') === 'true';
    this.username = sessionStorage.getItem('username');
  }

  get s() {
    return this.loginForm.controls;
  }

  login() {
    if (this.loading === true) {
      return false;
    }

    this.submitted = true;

    if (this.loginForm.invalid) {
      return false;
    }

    this.loading = true;

    this.userService.login(this.loginForm.value).subscribe(
        (httpResponse: any) => {
          const token = httpResponse.body.responseData.token;
          const refreshToken = httpResponse.body.responseData.refreshToken;
          const jwt: any = jwt_decode(token);

          this.isLoggedIn = true;
          this.username = jwt['unique_name'];
          sessionStorage.setItem('user-permissions', JSON.stringify(jwt['PackedPermission'].split(':')));
          sessionStorage.setItem('username', this.username);

          if (token !== 'undefined' && token != null) {
            sessionStorage.setItem('token', token);
            sessionStorage.setItem('isLoggedin', 'true');

            
            if (refreshToken !== 'undefined' && refreshToken != null) {
              sessionStorage.setItem('refreshToken', refreshToken);
            }

            if (jwt['PackedPermission'].split(':').includes('WEATHER')) {
               this.router.navigate(['weather']);
            } 
          } else {
            this.errorMessage = 'Error, intente nuevamente.';
            this.submitted = false;
          }
          return true;
        },
        (error: any) => {
          this.errorMessage = error;
          return false;
        }
      )
      .add(() => {
        this.loading = false;
      });
  }

  toggleShowLogin() {
    this.showLogin = !this.showLogin;
    if(this.showLogin) {
      this.loginElement.nativeElement.focus();
    }
  }

  cancel() {
		this.loginForm.controls.recaptcha.reset();
		// this.modalService.dismissAll();
	}

  onLoggedout() {
    sessionStorage.removeItem('isLoggedin');
    window.location.reload();
  }
  changeLang(language: string) {
    this.translate.use(language);
  }
}
