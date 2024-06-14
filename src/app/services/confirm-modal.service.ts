import { Injectable, Injector } from '@angular/core';
import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';

import { ConfirmModalComponent } from 'app/components/confirm-modal/confirm-modal.component';

@Injectable({
  providedIn: 'root',
})
export class ConfirmModalService {
  private overlayRef!: OverlayRef | null;

  constructor(private overlay: Overlay, private injector: Injector) {}

  openModal(message: string, confirmCallback: () => void) {
    if (!this.overlayRef) {
      this.overlayRef = this.overlay.create({
        hasBackdrop: true,
        backdropClass: 'cdk-overlay-dark-backdrop',
        positionStrategy: this.overlay
          .position()
          .global()
          .centerHorizontally()
          .centerVertically(),
      });
    }
    const portal = new ComponentPortal(
      ConfirmModalComponent,
      null,
      this.injector
    );
    const componentRef = this.overlayRef.attach(portal);
    componentRef.instance.message = message;
    componentRef.instance.confirm = () => {
      confirmCallback();
      this.closePortal();
    };

    componentRef.instance.closed.subscribe(() => {
      this.closePortal();
    });
  }

  closePortal() {
    if (this.overlayRef) {
      this.overlayRef.detach();
      this.overlayRef = null;
    }
  }
}
