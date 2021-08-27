import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

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

  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  createNewRoom() {
    this.router.navigateByUrl('create-room');
  }

}
