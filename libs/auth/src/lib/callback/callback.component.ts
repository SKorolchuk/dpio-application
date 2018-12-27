import { Component, OnInit } from '@angular/core';
import { LoginComplete } from '../actions/authorize.actions';
import * as fromStore from '../reducers';
import { Store } from '@ngrx/store';
import { ConfigurationService } from '@dpio-application/shared/src/lib/services/configuration.service';

@Component({
  selector: 'dpio-application-callback',
  templateUrl: './callback.component.html',
  styleUrls: ['./callback.component.scss']
})
export class CallbackComponent implements OnInit {
  constructor(private store: Store<fromStore.AuthModulePartState>, private configuration: ConfigurationService) {}

  ngOnInit() {
    if (!this.configuration.isPlatformServer) {
      this.store.dispatch(new LoginComplete());
    }
  }
}
