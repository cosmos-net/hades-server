export interface IMediatorStoreService {
  publish<T>(eventName: string, payload: T): void;
  subscribe<T>(eventName: string, handler: (payload: T) => void): void;
}
