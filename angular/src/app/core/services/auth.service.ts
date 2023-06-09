import { Injectable, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of, Subscription } from 'rxjs';
import { map, tap, delay, finalize } from 'rxjs/operators';
import { ApplicationUser } from '../models/application-user';
import { environment } from 'src/environments/environment';
import { RSAHelper } from 'src/app/core/utilities/rsaHelper';
import { AESHelper } from 'src/app/core/utilities/aesHelper';
interface LoginResult {
  username: string;
  role: string;
  originalUserName: string;
  accessToken: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService implements OnDestroy {
  private readonly apiUrl = `${environment.apiUrl}api/account`;
  private timer: Subscription | null = null;
  private _user = new BehaviorSubject<ApplicationUser | null>(null);
  user$ = this._user.asObservable();

  private storageEventListener(event: StorageEvent) {
    if (event.storageArea === localStorage) {
      if (event.key === 'logout-event') {
        this._user.next(null);
      }
      if (event.key === 'login-event') {
        this.http.get<LoginResult>(`${this.apiUrl}/user`).subscribe((x) => {
          this._user.next({
            username: x.username,
            role: x.role,
            originalUserName: x.originalUserName,
          });
        });
      }
    }
  }

  constructor(private router: Router, private http: HttpClient, private rsaHelper: RSAHelper, private aesHelper: AESHelper) {
    window.addEventListener('storage', this.storageEventListener.bind(this));
  }

  ngOnDestroy(): void {
    window.removeEventListener('storage', this.storageEventListener.bind(this));
  }

  login(username: string, password: string) {
    const user = {
      Username: username,
      Password: password
    }

    //AES excryption
    const aesKeyValue = this.aesHelper.aesKey();
    const encJsonUser = this.aesHelper.encrypt(JSON.stringify(user));
    //End

    return this.http
      .post<LoginResult>(`${this.apiUrl}/login`,
        { data: encJsonUser, aesKey: aesKeyValue })
      .pipe(
        map((x) => {
          this._user.next({
            username: x.username,
            role: x.role,
            originalUserName: x.originalUserName,
          });
          this.setLocalStorage(x);
          return x;
        })
      );
  }

  logout() {
    this.http
      .post<unknown>(`${this.apiUrl}/logout`, {})
      .pipe(
        finalize(() => {
          this.clearLocalStorage();
          this._user.next(null);
          this.router.navigate(['login']);
        })
      )
      .subscribe();
  }


  setLocalStorage(x: LoginResult) {
    localStorage.setItem('access_token', x.accessToken);
    localStorage.setItem('login-event', 'login' + Math.random());
  }

  clearLocalStorage() {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    localStorage.setItem('logout-event', 'logout' + Math.random());
  }

  private getTokenRemainingTime() {
    const accessToken = localStorage.getItem('access_token');
    if (!accessToken) {
      return 0;
    }
    const jwtToken = JSON.parse(atob(accessToken.split('.')[1]));
    const expires = new Date(jwtToken.exp * 1000);
    return expires.getTime() - Date.now();
  }



}
