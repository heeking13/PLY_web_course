import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'question'
})
export class QuestionPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}

@Pipe({
  name: 'answerPipe'
})
export class AnswerPipe implements PipeTransform {

  transform(arr: Array<number>, args?: any): any {
    enum Response {
      A = 3,
      B = 5,
      C = 11,
      D = 21
    }
    return arr.map(v => Response[v]).join(',');
  }
}

@Pipe({
  name: 'questionType'
})
export class QuestionTypePipe implements PipeTransform {

  transform(type: number, args?: any): any {
    const typeArr = ['Single', 'Multiple'];
    return typeArr[type];
  }

}