import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class Data {
  // Add firebase realtime database url here
  url = "https://macet-website-default-rtdb.asia-southeast1.firebasedatabase.app/todoapp.json";
  
  private darkModeSignal = signal<boolean>(false);

  constructor(private http: HttpClient){
    const savedTheme = localStorage.getItem('darkMode');
    if (savedTheme !== null) {
      this.darkModeSignal.set(savedTheme === 'true');
    } else {
      // Check system preference if no saved theme
      const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
      this.darkModeSignal.set(prefersDark);
    }
    this.applyTheme(); // Apply initial theme
  }
  toggleDarkMode(): void {
    this.darkModeSignal.update((current) => !current);
    this.applyTheme();
  }

  isDarkMode(): boolean {
    return this.darkModeSignal();
  }

  private applyTheme(): void {
    if (this.darkModeSignal()) {
      document.documentElement.classList.add('dark-mode');
      localStorage.setItem('darkMode', 'true');
    } else {
      document.documentElement.classList.remove('dark-mode');
      localStorage.setItem('darkMode', 'false');
    }
  }

  // send data to firebase realtime database
  sendData(obj: any){
    return this.http.put(this.url, obj)
  }

  // get data from firebase realtime database
  getData(){
    return this.http.get(this.url)
  }
}
