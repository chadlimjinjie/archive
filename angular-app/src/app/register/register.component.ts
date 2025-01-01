import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormControl } from '@angular/forms';
import { SharedService } from '../shared/shared.service';
import { Response as IResponse } from '../shared/interfaces/Response';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  registrationForm = this.formBuilder.group({
    email: new FormControl('', { initialValueIsDefault: true }),
    username: new FormControl('', { initialValueIsDefault: true }),
    password: new FormControl('', { initialValueIsDefault: true }),
  });

  constructor(
    private _sharedService: SharedService,
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit(): void {
  }

  handleRegister() {
    console.log('registrationForm', this.registrationForm.value);
    // this._sharedService.addSwitch(this.registrationForm.value).subscribe((data) => {
    //   console.log('data', data);
    // });
    this._sharedService.register(this.registrationForm.value).subscribe((data: IResponse) => {
      console.log('data', data);
      switch (data.status) {
        case 200:
          break;
        default:
          break;
      }
    });
    this.registrationForm.reset();
  }

}
