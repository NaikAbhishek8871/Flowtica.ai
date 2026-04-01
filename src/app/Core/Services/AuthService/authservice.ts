import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root',
})
export class Authservice {

  private baseApi = "http://192.168.1.9:8080/Public";
  private tokenKey = 'access_token';
  private accessToken: string | null = null;

  constructor(private http: HttpClient) {}

  setToken(token: string) {
    this.accessToken = token;
    localStorage.setItem(this.tokenKey, token);
  }

  getToken(): string | null {
    if (!this.accessToken) {
      this.accessToken = localStorage.getItem(this.tokenKey);
    }
    return this.accessToken;
  }

  clearToken() {
    this.accessToken = null;
    localStorage.removeItem(this.tokenKey);
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  login(userLoginIdOremail: string, userLoginPassword: string): Observable<any> {
    return this.http.post(`${this.baseApi}/LoginUser`, {
      userLoginIdOremail,
      userLoginPassword
    }, {
      withCredentials: true
    });
  }

  refreshToken(): Observable<any> {
    return this.http.post(`${this.baseApi}/RefreshToken`, {}, {
      withCredentials: true
    });
  }



  forgotPassword(email: string): Observable<any> {

    return this.http.post(`${this.baseApi}/Forgot-Password`, {
      email: email
    }, { responseType: 'text' });

  }

  /* REGISTER USER */
  registerUser(data: any): Observable<any> {

    return this.http.post(`${this.baseApi}/RegisterUser`, data, {
      withCredentials: true
    });

  }

  /* RESET PASSWORD */
  resetPassword(token: string, newPassword: string): Observable<any> {

    const body = {
      token: token,
      newPassword: newPassword
    };

    return this.http.post(`${this.baseApi}/Reset-Password`, body);

  }

  

}