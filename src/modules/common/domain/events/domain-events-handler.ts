type EventHandler<T = any> = (data: T) => void;

export class DomainEventHandler {
  private static readonly handlers: { [key: string]: EventHandler[] } = {};

  static subscribe<T>(event: string, handler: EventHandler<T>): void {
    if (!this.handlers[event]) {
      this.handlers[event] = [];
    }

    this.handlers[event].push(handler);
  }

  static dispatch<T>(event: string, data: T): void {
    const handlers = this.handlers[event];

    if (!handlers) {
      return;
    }

    handlers.forEach((handler) => handler(data));
  }
}
