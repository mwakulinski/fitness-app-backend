export interface IWorkout {
  id: number;
  title: string;
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
