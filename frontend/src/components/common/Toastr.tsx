  // src/common/Toastr.tsx
  import { toast, type ToastOptions } from "react-toastify";
  import "react-toastify/dist/ReactToastify.css";

  // Optional: default options
  const defaultOptions: ToastOptions = {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  };

  export class ToasterService {
    // Success toast
    static typeSuccess(message: string, title?: string) {
      toast.success(`${title ? title + ": " : ""}${message}`, defaultOptions);
    }

    // Info toast
    static typeInfo(message: string, title?: string) {
      toast.info(`${title ? title + ": " : ""}${message}`, defaultOptions);
    }

    // Warning toast
    static typeWarning(message: string, title?: string) {
      toast.warn(`${title ? title + ": " : ""}${message}`, defaultOptions);
    }

    // Error toast
    static typeError(message: string, title?: string) {
      toast.error(`${title ? title + ": " : ""}${message}`, defaultOptions);
    }

    // Clear all toasts
    static removeAllToast() {
      toast.dismiss();
    }
  }
