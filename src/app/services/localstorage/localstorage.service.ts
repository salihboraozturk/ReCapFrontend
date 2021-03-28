import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  constructor() {}
  get(key: string) {
    var result = localStorage.getItem(key);
    if (result) {
      return result;
    } else {
      return undefined;
    }
  }
  set(key: string, value: string) {
    localStorage.setItem(key, value);
  }
  delete(key: string) {
    localStorage.removeItem(key);
  }
  clear() {
    localStorage.clear();
  }
}
