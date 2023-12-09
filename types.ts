import { Database } from "./supabase/types_db";

export interface Exercise {
  aliases: string[] | null;
  category: Database["public"]["Enums"]["categorytype"];
  date_created: string;
  date_updated: string;
  description: string | null;
  equipment: Database["public"]["Enums"]["equipmenttype"] | null;
  force: Database["public"]["Enums"]["forcetype"] | null;
  id: string;
  instructions: string[] | null;
  level: Database["public"]["Enums"]["leveltype"];
  mechanic: Database["public"]["Enums"]["mechanictype"] | null;
  name: string;
  primary_muscles: Database["public"]["Enums"]["muscle"][] | null;
  secondary_muscles: Database["public"]["Enums"]["muscle"][] | null;
  tips: string[] | null;
}

export interface Set {
  id: string;
  workout_unit_id: string;
  weight: number;
  repetitions: number;
  pause: number;
  order: number;
  completed?: boolean;
}

export interface WorkoutUnit {
  id: string;
  workout_id: string;
  exercise_id: string;
  order: number;
}

export interface TrainingUnit extends WorkoutUnit {
  name?: string;
}

export interface TrainingSet extends Set {
  completed: boolean;
}

export interface Workout {
  id: string;
  name: string;
  order: number;
}

export interface TrainingExercise {
  name: string;
  repetitions: number;
  weight: number;
}

export interface Training {
  id: string;
  date_start: Date;
  date_end?: Date;
  name: string;
  exercises_done: TrainingExercise[];
}
