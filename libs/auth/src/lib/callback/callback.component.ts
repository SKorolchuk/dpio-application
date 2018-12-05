import { Component, OnInit } from '@angular/core';
import { LoginComplete } from '../actions/authorize.actions';
import * as fromStore from '../reducers';
import { Store } from '@ngrx/store';

@Component({
  selector: 'dpio-application-callback',
  templateUrl: './callback.component.html',
  styleUrls: ['./callback.component.scss']
})
export class CallbackComponent implements OnInit {
  constructor(private store: Store<fromStore.AuthModulePartState>) {}

  ngOnInit() {
    this.store.dispatch(new LoginComplete());
  }
}
