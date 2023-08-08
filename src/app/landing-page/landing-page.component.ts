import { Component, OnInit, HostListener } from '@angular/core';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})
export class LandingPageComponent implements OnInit{
  title = 'landing page';
  constructor(){}
  ngOnInit(): void {}

  bgVariable:boolean = false;
  headerVariable:boolean = false;

  @HostListener('document:scroll')
  onScroll(){
      if(document.body.scrollTop > 60 || document.documentElement.scrollTop >60){
    this.bgVariable = true;
    this.headerVariable = true;
  }
  else{
    this.bgVariable = false;
    this.headerVariable = false;
  }
  }

}  
