import { signal } from '@angular/core';
import { SnackbarOptions } from './types/snackbar';

export const InitialState: SnackbarOptions = {
  visible: false,
};

export const SnackbarState = signal(InitialState);
