import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { UserStateSelector } from 'src/app/ngxs/user/user.selector';
import { LoginComponent } from '../login/login.component';
import { RegisterComponent } from '../register/register.component';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {
  @Select(UserStateSelector.isAuthenticated) isAuthenticated$: Observable<boolean>;

  constructor(
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
  }

  userLogin() {
    this.dialog.open(LoginComponent, {
      width: '30%',
      height: 'auto',
      panelClass: 'custom-dialog'
    });
  }

  userRegister() {
    this.dialog.open(RegisterComponent, {
      width: '30%',
      height: 'auto',
      panelClass: 'custom-dialog'
    });
  }

}
