import { Pipe, PipeTransform } from '@angular/core';
import { Color } from 'src/app/models/color/color';

@Pipe({
  name: 'colorPipe'
})
export class ColorPipePipe implements PipeTransform {

  transform(value: Color[], filterColor: string): Color[] {
    filterColor=filterColor?filterColor.toLocaleLowerCase():"";
    return filterColor?value.filter((c:Color)=>c.colorName.toLocaleLowerCase().indexOf(filterColor)!==-1):value;
  }

}
