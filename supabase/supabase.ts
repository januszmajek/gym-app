export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      exercises: {
        Row: {
          aliases: string[] | null
          category: Database["public"]["Enums"]["categorytype"]
          date_created: string
          date_updated: string
          description: string | null
          equipment: Database["public"]["Enums"]["equipmenttype"] | null
          force: Database["public"]["Enums"]["forcetype"] | null
          id: string
          instructions: string[] | null
          level: Database["public"]["Enums"]["leveltype"]
          mechanic: Database["public"]["Enums"]["mechanictype"] | null
          name: string
          primary_muscles: Database["public"]["Enums"]["muscle"][] | null
          secondary_muscles: Database["public"]["Enums"]["muscle"][] | null
          tips: string[] | null
        }
        Insert: {
          aliases?: string[] | null
          category: Database["public"]["Enums"]["categorytype"]
          date_created?: string
          date_updated?: string
          description?: string | null
          equipment?: Database["public"]["Enums"]["equipmenttype"] | null
          force?: Database["public"]["Enums"]["forcetype"] | null
          id: string
          instructions?: string[] | null
          level: Database["public"]["Enums"]["leveltype"]
          mechanic?: Database["public"]["Enums"]["mechanictype"] | null
          name: string
          primary_muscles?: Database["public"]["Enums"]["muscle"][] | null
          secondary_muscles?: Database["public"]["Enums"]["muscle"][] | null
          tips?: string[] | null
        }
        Update: {
          aliases?: string[] | null
          category?: Database["public"]["Enums"]["categorytype"]
          date_created?: string
          date_updated?: string
          description?: string | null
          equipment?: Database["public"]["Enums"]["equipmenttype"] | null
          force?: Database["public"]["Enums"]["forcetype"] | null
          id?: string
          instructions?: string[] | null
          level?: Database["public"]["Enums"]["leveltype"]
          mechanic?: Database["public"]["Enums"]["mechanictype"] | null
          name?: string
          primary_muscles?: Database["public"]["Enums"]["muscle"][] | null
          secondary_muscles?: Database["public"]["Enums"]["muscle"][] | null
          tips?: string[] | null
        }
        Relationships: []
      }
      profiles: {
        Row: {
          avatar_url: string | null
          full_name: string | null
          id: string
          updated_at: string | null
          username: string | null
          website: string | null
        }
        Insert: {
          avatar_url?: string | null
          full_name?: string | null
          id: string
          updated_at?: string | null
          username?: string | null
          website?: string | null
        }
        Update: {
          avatar_url?: string | null
          full_name?: string | null
          id?: string
          updated_at?: string | null
          username?: string | null
          website?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "profiles_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      "workout units": {
        Row: {
          created_at: string
          exercise_id: string
          id: number
          sets: Json[]
          workout_id: number | null
        }
        Insert: {
          created_at?: string
          exercise_id: string
          id?: number
          sets: Json[]
          workout_id?: number | null
        }
        Update: {
          created_at?: string
          exercise_id?: string
          id?: number
          sets?: Json[]
          workout_id?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "workout units_exercise_id_fkey"
            columns: ["exercise_id"]
            isOneToOne: false
            referencedRelation: "exercises"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "workout units_workout_id_fkey"
            columns: ["workout_id"]
            isOneToOne: false
            referencedRelation: "workouts"
            referencedColumns: ["id"]
          }
        ]
      }
      workouts: {
        Row: {
          created_at: string
          id: number
          name: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string
          id?: number
          name?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string
          id?: number
          name?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "workouts_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          }
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      categorytype:
        | "strength"
        | "stretching"
        | "plyometrics"
        | "strongman"
        | "powerlifting"
        | "cardio"
        | "olympic weightlifting"
      equipmenttype:
        | "body only"
        | "machine"
        | "other"
        | "foam roll"
        | "kettlebells"
        | "dumbbell"
        | "cable"
        | "barbell"
        | "medicine ball"
        | "bands"
        | "exercise ball"
        | "e-z curl bar"
      forcetype: "pull" | "push" | "static"
      leveltype: "beginner" | "intermediate" | "expert"
      mechanictype: "compound" | "isolation"
      muscle:
        | "abdominals"
        | "hamstrings"
        | "adductors"
        | "quadriceps"
        | "biceps"
        | "shoulders"
        | "chest"
        | "middle back"
        | "calves"
        | "glutes"
        | "lower back"
        | "lats"
        | "triceps"
        | "traps"
        | "forearms"
        | "neck"
        | "abductors"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
