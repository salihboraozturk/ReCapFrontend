import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { Color } from 'src/app/models/color/color';
import { AuthService } from 'src/app/services/auth/auth.service';
import { ColorService } from 'src/app/services/color/color.service';


@Component({
  selector: 'app-color',
  templateUrl: './color.component.html',
  styleUrls: ['./color.component.css']
})

export class ColorComponent implements OnInit {
colors:Color[]=[];
currentColor:Color;
clearColor:Color;
filterColor="";
  constructor(private colorService:ColorService,
    private authService: AuthService) { }

  ngOnInit(): void {
    this.getColors();
    this.checkAdmin();
    
  }
getColors(){
  this.colorService.getColors().subscribe(response=>{this.colors=response.data})
}
setCurrentColor(color:Color){
this.currentColor=color;
}
getCurrentStyle(color:Color){
  if(this.currentColor==color){
    return "background-color:#f5ca29;"
  }
  else{
    return "background-color: #3f3f3f; color:white;"
  }
}

getAllColorStyle(){
  if(!this.currentColor){
    return "background-color:#f5ca29; color:#3f3f3f"
  }
  else{
    return "background-color: #3f3f3f; color:white;"
  }
}
setClearCurrentColor(){
  this.currentColor=this.clearColor;
}
checkAdmin() {
  return this.authService.checkAdmin();
 }
}
