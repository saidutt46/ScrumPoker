import { Inject, Injectable } from '@angular/core';
import { Action, State, StateContext, Store } from '@ngxs/store';
import { GameService } from 'src/app/services/game.service';
import { NOTIFICATION_SERV_TOKEN, NotificationService } from 'src/app/services/notification.service';
import { GameActions } from './game.action';
import { GameStateModel } from './game.model';
import { catchError, tap } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { Game } from 'src/app/models/game.model';
import { BaseDtoResponse } from 'src/app/models/base-response.model';

@State<GameStateModel>({
    name: 'game',
    defaults: {
        gameDetails: null,
        createGameformLoading: false
    }
})

@Injectable()
export class GameState {
    constructor(
        @Inject(NOTIFICATION_SERV_TOKEN) private notifier: NotificationService,
        private gameService: GameService,
        private store: Store
    ) {}

    @Action(GameActions.PostGame)
    postGame({patchState}: StateContext<GameStateModel>, {payload}) {
        patchState({
            createGameformLoading: true
          });
          return this.gameService.createGame(payload).pipe(
            catchError((x) => {
              return throwError(x);
            }),
            tap((res: BaseDtoResponse<Game>) => {
                if (res) {
                    patchState({
                        gameDetails: res.payload,
                        createGameformLoading: false
                    });
                }
            }, err => {
              patchState({
                createGameformLoading: false
              });
              this.notifier.errorNotification(`Error: ${err.error}`);
            })
        );
    }

    @Action(GameActions.GetGameById)
    getGameById({patchState}: StateContext<GameStateModel>, {payload}) {
        return this.gameService.getGameById(payload).pipe(
            catchError((x) => {
              return throwError(x);
            }),
            tap((res: BaseDtoResponse<Game>) => {
                patchState({
                    gameDetails: res.payload
                });
            }, err => {
              this.notifier.errorNotification(`Error: ${err.error}`);
            })
        );
    }
}
