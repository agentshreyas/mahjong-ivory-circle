let lastCapturedError: Error | null = null;

export function captureError(error: unknown) {
  if (error instanceof Error) {
    lastCapturedError = error;
  } else {
    lastCapturedError = new Error(String(error));
  }
}

export function consumeLastCapturedError(): Error | null {
  const err = lastCapturedError;
  lastCapturedError = null;
  return err;
}

export function setupGlobalErrorCapture() {
  if (typeof window !== "undefined") {
    window.addEventListener("error", (event) => {
      captureError(event.error);
    });
    window.addEventListener("unhandledrejection", (event) => {
      captureError(event.reason);
    });
  }
}
