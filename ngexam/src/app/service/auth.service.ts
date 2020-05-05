import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isAdmin = false;
  redirectUrl: string;
  constructor() { }
}
