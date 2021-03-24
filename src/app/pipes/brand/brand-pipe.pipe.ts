import { Pipe, PipeTransform } from '@angular/core';
import { from } from 'rxjs';
import { Brand } from 'src/app/models/brand/brand';
import { Car } from 'src/app/models/car/car';



@Pipe({
  name: 'brandPipe'
})
export class BrandPipePipe implements PipeTransform {

  transform(value:Brand[],filterBrand:string): Brand[] {
    filterBrand=filterBrand?filterBrand.toLocaleLowerCase():"";
    return filterBrand?value.filter((c:Brand)=>c.brandName.toLocaleLowerCase().indexOf(filterBrand)!==-1):value;
  }

}
