import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { CreateGame, Game, OwnerSettingsType, VotingSystemTypes } from 'src/app/models/game.model';
import { UserProfileModel } from 'src/app/models/user-profile.model';
import { GameActions } from 'src/app/ngxs/game/game.action';
import { GameStateSelector } from 'src/app/ngxs/game/game.selector';
import { UserStateSelector } from 'src/app/ngxs/user/user.selector';

@Component({
  selector: 'app-create-room',
  templateUrl: './create-room.component.html',
  styleUrls: ['./create-room.component.scss']
})
export class CreateRoomComponent implements OnInit {
  @Select(UserStateSelector.getUserProfile) userDetails$: Observable<UserProfileModel>;
  @Select(GameStateSelector.getGameDetails) gameDetails$: Observable<Game>;

  createRoomForm: FormGroup;
  votingSystem = VotingSystemTypes;
  userProfile: UserProfileModel;
  ownerSettings: OwnerSettingsType[];
  constructor(
    private store: Store,
    private router: Router,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.userDetails$.subscribe(res => {
      this.userProfile = res;
    });
    this.ownerSettings = [
      {
        key: 'Only Me',
        value: this.userProfile.id
      },
      {
        key: 'Everyone',
        value: null
      },
    ];
    console.warn(this.ownerSettings);
    console.warn(this.ownerSettings[0].key);
    this.createRoomForm = this.fb.group({
      name: ['', [Validators.required]],
      votingSystem: [this.votingSystem.Fibonacci, [Validators.required]],
      owner: ['']
    });
  }

  navigateBack(): void {
    this.router.navigateByUrl('home');
  }

  createRoom(): void {
    const model = new CreateGame();
    model.name = this.createRoomForm.get('name').value;
    model.votingSystem = this.createRoomForm.get('votingSystem').value;
    model.owner = this.createRoomForm.get('owner').value;
    console.warn(model);
    this.store.dispatch([
      new GameActions.PostGame(model)
    ]).toPromise().then(s => {
      this.gameDetails$.subscribe(res => {
        alert(res.id);
      });
    });
  }

}
