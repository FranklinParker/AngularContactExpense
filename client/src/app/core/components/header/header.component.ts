import {Component, OnInit, Output, EventEmitter, OnDestroy} from '@angular/core';
import {AuthService} from "../../../auth/service/auth.service";
import {LoggedInUser} from "../../../auth/model/loggedInUser";
import {select, Store} from "@ngrx/store";
import {AppState} from "../../../reducers";
import {selectLoggedInUser} from "../../../auth/auth.selector";
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  @Output('sidebarToggle') sidebarToggle = new EventEmitter<void>();
  loggedInUser: LoggedInUser;

  constructor(private authService: AuthService,
              private store: Store<AppState>) {
  }

  ngOnInit() {
    /** get logged in user */
    this.store
      .pipe(
        select(selectLoggedInUser),
        map(user=>{
          this.loggedInUser = user;
        })
      ).subscribe();

  }

  ngOnDestroy() {
  }

  onToggle() {
    this.sidebarToggle.emit();
  }

  onLogout(){
    this.authService.logout();
  }

  get displayName(){
    return this.loggedInUser?
      this.loggedInUser.firstName + ' ' + this.loggedInUser.lastName
      : null;
  }
}
