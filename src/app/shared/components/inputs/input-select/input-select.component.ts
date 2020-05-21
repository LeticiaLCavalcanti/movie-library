import { Component, Input } from '@angular/core';
import { FormGroup, AbstractControl } from '@angular/forms';
import { InputValidateService } from '../input-validate.service';

@Component({
  selector: 'app-input-select',
  templateUrl: './input-select.component.html',
  styleUrls: ['./input-select.component.css']
})
export class InputSelectComponent {

  @Input() title: string;
  @Input() formGroup: FormGroup;
  @Input() controlName: string;
  @Input() options: Array<string>;

  constructor(public validate: InputValidateService) { }

  get formControl(): AbstractControl {
    return this.formGroup.controls[this.controlName];
  }
}
