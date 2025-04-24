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
          completed: boolean | null
          completion_time: string | null
          created_at: string | null
          id: number
        }
        Insert: {
          completed?: boolean | null
          completion_time?: string | null
          created_at?: string | null
          id?: number
        }
        Update: {
          completed?: boolean | null
          completion_time?: string | null
          created_at?: string | null
          id?: number
        }
        Relationships: []
      }
      dashboard_config: {
        Row: {
          created_at: string
          id: string
          passphrase: string
        }
        Insert: {
          created_at?: string
          id?: string
          passphrase: string
        }
        Update: {
          created_at?: string
          id?: string
          passphrase?: string
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
      get_question_completion_stats: {
        Args: Record<PropertyKey, never>
        Returns: {
          question_id: number
          response_count: number
        }[]
      }
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

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      assessment_category: [
        "physical_health",
        "mental_health",
        "environmental_health",
        "income",
        "independence",
        "impact",
        "relationships_with_others",
        "relationship_with_self",
        "relationship_with_god",
      ],
    },
  },
} as const
