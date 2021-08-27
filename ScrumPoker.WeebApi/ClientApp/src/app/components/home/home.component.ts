import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  actionCardList = [
    'Sign Up',
    'Create an Instant Room',
    'Invite Others',
    'Start estimation stories',
    `Well don't forget to play Poker`
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
