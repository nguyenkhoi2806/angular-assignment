import { Component, effect } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { SnackbarComponent } from './components/snackbar/snackbar.component';
import { SnackbarState } from './components/snackbar/snackbar.state';
import { SnackbarOptions } from './components/snackbar/types/snackbar';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, SnackbarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  template: `
    <main>
      @if(snackbar) {
      <snackbar
        [title]="snackbar.title"
        [description]="snackbar.description"
        [visible]="snackbar.visible"
      ></snackbar>
      }
    </main>
  `,
})
export class AppComponent {
  title = 'angular-assignment';
  snackbar: SnackbarOptions | undefined;

  constructor() {
    effect(() => {
      this.snackbar = SnackbarState();
    });
  }
}
