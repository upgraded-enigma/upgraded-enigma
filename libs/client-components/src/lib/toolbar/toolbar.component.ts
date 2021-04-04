import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Store } from '@ngxs/store';
import {
  AppSidebarState,
  chatbotActions,
  sidebarUiActions,
  userActions,
} from '@upgraded-enigma/client-store';
import { IButton } from '@upgraded-enigma/client-util';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppToolbarComponent {
  @Input() public buttons: IButton[] = [
    {
      routerLink: ['user/auth'],
      icon: 'input',
      title: 'Log in',
      requiresAuth: false,
    },
    {
      routerLink: [''],
      icon: 'lock',
      title: 'Log out',
      requiresAuth: false,
      click: () => {
        void this.store.dispatch(new userActions.logOut()).subscribe();
      },
    },
    {
      routerLink: ['user'],
      icon: 'verified_user',
      title: 'User profile',
      requiresAuth: true,
    },
    {
      routerLink: ['user/data'],
      icon: 'dashboard',
      title: 'User data',
      requiresAuth: true,
    },
    {
      routerLink: ['user/rtc-chat'],
      icon: 'voice_chat',
      title: 'RTC Chat',
      requiresAuth: true,
    },
    {
      routerLink: ['workspaces'],
      icon: 'view_comfy',
      title: 'Workspaces',
      requiresAuth: true,
    },
    {
      routerLink: ['chatbot'],
      icon: 'chat',
      title: 'Chat',
      requiresAuth: true,
    },
  ];

  public readonly sidebarOpened$ = this.store
    .select(AppSidebarState.getState)
    .pipe(map(state => state.sidebarOpened));

  constructor(public readonly store: Store) {}

  public toggleSidebar(): void {
    void this.store.dispatch(new sidebarUiActions.toggleSidebar());
  }

  public toggleChatbot(): void {
    void this.store.dispatch(new chatbotActions.toggle());
  }
}
