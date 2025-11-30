export interface IUser {
  id: string;
  name: string;
  isAdmin: boolean;
}

export interface IUsers {
  items: IUser[];
}
