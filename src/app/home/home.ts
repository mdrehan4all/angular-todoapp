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
  year: string = '';

  data: any = {
    day: this.day,
    week: this.week,
    month: this.month,
    year: this.year,
  };

  tout: any;
  logged: boolean = false;
  url: string = '';

  constructor(private dataService: Data) {}

  ngOnInit(): void {
    //this.data = JSON.parse(localStorage.getItem("data") ?? this.data);
    this.day = this.data?.day;
    this.week = this.data?.week;
    this.month = this.data?.month;
    this.year = this.data?.year;

    this.dataService.getData().subscribe((res: any)=>{
      console.log(res);
      this.data = res;

      this.day = this.data?.day;
      this.week = this.data?.week;
      this.month = this.data?.month;
      this.year = this.data?.year;
    });

    localStorage.getItem("token") ? this.logged = true : this.logged = false;
  }

  save() {
    this.data = {
      day: this.day,
      week: this.week,
      month: this.month,
      year: this.year,
    };
    //localStorage.setItem("data", JSON.stringify(this.data));

    if(this.tout){
      clearTimeout(this.tout)
    }
    this.tout = setTimeout(()=>{
      this.dataService.progress = "Saving...";
      this.dataService.sendData(this.data).subscribe((res: any)=>{
        console.log(res);
        this.dataService.progress = "Saved";
      }, (err: any)=>{
        console.log(err);
        this.dataService.progress = "Error saving data";
      });
    }, 1000);
  }

  username: string = '';
  password: string = '';

  login() {
    // Add your login logic here
    if(this.username == 'mdrehan4all@gmail.com' && this.password == 'abcd'){
      const time = new Date().getMilliseconds();
      localStorage.setItem("token", "token-"+time);
      this.logged = true;
    }else{
      alert("Invalid credentials");
    }
  }

  logout() {
    localStorage.removeItem("token");
    this.logged = false;
  }

  downloadJson(data: any, filename: string): void {
    const jsonString = JSON.stringify(data, null, 2);
    const blob = new Blob([jsonString], { type: 'application/json' });
    const url = window.URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  }

  toggleFlag: boolean = false;
  toggleFullScreen(element?: HTMLElement, button?: HTMLElement) {
    if (!this.toggleFlag) {
      this.toggleFlag = true;  
      element?.style.setProperty('width', '100%');
      element?.style.setProperty('height', '100vh');
      element?.style.setProperty('position', 'fixed');
      element?.style.setProperty('top', '0');
      element?.style.setProperty('left', '0');
      element?.style.setProperty('scrollbar-width', '20px');

      button?.style.setProperty('position', 'fixed');
      button?.style.setProperty('top', '10px');
      button?.style.setProperty('right', '10px');
      if (button) button.innerText = 'X';
    }else{
      this.toggleFlag = false;
      element?.style.removeProperty('width');
      element?.style.removeProperty('height');
      element?.style.removeProperty('position');
      element?.style.removeProperty('top');
      element?.style.removeProperty('left');

      // button?.style.setProperty('position', 'relative');
      // button?.style.setProperty('left', 'calc(100% - 129px)');
      // button?.style.setProperty('top', '-35px');
        button?.style.removeProperty('position');
        button?.style.removeProperty('top');
        button?.style.removeProperty('right');
      if (button) button.innerText = 'Toggle full screen';
    }
  }
}
