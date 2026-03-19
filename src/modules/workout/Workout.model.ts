// #TODO: Updated model

export interface Exercise {
  id: string;
  name: string;
  description: string | null;
  created_at: Date;
  updated_at: Date;
}

export interface IWorkout {
  id: string;
  name: string;
  description: string;
  type: string;
  place: string;
  exercises: Exercise[];
  created_at: Date;
  updated_at: Date;
}

export interface IWorkouts {
  items: IWorkout[];
}

export interface CreateWorkoutDto {
  name: string;
  description: string;
}
