import { CreateGame, Game } from 'src/app/models/game.model';

export namespace GameActions {
    export class PostGame {
        static readonly type = '[GAME] CREATE';
        constructor(public payload: CreateGame) { }
    }

    export class GetGameById {
        static readonly type = '[GAME] GET';
        constructor(public payload: Game) { }
    }

    export class DeleteGame {
        static readonly type = '[GAME] DELETE';
        constructor(public payload: string) { }
    }
}
