import { CommonModule, NgClass } from '@angular/common';
import { Component, Input } from '@angular/core';
import { SnackbarState } from './snackbar.state';
import { SnackbarType } from './types/snackbar';

@Component({
  selector: 'app-snackbar',
  standalone: true,
  imports: [CommonModule, NgClass],
  templateUrl: './snackbar.component.html',
})
export class SnackbarComponent {
  @Input() type: SnackbarType = 'warning';
  @Input() visible: boolean = false;
  @Input() title: string | undefined;
  @Input() description: string | undefined;

  close() {
    SnackbarState.update((currentSnackbar) => {
      return {
        ...currentSnackbar,
        visible: false,
      };
    });
  }

  getClass() {
    if (this.type === 'success') {
      return 'bg-green-500 ';
    }

    if (this.type === 'error') {
      return 'bg-red-500';
    }
    return 'bg-yellow-500';
  }
}
