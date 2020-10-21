import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'uppercase'
})
export class UppercasePipe implements PipeTransform {

  // tslint:disable-next-line: typedef
  transform(value: string) {
    return value.toUpperCase();
  }

}
