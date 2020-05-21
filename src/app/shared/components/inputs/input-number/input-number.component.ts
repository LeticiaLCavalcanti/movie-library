import { Component, Input } from '@angular/core';
import { FormGroup, AbstractControl } from '@angular/forms';
import { InputValidateService } from '../input-validate.service';

@Component({
  selector: 'app-input-number',
  templateUrl: './input-number.component.html',
  styleUrls: ['./input-number.component.css']
})
export class InputNumberComponent {

  @Input() title: string;
  @Input() formGroup: FormGroup;
  @Input() controlName: string;
  @Input() minimo = 0;
  @Input() maximo = 10;
  @Input() step = 1;

  constructor(public validate: InputValidateService) { }

  get formControl(): AbstractControl {
    return this.formGroup.controls[this.controlName];
  }

}
