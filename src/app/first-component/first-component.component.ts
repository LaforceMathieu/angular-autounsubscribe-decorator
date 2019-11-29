import { TestService } from './../test.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { AutoUnsubscribe } from '../decorator/autounsubscribe';

@Component({
  selector: 'app-first-component',
  templateUrl: './first-component.component.html',
  styleUrls: ['./first-component.component.css'],
  providers: [TestService]
})
@AutoUnsubscribe()
export class FirstComponentComponent implements OnInit, OnDestroy {

  private intervalSubject = new Subject<string>();

  constructor(private testService: TestService) { }

  ngOnInit() {
    this.testService.begin();

    const interval = setInterval(() => {
      try {
        this.intervalSubject.next('FirstComponentComponent');
      } catch (error) {
        console.error('FirstComponentComponent subject destroyed');
        clearInterval(interval);
      }
  }, 1000);
    this.intervalSubject.subscribe(x => console.log(x));
  }

  ngOnDestroy(): void {
    console.log('destroy');
  }

}
