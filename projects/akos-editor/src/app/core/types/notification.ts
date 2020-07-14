export interface Notification {
  message: string;
  actionText?: string;
  actionFn?: () => void
}
