export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.4"
  }
  public: {
    Tables: {
      donation: {
        Row: {
          amount_intended_gbp: number
          created_at: string
          donation_type: string
          donor_id: string
          gift_aid: boolean
          id: string
          intention: string | null
          project_id: string | null
          reference: string
          status: string
          stripe_sub_id: string | null
          updated_at: string
        }
        Insert: {
          amount_intended_gbp: number
          created_at?: string
          donation_type: string
          donor_id: string
          gift_aid?: boolean
          id?: string
          intention?: string | null
          project_id?: string | null
          reference?: string
          status?: string
          stripe_sub_id?: string | null
          updated_at?: string
        }
        Update: {
          amount_intended_gbp?: number
          created_at?: string
          donation_type?: string
          donor_id?: string
          gift_aid?: boolean
          id?: string
          intention?: string | null
          project_id?: string | null
          reference?: string
          status?: string
          stripe_sub_id?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "donation_donor_id_fkey"
            columns: ["donor_id"]
            isOneToOne: false
            referencedRelation: "donor"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "donation_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "project"
            referencedColumns: ["id"]
          },
        ]
      }
      donor: {
        Row: {
          created_at: string
          deleted_at: string | null
          email: string
          first_name: string
          id: string
          last_name: string
          phone: string | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          deleted_at?: string | null
          email: string
          first_name: string
          id?: string
          last_name: string
          phone?: string | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          deleted_at?: string | null
          email?: string
          first_name?: string
          id?: string
          last_name?: string
          phone?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      donor_address: {
        Row: {
          city: string
          country: string
          created_at: string
          donor_id: string
          id: string
          is_primary: boolean
          line_1: string
          line_2: string | null
          postcode: string | null
        }
        Insert: {
          city: string
          country?: string
          created_at?: string
          donor_id: string
          id?: string
          is_primary?: boolean
          line_1: string
          line_2?: string | null
          postcode?: string | null
        }
        Update: {
          city?: string
          country?: string
          created_at?: string
          donor_id?: string
          id?: string
          is_primary?: boolean
          line_1?: string
          line_2?: string | null
          postcode?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "donor_address_donor_id_fkey"
            columns: ["donor_id"]
            isOneToOne: false
            referencedRelation: "donor"
            referencedColumns: ["id"]
          },
        ]
      }
      ecosystem_stage: {
        Row: {
          description: string | null
          id: string
          sanity_id: string | null
          sort_order: number
          title: string
        }
        Insert: {
          description?: string | null
          id?: string
          sanity_id?: string | null
          sort_order?: number
          title: string
        }
        Update: {
          description?: string | null
          id?: string
          sanity_id?: string | null
          sort_order?: number
          title?: string
        }
        Relationships: []
      }
      location: {
        Row: {
          created_at: string
          description: string | null
          id: string
          latitude: number | null
          longitude: number | null
          name: string
          sanity_id: string | null
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: string
          latitude?: number | null
          longitude?: number | null
          name: string
          sanity_id?: string | null
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: string
          latitude?: number | null
          longitude?: number | null
          name?: string
          sanity_id?: string | null
        }
        Relationships: []
      }
      marketing_subscription: {
        Row: {
          consent_source: string
          donor_id: string | null
          email: string
          first_name: string
          id: string
          last_name: string
          status: string
          subscribed_at: string
          unsubscribed_at: string | null
        }
        Insert: {
          consent_source: string
          donor_id?: string | null
          email: string
          first_name: string
          id?: string
          last_name: string
          status?: string
          subscribed_at?: string
          unsubscribed_at?: string | null
        }
        Update: {
          consent_source?: string
          donor_id?: string | null
          email?: string
          first_name?: string
          id?: string
          last_name?: string
          status?: string
          subscribed_at?: string
          unsubscribed_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "marketing_subscription_donor_id_fkey"
            columns: ["donor_id"]
            isOneToOne: false
            referencedRelation: "donor"
            referencedColumns: ["id"]
          },
        ]
      }
      payment: {
        Row: {
          amount_gbp: number | null
          amount_local: number
          created_at: string
          currency: string
          donation_id: string
          exchange_rate: number
          frequency: string
          fx_rate_source: string | null
          gateway_ref: string | null
          id: string
          paid_at: string | null
          payment_method: string
          status: string
        }
        Insert: {
          amount_gbp?: number | null
          amount_local: number
          created_at?: string
          currency?: string
          donation_id: string
          exchange_rate?: number
          frequency: string
          fx_rate_source?: string | null
          gateway_ref?: string | null
          id?: string
          paid_at?: string | null
          payment_method: string
          status?: string
        }
        Update: {
          amount_gbp?: number | null
          amount_local?: number
          created_at?: string
          currency?: string
          donation_id?: string
          exchange_rate?: number
          frequency?: string
          fx_rate_source?: string | null
          gateway_ref?: string | null
          id?: string
          paid_at?: string | null
          payment_method?: string
          status?: string
        }
        Relationships: [
          {
            foreignKeyName: "payment_donation_id_fkey"
            columns: ["donation_id"]
            isOneToOne: false
            referencedRelation: "donation"
            referencedColumns: ["id"]
          },
        ]
      }
      project: {
        Row: {
          category_id: string | null
          created_at: string
          id: string
          is_active: boolean
          location_id: string | null
          name: string
          sanity_id: string | null
          slug: string
          stage_id: string | null
          updated_at: string
        }
        Insert: {
          category_id?: string | null
          created_at?: string
          id?: string
          is_active?: boolean
          location_id?: string | null
          name: string
          sanity_id?: string | null
          slug: string
          stage_id?: string | null
          updated_at?: string
        }
        Update: {
          category_id?: string | null
          created_at?: string
          id?: string
          is_active?: boolean
          location_id?: string | null
          name?: string
          sanity_id?: string | null
          slug?: string
          stage_id?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "project_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "project_category"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "project_location_id_fkey"
            columns: ["location_id"]
            isOneToOne: false
            referencedRelation: "location"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "project_stage_id_fkey"
            columns: ["stage_id"]
            isOneToOne: false
            referencedRelation: "ecosystem_stage"
            referencedColumns: ["id"]
          },
        ]
      }
      project_category: {
        Row: {
          description: string | null
          id: string
          name: string
          sanity_id: string | null
        }
        Insert: {
          description?: string | null
          id?: string
          name: string
          sanity_id?: string | null
        }
        Update: {
          description?: string | null
          id?: string
          name?: string
          sanity_id?: string | null
        }
        Relationships: []
      }
      push_subscription: {
        Row: {
          auth: string
          created_at: string
          donor_id: string | null
          endpoint: string
          id: string
          is_active: boolean
          last_used_at: string | null
          p256dh: string
          user_agent: string | null
        }
        Insert: {
          auth: string
          created_at?: string
          donor_id?: string | null
          endpoint: string
          id?: string
          is_active?: boolean
          last_used_at?: string | null
          p256dh: string
          user_agent?: string | null
        }
        Update: {
          auth?: string
          created_at?: string
          donor_id?: string | null
          endpoint?: string
          id?: string
          is_active?: boolean
          last_used_at?: string | null
          p256dh?: string
          user_agent?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "push_subscription_donor_id_fkey"
            columns: ["donor_id"]
            isOneToOne: false
            referencedRelation: "donor"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      hrm_generate_reference: { Args: never; Returns: string }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
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
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
