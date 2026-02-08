type Listener = (error: Error) => void;

class ErrorEmitter {
  private listeners: Record<string, Listener[]> = {};

  on(eventName: string, listener: Listener) {
    if (!this.listeners[eventName]) {
      this.listeners[eventName] = [];
    }
    this.listeners[eventName].push(listener);
  }

  emit(eventName: string, error: Error) {
    const eventListeners = this.listeners[eventName];
    if (eventListeners) {
      eventListeners.forEach((listener) => listener(error));
    }
  }
}

export const errorEmitter = new ErrorEmitter();
