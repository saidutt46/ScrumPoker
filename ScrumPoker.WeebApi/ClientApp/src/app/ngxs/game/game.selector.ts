import { Selector } from '@ngxs/store';
import { GameStateModel } from './game.model';
import { GameState } from './game.state';

export class GameStateSelector {
    @Selector([GameState])
    static getGameDetails(state: GameStateModel) {
        return state.gameDetails;
    }

    @Selector([GameState])
    static formLoading(state: GameStateModel) {
        return state.createGameformLoading;
    }
}
