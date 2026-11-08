import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import {
  CheckCircle2,
  Info,
  XCircle,
  type LucideIcon,
} from "lucide-react";
import {
  ToastContext,
  type ToastInput,
  type ToastItem,
  type ToastVariant,
} from "./toast";

const TOAST_DURATION_MS = 4000;
const MAX_VISIBLE_TOASTS = 3;

type VariantStyle = {
  Icon: LucideIcon;
  iconClassName: string;
  progressClassName: string;
};

const variantStyles: Record<ToastVariant, VariantStyle> = {
  success: {
    Icon: CheckCircle2,
    iconClassName: "text-emerald-500",
    progressClassName: "bg-emerald-500",
  },
  info: {
    Icon: Info,
    iconClassName: "text-sky-500",
    progressClassName: "bg-sky-500",
  },
  error: {
    Icon: XCircle,
    iconClassName: "text-red-500",
    progressClassName: "bg-red-500",
  },
};

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<ToastItem[]>([]);
  const nextIdRef = useRef(0);
  const timeoutsRef = useRef<Map<number, number>>(new Map());

  const showToast = useCallback(
    ({ message, variant = "info" }: ToastInput) => {
      const id = nextIdRef.current;
      nextIdRef.current += 1;

      setToasts((prev) => [
        ...prev.slice(-(MAX_VISIBLE_TOASTS - 1)),
        { id, message, variant },
      ]);

      const timeout = window.setTimeout(() => {
        setToasts((prev) => prev.filter((toast) => toast.id !== id));
        timeoutsRef.current.delete(id);
      }, TOAST_DURATION_MS);

      timeoutsRef.current.set(id, timeout);
    },
    [],
  );

  useEffect(() => {
    const timeouts = timeoutsRef.current;

    return () => {
      timeouts.forEach((timeout) => window.clearTimeout(timeout));
      timeouts.clear();
    };
  }, []);

  const value = useMemo(() => ({ showToast }), [showToast]);

  return (
    <ToastContext.Provider value={value}>
      {children}

      <div
        className="pointer-events-none fixed inset-x-4 top-4 z-50 flex flex-col items-end gap-2 sm:inset-x-auto sm:right-4 sm:w-96"
        aria-live="polite"
        aria-atomic="false"
      >
        {toasts.map((toast) => {
          const { Icon, iconClassName, progressClassName } =
            variantStyles[toast.variant];

          return (
            <div
              key={toast.id}
              role="status"
              className="toast-enter w-full overflow-hidden rounded-xl border border-slate-200 bg-white/95 shadow-lg backdrop-blur dark:border-slate-700 dark:bg-slate-900/95"
            >
              <div className="flex items-start gap-3 p-3.5">
                <Icon
                  aria-hidden="true"
                  className={`mt-0.5 h-5 w-5 shrink-0 ${iconClassName}`}
                />
                <p className="text-sm leading-5 text-slate-700 dark:text-slate-200">
                  {toast.message}
                </p>
              </div>

              <div
                className={`toast-progress h-0.5 ${progressClassName}`}
                style={{ animationDuration: `${TOAST_DURATION_MS}ms` }}
              />
            </div>
          );
        })}
      </div>
    </ToastContext.Provider>
  );
}
