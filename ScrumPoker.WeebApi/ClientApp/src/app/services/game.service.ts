import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { BaseDtoResponse } from '../models/base-response.model';
import { CreateGame, Game } from '../models/game.model';

@Injectable({
  providedIn: 'root'
})
export class GameService {
  private apiUrl = `${environment.API_BASE_URL}/games`;

  constructor(
    private http: HttpClient
  ) { }

  public createGame(model: CreateGame): Observable<BaseDtoResponse<Game>> {
    return this.http.post<BaseDtoResponse<Game>>(`${this.apiUrl}`, model);
  }

  public getGameById(id: string): Observable<BaseDtoResponse<Game>> {
    return this.http.get<BaseDtoResponse<Game>>(`${this.apiUrl}/${id}`);
  }

  public deleteGame(id: string): Observable<BaseDtoResponse<Game>> {
    return this.http.delete<BaseDtoResponse<Game>>(`${this.apiUrl}/${id}`);
  }
}
