import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'public'
})
export class PublicPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }


}
//control the length of name
@Pipe({
  name: 'formatLength'
})
export class FormatLengthPipe implements PipeTransform {

  transform(value: any, length: number): string {
    if (value !== null && value.length > length) {
      return `${value.substring(0, length)}...`;
    } else {
      return value;
    }
  }
}
//control the time format
@Pipe({
  name: 'formatTime'
})
export class FormatTimePipe implements PipeTransform {

  transform(value: any, args?: any): any {
    return new Date(value).toLocaleString('chinese', { hour12: false });
  }
}