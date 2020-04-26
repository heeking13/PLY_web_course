import { Directive } from '@angular/core';
import { FormControl, ValidatorFn, ValidationErrors } from '@angular/forms';
import { observable, Observer, Observable } from 'rxjs';

//check length validation
export function lengthValidator(lengReg: RegExp): ValidatorFn {
  //recieve a reg, create a observer
  return (control: FormControl) => Observable.create((observer: Observer<ValidationErrors>) => {
    //check forms data
    if (lengReg.test(control.value)) {
      observer.next(null);
    }
    else {
      observer.next({ lengthValid: { value: control.value } });
    }
    observer.complete();
  });
}

@Directive({
  selector: '[appLengthValidator]'
})
export class LengthValidatorDirective {

  constructor() { }

}
