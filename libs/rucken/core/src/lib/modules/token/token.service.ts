import { isPlatformServer } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { decode } from 'jsonwebtoken';
import { BehaviorSubject } from 'rxjs';
import { TokenStorage } from './token.storage';

export function tokenServiceInitializeApp(tokenService: TokenService) {
  return () => tokenService.initializeApp();
}

@Injectable()
export class TokenService {

  get current() {
    return this.current$.getValue();
  }
  set current(value: string) {
    this._tokenStorage.set(value);
    this.current$.next(value);
  }
  current$ = new BehaviorSubject<string>(undefined);
  tokenHasExpired$ = new BehaviorSubject<boolean | undefined>(undefined);

  private _checkTokenHasExpiredIntervalRef;

  constructor(
    private _tokenStorage: TokenStorage,
    @Inject(PLATFORM_ID) private _platformId: Object
  ) {
  }
  initializeApp() {
    return new Promise((resolve, reject) => {
      if (this.current !== this._tokenStorage.get()) {
        this.current = this._tokenStorage.get();
      }
      resolve();
    });
  }
  stopCheckTokenHasExpired() {
    if (!isPlatformServer(this._platformId)) {
      if (this._checkTokenHasExpiredIntervalRef) {
        clearInterval(this._checkTokenHasExpiredIntervalRef);
      }
    }
  }
  startCheckTokenHasExpired() {
    if (!isPlatformServer(this._platformId)) {
      this._checkTokenHasExpiredIntervalRef = setInterval(_ => {
        if (this.tokenHasExpired()) {
          this.tokenHasExpired$.next(true);
        }
      }, 30 * 1000);
    }
  }
  getTokenData(token: string): { payload: { exp: number } } {
    return decode(token, { complete: true }) as any;
  }
  tokenHasExpired(token?: string) {
    if (!token) {
      token = this.current;
    }
    try {
      const result = new Date() > new Date(this.getTokenData(token).payload.exp * 1000);
      return result;
    } catch (error) {
      return true;
    }
  }
  getHeader() {
    const headers = {};
    headers[this._tokenStorage.headerName] = this._tokenStorage.headerPrefix + ' ' + this._tokenStorage.get();
    return headers;
  }
}
