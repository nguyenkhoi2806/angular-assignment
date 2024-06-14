import { Component, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CdkPortalOutlet, ComponentPortal } from '@angular/cdk/portal';

import { NotificationComponent } from './components/notification/notification.component';
import { ConfirmModalComponent } from './components/confirm-modal/confirm-modal.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NotificationComponent],
  templateUrl: './app.component.html',
})
export class AppComponent {
  title = 'angular-assignment';
  @ViewChild(CdkPortalOutlet, { static: true })
  portalOutlet!: CdkPortalOutlet;
  confirmModal!: ComponentPortal<ConfirmModalComponent>;

  ngOnInit() {
    this.confirmModal = new ComponentPortal(ConfirmModalComponent);
  }

  attachPortal() {
    this.portalOutlet.attach(this.confirmModal);
  }

  detachPortal() {
    this.portalOutlet.detach();
  }
}
