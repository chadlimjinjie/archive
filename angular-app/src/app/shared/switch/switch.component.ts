import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { SwitchState } from '../interfaces/Switch';

@Component({
  selector: 'switch',
  templateUrl: './switch.component.html',
  styleUrls: ['./switch.component.scss']
})
export class SwitchComponent implements OnInit {

  @Input() text: string;
  @Input() hideText: boolean;
  // @Input() checked: boolean;
  @Input() switchState: SwitchState;
  @Output() change: EventEmitter<MatSlideToggleChange> = new EventEmitter;
  
  constructor() { }

  ngOnInit(): void {
  }

  changes(event) {
    // console.log('change', event);
    this.change.emit(event);
  }

  toggleChanges(event) {
    // console.log('toggleChange', event);
  }

}
