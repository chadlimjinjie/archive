import { Component, OnInit } from '@angular/core';
import { SwitchState } from '../shared/interfaces/Switch';

import { FormBuilder, FormControl } from '@angular/forms';
import { SharedService } from '../shared/shared.service';
import { Router } from '@angular/router';
import { Response as IResponse } from '../shared/interfaces/Response';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent implements OnInit {

  deviceArray: any[] = [];
  switchArray: SwitchState[] = [];
  addSwitchForm = this.formBuilder.group({
    name: new FormControl('', { initialValueIsDefault: true }),
    device_id: new FormControl('', { initialValueIsDefault: true }),
    device_key: new FormControl('', { initialValueIsDefault: true }),
    dp_id: new FormControl('', { initialValueIsDefault: true }),
  });

  constructor(
    private _sharedService: SharedService,
    private formBuilder: FormBuilder,
    private _router: Router
  ) { }

  ngOnInit(): void {
    const token = localStorage.getItem('token');
    if (!token) this._router.navigate(['/sign-in']);
    this._sharedService.verifyToken().subscribe((data: IResponse) => {
      console.log('verifyToken', data);
      switch (data.status) {
        case 200:

          break;
        default:
          this._router.navigate(['/sign-in']);
          break;
      }
    });

    this._sharedService.getSwitchStateList().subscribe((data: SwitchState[]) => {
      console.log('data', data);
      this.deviceArray = [...this.deviceArray, ...data];
      this.switchArray = [...this.switchArray, ...data];
    });
  }

  handleSwitchChange(_switch: SwitchState, event) {
    _switch.checked = !_switch.checked;
    console.log('switchState', _switch);
    this._sharedService.setSwitchState(_switch.id, _switch.checked).subscribe(data => {
      console.log('lightState', data);
    });
  }

  handleAddSwitch(event) {
    console.log('addSwitchForm', this.addSwitchForm.value);
    this._sharedService.addSwitch(this.addSwitchForm.value).subscribe((data: SwitchState) => {
      console.log('addSwitch', data);
      this.deviceArray = [...this.deviceArray, data];
      this.switchArray = [...this.switchArray, data];
    });
    this.addSwitchForm.reset();
  }

  handleLogout() {
    localStorage.removeItem('token');
    this._router.navigate(['/sign-in']);
  }

}
