import { Pipe, PipeTransform } from '@angular/core';
import { Car } from 'src/app/models/car/car';

@Pipe({
  name: 'carPipe'
})
export class CarPipePipe implements PipeTransform {

  transform(value: Car[],filterCar:string): Car[] {
    filterCar=filterCar?filterCar.toLocaleLowerCase():"";
    return filterCar?value.filter((c:Car)=>c.carName.toLocaleLowerCase().indexOf(filterCar)!==-1):value;
  }

}
