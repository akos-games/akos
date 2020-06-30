export interface Ui {
  loading: boolean;
  errors: {message: string; stack: string}[];
  errorDialogOpen: boolean;
}
