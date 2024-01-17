interface ToastInterface {
  add(args: {
    severity?: string;
    summary?: string;
    detail?: string;
    life?: number;
    closable?: boolean;
    group?: string;
  }): void;
  removeGroup(group: string): void;
  removeAllGroups(): void;
}

class ToastUtils {
  private static toast: ToastInterface;

  public static init(toast: ToastInterface): void {
    this.toast = toast;
  }

  public static success(message: string): void {
    ToastUtils.toast.add({
      severity: "success",
      detail: message,
      life: 5000,
    });
  }

  public static info(message: string): void {
    ToastUtils.toast.add({
      severity: "info",
      detail: message,
      life: 5000,
    });
  }

  public static warn(message: string): void {
    ToastUtils.toast.add({
      severity: "warn",
      detail: message,
      life: 5000,
    });
  }

  public static error(message: string): void {
    ToastUtils.toast.add({
      severity: "error",
      detail: message,
      life: 5000,
    });
  }

  public static removeAll(): void {
    ToastUtils.toast.removeAllGroups();
  }
}

export { ToastInterface, ToastUtils };
