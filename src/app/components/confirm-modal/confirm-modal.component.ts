import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  Renderer2,
} from '@angular/core';

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

  ngOnDestroy() {
    this.renderer.setStyle(document.body, 'overflow', 'auto');
  }

  confirm() {
    this.confirmed.emit(true);
    this.closeModal();
  }

  closeModal() {
    this.closed.emit(true);
    this.renderer.removeChild(document.body, this.el.nativeElement);
  }
}
