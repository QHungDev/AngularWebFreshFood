import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TokenResponse } from '../responses/token-response';
import { AccountService } from './account.service';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor(private accountService: AccountService) { }

  saveSession(tokenResponse: TokenResponse) {
    window.localStorage.setItem('Username', tokenResponse.username);
    window.localStorage.setItem('TokenHash', tokenResponse.tokenHash);
  }

  getSession(): TokenResponse | null {
    if (window.localStorage.getItem('Username')) {
      const tokenResponse: TokenResponse = {
        username: window.localStorage.getItem('Username') || '',
        tokenHash: window.localStorage.getItem('TokenHash') || ''
      };

      return tokenResponse;
    }
    return null;
  }

  logout() {
    window.localStorage.clear();
  }

  isLoggedIn(): boolean {
    let session = this.getSession();
    if (!session) {
      return false;
    }

    return true;
  }
}
