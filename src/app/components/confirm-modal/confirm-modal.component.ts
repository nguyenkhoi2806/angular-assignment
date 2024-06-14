import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  Renderer2,
} from '@angular/core';
import { PortalModule } from '@angular/cdk/portal';

@Component({
  selector: 'app-confirm-modal',
  standalone: true,
  templateUrl: './confirm-modal.component.html',
})
export class ConfirmModalComponent {
  @Input() message: string = 'Are you sure you want to perform this action?';
  @Output() confirmed = new EventEmitter<boolean>();
  @Output() closed = new EventEmitter<boolean>();

  constructor(private renderer: Renderer2, private el: ElementRef) {
    this.renderer.setStyle(document.body, 'overflow', 'hidden');
  }

  confirm() {
    this.confirmed.emit(true);
  }

  closeModal() {
    console.log('ok');
    this.closed.emit(true);
  }
}
