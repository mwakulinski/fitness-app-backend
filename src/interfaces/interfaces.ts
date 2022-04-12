export interface IWorkout {
  id: number;
  title: string;
  description: string;
  duration: number;
  data: string;
}

export interface IUser {
  id: number;
  name: string;
  email: string;
  weight: number;
  heigh?: number;
}

export interface IUpdatedWorkout {
  title?: string;
  description?: string;
  type?: string;
  data?: string;
}
