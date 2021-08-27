import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthBaseResponse } from '../models/base-response.model';
import { LoginResponseModel, UserLoginModel } from '../models/user-login.model';
import { UserRegisterModel } from '../models/user-register.model';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private apiUrl = `${environment.API_BASE_URL}/user`;

  constructor(
    private http: HttpClient
  ) { }

  public login(model: UserLoginModel): Observable<LoginResponseModel> {
    return this.http.post<LoginResponseModel>(`${this.apiUrl}/login`, model);
  }

  public registerUser(model: UserRegisterModel): Observable<AuthBaseResponse> {
    // const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http.post<AuthBaseResponse>(`${this.apiUrl}/register`, model, {headers: headers});
  }

  public getUserProfileById(id: string) {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
    return this.http.get(`${this.apiUrl}/${id}`,
    { headers: headers});
  }

  public getAllUsers() {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
    return this.http.get(`${this.apiUrl}/listall`,
    { headers: headers});
  }
}
