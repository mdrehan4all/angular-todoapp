import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class Data {
  url = "https://macet-website-default-rtdb.asia-southeast1.firebasedatabase.app/todoapp.json";
  
  constructor(private http: HttpClient){}

  sendData(obj: any){
    return this.http.put(this.url, obj)
  }

  getData(){
    return this.http.get(this.url)
  }

}
