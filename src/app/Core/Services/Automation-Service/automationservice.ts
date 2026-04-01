import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AutomationService {

  private data: any[] = [];

  getAll() {
    return this.data;
  }

  add(item: any) {
    this.data.push(item);
  }

  delete(item: any) {
    this.data = this.data.filter(x => x !== item);
  }
}