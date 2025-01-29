export interface IMediatorStore {
  emit(event: string, data: unknown): Promise<void>;
  listening(event: string, listener: (data: unknown) => void): Promise<void>;
}
