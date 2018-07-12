import {Component, OnInit} from '@angular/core';
import {AuthService} from "./auth/service/auth.service";
import {AppState} from "./reducers";
import {Store} from "@ngrx/store";
import {AttemptLogin} from "./auth/auth.actions";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app';

  constructor(private store:Store<AppState>) {

  }

  ngOnInit() {
   this.store.dispatch(new AttemptLogin());

  }

}
