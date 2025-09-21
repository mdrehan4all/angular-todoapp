import { Component } from '@angular/core';
import { Data } from '../data';

@Component({
  selector: 'app-header',
  standalone: false,
  templateUrl: './header.html',
  styleUrl: './header.scss'
})
export class Header {
  constructor(public dataService: Data) {}
}
