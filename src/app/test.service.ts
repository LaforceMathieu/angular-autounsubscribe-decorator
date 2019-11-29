import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { AutoUnsubscribe } from './decorator/autounsubscribe';

@Injectable()
@AutoUnsubscribe()
export class TestService {

  private intervalSubject = new Subject<string>();

  constructor() { }

  public begin() {
    const interval = setInterval(() => {
      try {
        this.intervalSubject.next('TestService');
      } catch (error) {
        console.error('TestService subject destroyed');
        clearInterval(interval);
      }
  }, 1000);
    this.intervalSubject.subscribe(x => console.log(x));
  }
}
