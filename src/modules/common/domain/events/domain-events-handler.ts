type EventHandler<T> = (data: T) => void;

export class DomainEventHandler {
  private static readonly handlers: { [key: string]: EventHandler<unknown>[] } = {};

  static subscribe<T>(event: string, handler: EventHandler<T>): void {
    if (!this.handlers[event]) {
      this.handlers[event] = [];
    }

    this.handlers[event].push(handler as EventHandler<unknown>);
  }

  static dispatch<T>(event: string, data: T): void {
    const handlers = this.handlers[event];

    if (!handlers) {
      return;
    }

    handlers.forEach((handler): void => handler(data));
  }
}
