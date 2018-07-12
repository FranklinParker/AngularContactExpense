import {Component, OnInit, EventEmitter, Output, OnDestroy} from '@angular/core';
import {AuthService} from "../../../auth/service/auth.service";
import {LoggedInUser} from "../../../auth/model/loggedInUser";
import {Store} from "@ngrx/store";
import {AppState} from "../../../reducers";
import {isLoggedIn, selectLoggedInUser} from "../../../auth/auth.selector";

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.css']
})
export class SideNavComponent implements OnInit, OnDestroy {
  @Output('closeSideNav') closeSideNav = new EventEmitter();
  userLoggedIn: boolean;

  constructor(private authService: AuthService,
              private store: Store<AppState>) {
  }

  ngOnInit() {

    this.store.select(isLoggedIn)
      .subscribe((loggedIn) => {
        this.userLoggedIn = loggedIn;
      })

  }

  ngOnDestroy() {
    console.log('side nav destroyed');
  }


  onSidenavClose() {
    this.closeSideNav.emit();
  }

  onLogout() {
    this.authService.logout();
    this.onSidenavClose();
  }

}
