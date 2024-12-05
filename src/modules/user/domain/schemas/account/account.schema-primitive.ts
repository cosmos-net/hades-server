export interface IAccountSchemaPrimitive {
  id: number;
  uuid: string;
  username: string[];
  password: string[];
  email: string;
  createdAt: Date;
  updatedAt: Date;
  destroyedAt: Date;
}

export interface IListAccountSchemaPrimitive {
  total: number;
  items: IAccountSchemaPrimitive[];
}
