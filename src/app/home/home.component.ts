import { Component, OnInit, Optional } from '@angular/core';
import {stagger,style,transition,trigger,animate,keyframes,query} from '@angular/animations';
import {DataService} from '../data.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  animations:[
    trigger('goals',[
      transition('*=>*',[
        query(':enter',style({opacity:0}),{optional:true}),
        query(':enter',stagger('300ms',[
          animate('.6s ease-in',keyframes([
            style({opacity:0,transform:'translateY(-75%)',offset:0}),
            style({opacity:0.5,transform:'translateY(35px)',offset:0.3}),
            style({opacity:1,transform:'translateY(0)',offset:1})
          ]))]),{optional:true}),
          query(':leave',stagger('300ms',[
            animate('.6s ease-in',keyframes([
              style({opacity:1,transform:'translateY(0)',offset:0}),
              style({opacity:0.5,transform:'translateY(35px)',offset:0.3}),
              style({opacity:0,transform:'translateY(-75%)',offset:1})
            ]))]),{optional:true})
      ])
    ])
  ]
})
export class HomeComponent implements OnInit {
  itemCount:number;
  btnText:String='Add an item';
  globalText:String;
  goals=[];
  constructor(private data:DataService) { }

  ngOnInit() {    
    this.data.goal.subscribe(res=> this.goals=res);
    this.itemCount=this.goals.length;
    this.data.changeGoal(this.goals);
  }
  addItem(){
  this.goals.push(this.globalText);
  this.globalText='';
  this.itemCount=this.goals.length;
  this.data.changeGoal(this.goals);
  }
  remove(i){
    this.goals.splice(i,1);
    this.data.changeGoal(this.goals);
    this.itemCount=this.goals.length;
  }
}
