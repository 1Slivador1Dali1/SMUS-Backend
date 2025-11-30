export interface INotion {
  id: string;
  name: string;
  description: string | null;
  created_at: Date;
  updated_at: Date;
}

export interface INotions {
  items: INotion[];
}
