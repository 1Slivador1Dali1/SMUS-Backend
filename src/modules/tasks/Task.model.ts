export interface ITask {
  id: string;
  name: string;
  description: string;
  status: string;
  created_at: Date;
  updated_at: Date;
  created_by: string;
  responsible_id: string;
}

export interface ITasks {
  items: ITask[];
}
