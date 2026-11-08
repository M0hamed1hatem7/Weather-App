import { createContext, useContext } from "react";

export type ToastVariant = "success" | "info" | "error";

export type ToastInput = {
  message: string;
  variant?: ToastVariant;
};

export type ToastItem = {
  id: number;
  message: string;
  variant: ToastVariant;
};

export type ToastContextValue = {
  showToast: (toast: ToastInput) => void;
};

export const ToastContext = createContext<ToastContextValue | null>(null);

export function useToast(): ToastContextValue {
  const context = useContext(ToastContext);

  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }

  return context;
}
