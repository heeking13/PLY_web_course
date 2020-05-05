import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'user'
})
export class UserPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}

@Pipe({
  name: 'UserSexPipe'
})
export class UserSexPipe implements PipeTransform {

  transform(auth: number, args?: any): any {
    const sexArr = ['Female', 'Male'];
    return sexArr[auth];
  }
}