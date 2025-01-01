import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormControl } from '@angular/forms';
import { SharedService } from '../shared/shared.service';
import { Response as IResponse } from '../shared/interfaces/Response';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {

  signInForm = this.formBuilder.group({
    email: new FormControl('', { initialValueIsDefault: true }),
    password: new FormControl('', { initialValueIsDefault: true }),
  });

  constructor(
    private _sharedService: SharedService,
    private formBuilder: FormBuilder,
    private _router: Router
  ) { }

  ngOnInit(): void {
    this._sharedService.verifyToken().subscribe((data: IResponse) => {
      console.log('verifyToken', data);
      switch (data.status) {
        case 200:
          this._router.navigate(['/feed']);
          break;
        case 401:
          break;
      }
    });
  }

  handleSignIn() {
    this._sharedService.login(this.signInForm.value.email, this.signInForm.value.password).subscribe((data: IResponse) => {
      console.log(data);
      switch (data.status) {
        case 200:
          if (!data.result) return;
          localStorage.setItem('token', data.result.token);
          this._router.navigate(['feed']);
          break;
        default:
          break;
      }
    });
  }

}
