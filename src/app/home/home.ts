import { Component, OnInit } from '@angular/core';
import { Data } from '../data';

@Component({
  selector: 'app-home',
  standalone: false,
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home implements OnInit {
  day: string = '';
  week: string = '';
  month: string = '';

  data: any = {
    day: this.day,
    week: this.week,
    month: this.month,
  };

  tout: any;

  constructor(private dataService: Data) {}

  ngOnInit(): void {
    //this.data = JSON.parse(localStorage.getItem("data") ?? this.data);
    this.day = this.data?.day;
    this.week = this.data?.week;
    this.month = this.data?.month;

    this.dataService.getData().subscribe((res: any)=>{
      console.log(res);
      this.data = res;

      this.day = this.data?.day;
      this.week = this.data?.week;
      this.month = this.data?.month;
    });
  }

  save() {
    this.data = {
      day: this.day,
      week: this.week,
      month: this.month,
    };
    //localStorage.setItem("data", JSON.stringify(this.data));
    
    if(this.tout){
      clearTimeout(this.tout)
    }
    this.tout = setTimeout(()=>{
      this.dataService.sendData(this.data).subscribe((res: any)=>{
        console.log(res);
      });
    }, 1000);
  }
}
