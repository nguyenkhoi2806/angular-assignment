export type SnackbarOptions = {
  visible: boolean;
  title?: string;
  description?: string;
  type?: SnackbarType;
};

export type SnackbarType = 'error' | 'success' | 'warning';
