export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      assessment_categories: {
        Row: {
          created_at: string | null
          display_name: string
          id: number
          name: string
          pillar: string
          weight: number | null
        }
        Insert: {
          created_at?: string | null
          display_name: string
          id?: number
          name: string
          pillar: string
          weight?: number | null
        }
        Update: {
          created_at?: string | null
          display_name?: string
          id?: number
          name?: string
          pillar?: string
          weight?: number | null
        }
        Relationships: []
      }
      assessment_overall_scores: {
        Row: {
          assessment_id: number | null
          created_at: string | null
          id: number
          score: number
        }
        Insert: {
          assessment_id?: number | null
          created_at?: string | null
          id?: number
          score: number
        }
        Update: {
          assessment_id?: number | null
          created_at?: string | null
          id?: number
          score?: number
        }
        Relationships: [
          {
            foreignKeyName: "assessment_overall_scores_assessment_id_fkey"
            columns: ["assessment_id"]
            isOneToOne: false
            referencedRelation: "assessments"
            referencedColumns: ["id"]
          },
        ]
      }
      assessment_pillar_scores: {
        Row: {
          assessment_id: number | null
          category_id: number | null
          created_at: string | null
          id: number
          score: number
        }
        Insert: {
          assessment_id?: number | null
          category_id?: number | null
          created_at?: string | null
          id?: number
          score: number
        }
        Update: {
          assessment_id?: number | null
          category_id?: number | null
          created_at?: string | null
          id?: number
          score?: number
        }
        Relationships: [
          {
            foreignKeyName: "assessment_pillar_scores_assessment_id_fkey"
            columns: ["assessment_id"]
            isOneToOne: false
            referencedRelation: "assessments"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "assessment_pillar_scores_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "assessment_categories"
            referencedColumns: ["id"]
          },
        ]
      }
      assessment_questions: {
        Row: {
          category_id: number | null
          created_at: string | null
          id: number
          options: Json
          question_text: string
          weight: number | null
        }
        Insert: {
          category_id?: number | null
          created_at?: string | null
          id?: number
          options: Json
          question_text: string
          weight?: number | null
        }
        Update: {
          category_id?: number | null
          created_at?: string | null
          id?: number
          options?: Json
          question_text?: string
          weight?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "assessment_questions_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "assessment_categories"
            referencedColumns: ["id"]
          },
        ]
      }
      assessments: {
        Row: {
          created_at: string | null
          id: number
        }
        Insert: {
          created_at?: string | null
          id?: number
        }
        Update: {
          created_at?: string | null
          id?: number
        }
        Relationships: []
      }
      secrets: {
        Row: {
          created_at: string
          id: string
          name: string
          value: string
        }
        Insert: {
          created_at?: string
          id?: string
          name: string
          value: string
        }
        Update: {
          created_at?: string
          id?: string
          name?: string
          value?: string
        }
        Relationships: []
      }
      user_responses: {
        Row: {
          answer: number | null
          assessment_id: number | null
          completed: boolean | null
          created_at: string | null
          email: string | null
          id: number
          question_id: number | null
          session_id: string | null
        }
        Insert: {
          answer?: number | null
          assessment_id?: number | null
          completed?: boolean | null
          created_at?: string | null
          email?: string | null
          id?: number
          question_id?: number | null
          session_id?: string | null
        }
        Update: {
          answer?: number | null
          assessment_id?: number | null
          completed?: boolean | null
          created_at?: string | null
          email?: string | null
          id?: number
          question_id?: number | null
          session_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "user_responses_assessment_id_fkey"
            columns: ["assessment_id"]
            isOneToOne: false
            referencedRelation: "assessments"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_responses_question_id_fkey"
            columns: ["question_id"]
            isOneToOne: false
            referencedRelation: "assessment_questions"
            referencedColumns: ["id"]
          },
        ]
      }
      waitlist_entries: {
        Row: {
          created_at: string | null
          email: string
          first_name: string
          id: string
          processed: boolean | null
          source: string | null
        }
        Insert: {
          created_at?: string | null
          email: string
          first_name: string
          id?: string
          processed?: boolean | null
          source?: string | null
        }
        Update: {
          created_at?: string | null
          email?: string
          first_name?: string
          id?: string
          processed?: boolean | null
          source?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      assessment_category:
        | "physical_health"
        | "mental_health"
        | "environmental_health"
        | "income"
        | "independence"
        | "impact"
        | "relationships_with_others"
        | "relationship_with_self"
        | "relationship_with_god"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
