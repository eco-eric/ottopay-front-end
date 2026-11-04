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
    PostgrestVersion: "14.5"
  }
  public: {
    Tables: {
      ai_conversations: {
        Row: {
          action: string | null
          business_id: string
          content: string
          created_at: string | null
          id: string
          input_tokens: number | null
          output_tokens: number | null
          response_language: string | null
          role: string
          session_id: string
        }
        Insert: {
          action?: string | null
          business_id: string
          content: string
          created_at?: string | null
          id?: string
          input_tokens?: number | null
          output_tokens?: number | null
          response_language?: string | null
          role: string
          session_id: string
        }
        Update: {
          action?: string | null
          business_id?: string
          content?: string
          created_at?: string | null
          id?: string
          input_tokens?: number | null
          output_tokens?: number | null
          response_language?: string | null
          role?: string
          session_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "ai_conversations_business_id_fkey"
            columns: ["business_id"]
            isOneToOne: false
            referencedRelation: "businesses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "ai_conversations_business_id_fkey"
            columns: ["business_id"]
            isOneToOne: false
            referencedRelation: "businesses_public"
            referencedColumns: ["id"]
          },
        ]
      }
      bid_template_line_items: {
        Row: {
          catalog_item_id: string | null
          created_at: string
          description: string
          id: string
          quantity: number
          section_id: string
          sort_order: number
          template_id: string
          unit_cost: number
        }
        Insert: {
          catalog_item_id?: string | null
          created_at?: string
          description?: string
          id?: string
          quantity?: number
          section_id: string
          sort_order?: number
          template_id: string
          unit_cost?: number
        }
        Update: {
          catalog_item_id?: string | null
          created_at?: string
          description?: string
          id?: string
          quantity?: number
          section_id?: string
          sort_order?: number
          template_id?: string
          unit_cost?: number
        }
        Relationships: [
          {
            foreignKeyName: "bid_template_line_items_section_id_fkey"
            columns: ["section_id"]
            isOneToOne: false
            referencedRelation: "bid_template_sections"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "bid_template_line_items_template_id_fkey"
            columns: ["template_id"]
            isOneToOne: false
            referencedRelation: "bid_templates"
            referencedColumns: ["id"]
          },
        ]
      }
      bid_template_sections: {
        Row: {
          color_index: number
          created_at: string
          id: string
          name: string
          sort_order: number
          template_id: string
        }
        Insert: {
          color_index?: number
          created_at?: string
          id?: string
          name: string
          sort_order?: number
          template_id: string
        }
        Update: {
          color_index?: number
          created_at?: string
          id?: string
          name?: string
          sort_order?: number
          template_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "bid_template_sections_template_id_fkey"
            columns: ["template_id"]
            isOneToOne: false
            referencedRelation: "bid_templates"
            referencedColumns: ["id"]
          },
        ]
      }
      bid_templates: {
        Row: {
          business_id: string
          created_at: string
          description: string | null
          id: string
          margin: number
          name: string
          notes_customer: string | null
          notes_internal: string | null
          tax_rate: number
          template_type: string
          updated_at: string
        }
        Insert: {
          business_id: string
          created_at?: string
          description?: string | null
          id?: string
          margin?: number
          name: string
          notes_customer?: string | null
          notes_internal?: string | null
          tax_rate?: number
          template_type?: string
          updated_at?: string
        }
        Update: {
          business_id?: string
          created_at?: string
          description?: string | null
          id?: string
          margin?: number
          name?: string
          notes_customer?: string | null
          notes_internal?: string | null
          tax_rate?: number
          template_type?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "bid_templates_business_id_fkey"
            columns: ["business_id"]
            isOneToOne: false
            referencedRelation: "businesses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "bid_templates_business_id_fkey"
            columns: ["business_id"]
            isOneToOne: false
            referencedRelation: "businesses_public"
            referencedColumns: ["id"]
          },
        ]
      }
      blog_posts: {
        Row: {
          author_name: string | null
          body_markdown: string
          canonical_url: string | null
          created_at: string
          excerpt: string | null
          hero_image_url: string | null
          id: string
          meta_description: string | null
          meta_title: string | null
          og_description: string | null
          og_image_url: string | null
          og_title: string | null
          published_at: string | null
          slug: string
          status: string
          structured_data: Json | null
          tags: string[]
          title: string
          updated_at: string
        }
        Insert: {
          author_name?: string | null
          body_markdown: string
          canonical_url?: string | null
          created_at?: string
          excerpt?: string | null
          hero_image_url?: string | null
          id?: string
          meta_description?: string | null
          meta_title?: string | null
          og_description?: string | null
          og_image_url?: string | null
          og_title?: string | null
          published_at?: string | null
          slug: string
          status?: string
          structured_data?: Json | null
          tags?: string[]
          title: string
          updated_at?: string
        }
        Update: {
          author_name?: string | null
          body_markdown?: string
          canonical_url?: string | null
          created_at?: string
          excerpt?: string | null
          hero_image_url?: string | null
          id?: string
          meta_description?: string | null
          meta_title?: string | null
          og_description?: string | null
          og_image_url?: string | null
          og_title?: string | null
          published_at?: string | null
          slug?: string
          status?: string
          structured_data?: Json | null
          tags?: string[]
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      business_integrations: {
        Row: {
          business_id: string
          connected_at: string | null
          created_at: string | null
          credentials: Json
          id: string
          integration_name: string
          is_active: boolean | null
          last_sync_at: string | null
          last_sync_status: string | null
          provider_key: string
          sync_config: Json
          sync_error: string | null
          updated_at: string | null
        }
        Insert: {
          business_id: string
          connected_at?: string | null
          created_at?: string | null
          credentials?: Json
          id?: string
          integration_name: string
          is_active?: boolean | null
          last_sync_at?: string | null
          last_sync_status?: string | null
          provider_key: string
          sync_config?: Json
          sync_error?: string | null
          updated_at?: string | null
        }
        Update: {
          business_id?: string
          connected_at?: string | null
          created_at?: string | null
          credentials?: Json
          id?: string
          integration_name?: string
          is_active?: boolean | null
          last_sync_at?: string | null
          last_sync_status?: string | null
          provider_key?: string
          sync_config?: Json
          sync_error?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "business_integrations_business_id_fkey"
            columns: ["business_id"]
            isOneToOne: false
            referencedRelation: "businesses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "business_integrations_business_id_fkey"
            columns: ["business_id"]
            isOneToOne: false
            referencedRelation: "businesses_public"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "business_integrations_provider_key_fkey"
            columns: ["provider_key"]
            isOneToOne: false
            referencedRelation: "integration_providers"
            referencedColumns: ["provider_key"]
          },
        ]
      }
      business_members: {
        Row: {
          business_id: string
          created_at: string | null
          id: string
          invite_expires_at: string | null
          invite_token: string | null
          invited_by: string | null
          invited_email: string
          joined_at: string | null
          role: string
          status: string
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          business_id: string
          created_at?: string | null
          id?: string
          invite_expires_at?: string | null
          invite_token?: string | null
          invited_by?: string | null
          invited_email: string
          joined_at?: string | null
          role?: string
          status?: string
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          business_id?: string
          created_at?: string | null
          id?: string
          invite_expires_at?: string | null
          invite_token?: string | null
          invited_by?: string | null
          invited_email?: string
          joined_at?: string | null
          role?: string
          status?: string
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "business_members_business_id_fkey"
            columns: ["business_id"]
            isOneToOne: false
            referencedRelation: "businesses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "business_members_business_id_fkey"
            columns: ["business_id"]
            isOneToOne: false
            referencedRelation: "businesses_public"
            referencedColumns: ["id"]
          },
        ]
      }
      business_team_members: {
        Row: {
          business_id: string
          created_at: string
          id: string
          invited_email: string | null
          role: string
          status: string
          updated_at: string
          user_id: string
        }
        Insert: {
          business_id: string
          created_at?: string
          id?: string
          invited_email?: string | null
          role?: string
          status?: string
          updated_at?: string
          user_id: string
        }
        Update: {
          business_id?: string
          created_at?: string
          id?: string
          invited_email?: string | null
          role?: string
          status?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "business_team_members_business_id_fkey"
            columns: ["business_id"]
            isOneToOne: false
            referencedRelation: "businesses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "business_team_members_business_id_fkey"
            columns: ["business_id"]
            isOneToOne: false
            referencedRelation: "businesses_public"
            referencedColumns: ["id"]
          },
        ]
      }
      businesses: {
        Row: {
          accept_ach: boolean | null
          accept_cards: boolean | null
          accept_manual: boolean | null
          address: string | null
          ai_permanently_unlocked: boolean
          ai_trial_unlocked: boolean
          allow_partial_payments: boolean | null
          attribution_visitor_id: string | null
          auto_send_receipt: boolean | null
          bid_number_prefix: string
          brand_color: string | null
          business_type: string | null
          card_fee_enabled: boolean
          city: string | null
          content_language: string
          created_at: string
          default_acceptance_text: string | null
          default_invoice_notes: string | null
          default_margin: number
          default_payment_due: string | null
          default_payment_due_days: number | null
          default_payment_terms: string | null
          default_tax_inclusive: boolean
          default_tax_rate: number
          default_terms_conditions: string | null
          email: string | null
          email_enabled: boolean | null
          email_signature: string | null
          estimate_prefix: string | null
          fee_absorption: string | null
          fee_display_label: string | null
          id: string
          include_invoice_pdf: boolean | null
          include_photos_in_pdf: boolean
          invoice_accent_color: string | null
          invoice_footer_text: string | null
          invoice_prefix: string | null
          invoice_template_style: string | null
          late_fee_amount: number | null
          late_fee_enabled: boolean | null
          late_fee_grace_period: number | null
          late_fee_type: string | null
          license_number: string | null
          logo_url: string | null
          max_reminders_per_invoice: number | null
          minimum_payment_amount: number | null
          name: string
          next_estimate_number: number | null
          next_invoice_number: number | null
          number_padding: number | null
          otto_brief_preferences: Json | null
          otto_daily_brief_enabled: boolean | null
          otto_free_descriptions_used: number
          owner_name: string
          phone: string | null
          quiet_hours_end: string | null
          quiet_hours_start: string | null
          quote_valid_days: number
          receipt_include_line_items: boolean | null
          receipt_include_logo: boolean | null
          receipt_include_payment_method: boolean | null
          receipt_include_thank_you: boolean | null
          receipt_thank_you_message: string | null
          receipt_via_email: boolean | null
          receipt_via_sms: boolean | null
          referral_code: string | null
          reminder_enabled: boolean
          reminder_schedule: Json | null
          reply_to_email: string | null
          show_address_on_invoices: boolean | null
          show_license_on_invoices: boolean | null
          show_logo_on_invoices: boolean | null
          show_tax_id_on_invoices: boolean | null
          sms_enabled: boolean | null
          sms_sender_name: string | null
          social_links: Json | null
          state: string | null
          street_address: string | null
          stripe_account_id: string | null
          stripe_customer_id: string | null
          stripe_onboarding_complete: boolean
          stripe_subscription_id: string | null
          stripe_test_mode: boolean
          subscription_plan: string | null
          subscription_seats: number | null
          subscription_status: string | null
          suite_unit: string | null
          tax_id: string | null
          tax_label: string | null
          team_seat_plan: string
          team_seat_subscription_id: string | null
          total_stripe_volume: number
          trade_industry: string | null
          twilio_enabled: boolean
          updated_at: string
          user_id: string
          warranty_duration: number | null
          warranty_duration_unit: string | null
          warranty_enabled: boolean | null
          warranty_label: string | null
          warranty_terms: string | null
          website: string | null
          workedge_api_key: string | null
          year_established: number | null
          zip_code: string | null
        }
        Insert: {
          accept_ach?: boolean | null
          accept_cards?: boolean | null
          accept_manual?: boolean | null
          address?: string | null
          ai_permanently_unlocked?: boolean
          ai_trial_unlocked?: boolean
          allow_partial_payments?: boolean | null
          attribution_visitor_id?: string | null
          auto_send_receipt?: boolean | null
          bid_number_prefix?: string
          brand_color?: string | null
          business_type?: string | null
          card_fee_enabled?: boolean
          city?: string | null
          content_language?: string
          created_at?: string
          default_acceptance_text?: string | null
          default_invoice_notes?: string | null
          default_margin?: number
          default_payment_due?: string | null
          default_payment_due_days?: number | null
          default_payment_terms?: string | null
          default_tax_inclusive?: boolean
          default_tax_rate?: number
          default_terms_conditions?: string | null
          email?: string | null
          email_enabled?: boolean | null
          email_signature?: string | null
          estimate_prefix?: string | null
          fee_absorption?: string | null
          fee_display_label?: string | null
          id?: string
          include_invoice_pdf?: boolean | null
          include_photos_in_pdf?: boolean
          invoice_accent_color?: string | null
          invoice_footer_text?: string | null
          invoice_prefix?: string | null
          invoice_template_style?: string | null
          late_fee_amount?: number | null
          late_fee_enabled?: boolean | null
          late_fee_grace_period?: number | null
          late_fee_type?: string | null
          license_number?: string | null
          logo_url?: string | null
          max_reminders_per_invoice?: number | null
          minimum_payment_amount?: number | null
          name: string
          next_estimate_number?: number | null
          next_invoice_number?: number | null
          number_padding?: number | null
          otto_brief_preferences?: Json | null
          otto_daily_brief_enabled?: boolean | null
          otto_free_descriptions_used?: number
          owner_name: string
          phone?: string | null
          quiet_hours_end?: string | null
          quiet_hours_start?: string | null
          quote_valid_days?: number
          receipt_include_line_items?: boolean | null
          receipt_include_logo?: boolean | null
          receipt_include_payment_method?: boolean | null
          receipt_include_thank_you?: boolean | null
          receipt_thank_you_message?: string | null
          receipt_via_email?: boolean | null
          receipt_via_sms?: boolean | null
          referral_code?: string | null
          reminder_enabled?: boolean
          reminder_schedule?: Json | null
          reply_to_email?: string | null
          show_address_on_invoices?: boolean | null
          show_license_on_invoices?: boolean | null
          show_logo_on_invoices?: boolean | null
          show_tax_id_on_invoices?: boolean | null
          sms_enabled?: boolean | null
          sms_sender_name?: string | null
          social_links?: Json | null
          state?: string | null
          street_address?: string | null
          stripe_account_id?: string | null
          stripe_customer_id?: string | null
          stripe_onboarding_complete?: boolean
          stripe_subscription_id?: string | null
          stripe_test_mode?: boolean
          subscription_plan?: string | null
          subscription_seats?: number | null
          subscription_status?: string | null
          suite_unit?: string | null
          tax_id?: string | null
          tax_label?: string | null
          team_seat_plan?: string
          team_seat_subscription_id?: string | null
          total_stripe_volume?: number
          trade_industry?: string | null
          twilio_enabled?: boolean
          updated_at?: string
          user_id: string
          warranty_duration?: number | null
          warranty_duration_unit?: string | null
          warranty_enabled?: boolean | null
          warranty_label?: string | null
          warranty_terms?: string | null
          website?: string | null
          workedge_api_key?: string | null
          year_established?: number | null
          zip_code?: string | null
        }
        Update: {
          accept_ach?: boolean | null
          accept_cards?: boolean | null
          accept_manual?: boolean | null
          address?: string | null
          ai_permanently_unlocked?: boolean
          ai_trial_unlocked?: boolean
          allow_partial_payments?: boolean | null
          attribution_visitor_id?: string | null
          auto_send_receipt?: boolean | null
          bid_number_prefix?: string
          brand_color?: string | null
          business_type?: string | null
          card_fee_enabled?: boolean
          city?: string | null
          content_language?: string
          created_at?: string
          default_acceptance_text?: string | null
          default_invoice_notes?: string | null
          default_margin?: number
          default_payment_due?: string | null
          default_payment_due_days?: number | null
          default_payment_terms?: string | null
          default_tax_inclusive?: boolean
          default_tax_rate?: number
          default_terms_conditions?: string | null
          email?: string | null
          email_enabled?: boolean | null
          email_signature?: string | null
          estimate_prefix?: string | null
          fee_absorption?: string | null
          fee_display_label?: string | null
          id?: string
          include_invoice_pdf?: boolean | null
          include_photos_in_pdf?: boolean
          invoice_accent_color?: string | null
          invoice_footer_text?: string | null
          invoice_prefix?: string | null
          invoice_template_style?: string | null
          late_fee_amount?: number | null
          late_fee_enabled?: boolean | null
          late_fee_grace_period?: number | null
          late_fee_type?: string | null
          license_number?: string | null
          logo_url?: string | null
          max_reminders_per_invoice?: number | null
          minimum_payment_amount?: number | null
          name?: string
          next_estimate_number?: number | null
          next_invoice_number?: number | null
          number_padding?: number | null
          otto_brief_preferences?: Json | null
          otto_daily_brief_enabled?: boolean | null
          otto_free_descriptions_used?: number
          owner_name?: string
          phone?: string | null
          quiet_hours_end?: string | null
          quiet_hours_start?: string | null
          quote_valid_days?: number
          receipt_include_line_items?: boolean | null
          receipt_include_logo?: boolean | null
          receipt_include_payment_method?: boolean | null
          receipt_include_thank_you?: boolean | null
          receipt_thank_you_message?: string | null
          receipt_via_email?: boolean | null
          receipt_via_sms?: boolean | null
          referral_code?: string | null
          reminder_enabled?: boolean
          reminder_schedule?: Json | null
          reply_to_email?: string | null
          show_address_on_invoices?: boolean | null
          show_license_on_invoices?: boolean | null
          show_logo_on_invoices?: boolean | null
          show_tax_id_on_invoices?: boolean | null
          sms_enabled?: boolean | null
          sms_sender_name?: string | null
          social_links?: Json | null
          state?: string | null
          street_address?: string | null
          stripe_account_id?: string | null
          stripe_customer_id?: string | null
          stripe_onboarding_complete?: boolean
          stripe_subscription_id?: string | null
          stripe_test_mode?: boolean
          subscription_plan?: string | null
          subscription_seats?: number | null
          subscription_status?: string | null
          suite_unit?: string | null
          tax_id?: string | null
          tax_label?: string | null
          team_seat_plan?: string
          team_seat_subscription_id?: string | null
          total_stripe_volume?: number
          trade_industry?: string | null
          twilio_enabled?: boolean
          updated_at?: string
          user_id?: string
          warranty_duration?: number | null
          warranty_duration_unit?: string | null
          warranty_enabled?: boolean | null
          warranty_label?: string | null
          warranty_terms?: string | null
          website?: string | null
          workedge_api_key?: string | null
          year_established?: number | null
          zip_code?: string | null
        }
        Relationships: []
      }
      catalog_categories: {
        Row: {
          business_id: string
          catalog_type: string
          created_at: string
          id: string
          name: string
          sort_order: number
        }
        Insert: {
          business_id: string
          catalog_type?: string
          created_at?: string
          id?: string
          name: string
          sort_order?: number
        }
        Update: {
          business_id?: string
          catalog_type?: string
          created_at?: string
          id?: string
          name?: string
          sort_order?: number
        }
        Relationships: [
          {
            foreignKeyName: "catalog_categories_business_id_fkey"
            columns: ["business_id"]
            isOneToOne: false
            referencedRelation: "businesses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "catalog_categories_business_id_fkey"
            columns: ["business_id"]
            isOneToOne: false
            referencedRelation: "businesses_public"
            referencedColumns: ["id"]
          },
        ]
      }
      contact_submissions: {
        Row: {
          created_at: string
          email: string
          first_name: string
          id: string
          last_name: string
          message: string
          topic: string
          trade: string | null
        }
        Insert: {
          created_at?: string
          email: string
          first_name: string
          id?: string
          last_name: string
          message: string
          topic?: string
          trade?: string | null
        }
        Update: {
          created_at?: string
          email?: string
          first_name?: string
          id?: string
          last_name?: string
          message?: string
          topic?: string
          trade?: string | null
        }
        Relationships: []
      }
      content_pages: {
        Row: {
          author_name: string | null
          body_markdown: string
          canonical_url: string | null
          created_at: string
          excerpt: string | null
          feature: string | null
          hero_image_url: string | null
          id: string
          meta_description: string | null
          meta_title: string | null
          metro: string | null
          neighborhood: string | null
          og_description: string | null
          og_image_url: string | null
          og_title: string | null
          pillar_slug: string | null
          published_at: string | null
          related_slugs: string[] | null
          status: string
          structured_data: Json | null
          sub_trade: string | null
          template_data: Json | null
          template_id: string
          title: string
          trade: string | null
          updated_at: string
          url_path: string
        }
        Insert: {
          author_name?: string | null
          body_markdown: string
          canonical_url?: string | null
          created_at?: string
          excerpt?: string | null
          feature?: string | null
          hero_image_url?: string | null
          id?: string
          meta_description?: string | null
          meta_title?: string | null
          metro?: string | null
          neighborhood?: string | null
          og_description?: string | null
          og_image_url?: string | null
          og_title?: string | null
          pillar_slug?: string | null
          published_at?: string | null
          related_slugs?: string[] | null
          status?: string
          structured_data?: Json | null
          sub_trade?: string | null
          template_data?: Json | null
          template_id: string
          title: string
          trade?: string | null
          updated_at?: string
          url_path: string
        }
        Update: {
          author_name?: string | null
          body_markdown?: string
          canonical_url?: string | null
          created_at?: string
          excerpt?: string | null
          feature?: string | null
          hero_image_url?: string | null
          id?: string
          meta_description?: string | null
          meta_title?: string | null
          metro?: string | null
          neighborhood?: string | null
          og_description?: string | null
          og_image_url?: string | null
          og_title?: string | null
          pillar_slug?: string | null
          published_at?: string | null
          related_slugs?: string[] | null
          status?: string
          structured_data?: Json | null
          sub_trade?: string | null
          template_data?: Json | null
          template_id?: string
          title?: string
          trade?: string | null
          updated_at?: string
          url_path?: string
        }
        Relationships: []
      }
      customer_activities: {
        Row: {
          activity_type: string
          business_id: string
          created_at: string | null
          created_by: string | null
          customer_id: string
          description: string
          details: Json | null
          id: string
          related_equipment_id: string | null
          related_estimate_id: string | null
          related_invoice_id: string | null
        }
        Insert: {
          activity_type: string
          business_id: string
          created_at?: string | null
          created_by?: string | null
          customer_id: string
          description: string
          details?: Json | null
          id?: string
          related_equipment_id?: string | null
          related_estimate_id?: string | null
          related_invoice_id?: string | null
        }
        Update: {
          activity_type?: string
          business_id?: string
          created_at?: string | null
          created_by?: string | null
          customer_id?: string
          description?: string
          details?: Json | null
          id?: string
          related_equipment_id?: string | null
          related_estimate_id?: string | null
          related_invoice_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "customer_activities_business_id_fkey"
            columns: ["business_id"]
            isOneToOne: false
            referencedRelation: "businesses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "customer_activities_business_id_fkey"
            columns: ["business_id"]
            isOneToOne: false
            referencedRelation: "businesses_public"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "customer_activities_customer_id_fkey"
            columns: ["customer_id"]
            isOneToOne: false
            referencedRelation: "customers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "customer_activities_customer_id_fkey"
            columns: ["customer_id"]
            isOneToOne: false
            referencedRelation: "customers_public"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "customer_activities_related_equipment_id_fkey"
            columns: ["related_equipment_id"]
            isOneToOne: false
            referencedRelation: "customer_equipment"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "customer_activities_related_estimate_id_fkey"
            columns: ["related_estimate_id"]
            isOneToOne: false
            referencedRelation: "estimates"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "customer_activities_related_invoice_id_fkey"
            columns: ["related_invoice_id"]
            isOneToOne: false
            referencedRelation: "invoices"
            referencedColumns: ["id"]
          },
        ]
      }
      customer_addresses: {
        Row: {
          access_instructions: string | null
          address_label: string | null
          address_type: string
          city: string
          country: string | null
          created_at: string | null
          customer_id: string
          external_property_id: string | null
          id: string
          is_default: boolean | null
          latitude: number | null
          longitude: number | null
          parking_instructions: string | null
          special_notes: string | null
          state: string
          street_address: string
          suite_unit: string | null
          updated_at: string | null
          workedge_property_id: string | null
          zip_code: string
        }
        Insert: {
          access_instructions?: string | null
          address_label?: string | null
          address_type: string
          city: string
          country?: string | null
          created_at?: string | null
          customer_id: string
          external_property_id?: string | null
          id?: string
          is_default?: boolean | null
          latitude?: number | null
          longitude?: number | null
          parking_instructions?: string | null
          special_notes?: string | null
          state: string
          street_address: string
          suite_unit?: string | null
          updated_at?: string | null
          workedge_property_id?: string | null
          zip_code: string
        }
        Update: {
          access_instructions?: string | null
          address_label?: string | null
          address_type?: string
          city?: string
          country?: string | null
          created_at?: string | null
          customer_id?: string
          external_property_id?: string | null
          id?: string
          is_default?: boolean | null
          latitude?: number | null
          longitude?: number | null
          parking_instructions?: string | null
          special_notes?: string | null
          state?: string
          street_address?: string
          suite_unit?: string | null
          updated_at?: string | null
          workedge_property_id?: string | null
          zip_code?: string
        }
        Relationships: [
          {
            foreignKeyName: "customer_addresses_customer_id_fkey"
            columns: ["customer_id"]
            isOneToOne: false
            referencedRelation: "customers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "customer_addresses_customer_id_fkey"
            columns: ["customer_id"]
            isOneToOne: false
            referencedRelation: "customers_public"
            referencedColumns: ["id"]
          },
        ]
      }
      customer_contacts: {
        Row: {
          can_approve_work: boolean | null
          created_at: string | null
          customer_id: string
          email: string | null
          id: string
          is_active: boolean | null
          mobile_phone: string | null
          name: string
          notes: string | null
          phone: string | null
          preferred_contact_method: string | null
          receives_estimates: boolean | null
          receives_invoices: boolean | null
          role: string | null
          sort_order: number | null
          title: string | null
          updated_at: string | null
        }
        Insert: {
          can_approve_work?: boolean | null
          created_at?: string | null
          customer_id: string
          email?: string | null
          id?: string
          is_active?: boolean | null
          mobile_phone?: string | null
          name: string
          notes?: string | null
          phone?: string | null
          preferred_contact_method?: string | null
          receives_estimates?: boolean | null
          receives_invoices?: boolean | null
          role?: string | null
          sort_order?: number | null
          title?: string | null
          updated_at?: string | null
        }
        Update: {
          can_approve_work?: boolean | null
          created_at?: string | null
          customer_id?: string
          email?: string | null
          id?: string
          is_active?: boolean | null
          mobile_phone?: string | null
          name?: string
          notes?: string | null
          phone?: string | null
          preferred_contact_method?: string | null
          receives_estimates?: boolean | null
          receives_invoices?: boolean | null
          role?: string | null
          sort_order?: number | null
          title?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "customer_contacts_customer_id_fkey"
            columns: ["customer_id"]
            isOneToOne: false
            referencedRelation: "customers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "customer_contacts_customer_id_fkey"
            columns: ["customer_id"]
            isOneToOne: false
            referencedRelation: "customers_public"
            referencedColumns: ["id"]
          },
        ]
      }
      customer_equipment: {
        Row: {
          brand: string
          capacity: string | null
          created_at: string
          customer_id: string
          equipment_type: string
          expected_lifespan_years: number | null
          external_equipment_id: string | null
          id: string
          install_date: string | null
          last_service_invoice_id: string | null
          location: string | null
          manufacturer_website: string | null
          model: string | null
          next_service_due: string | null
          notes: string | null
          photo_url: string | null
          purchase_date: string | null
          purchase_price: number | null
          serial_number: string | null
          service_address_id: string | null
          service_frequency_months: number | null
          updated_at: string
          warranty_expiration: string | null
          workedge_equipment_id: string | null
        }
        Insert: {
          brand?: string
          capacity?: string | null
          created_at?: string
          customer_id: string
          equipment_type: string
          expected_lifespan_years?: number | null
          external_equipment_id?: string | null
          id?: string
          install_date?: string | null
          last_service_invoice_id?: string | null
          location?: string | null
          manufacturer_website?: string | null
          model?: string | null
          next_service_due?: string | null
          notes?: string | null
          photo_url?: string | null
          purchase_date?: string | null
          purchase_price?: number | null
          serial_number?: string | null
          service_address_id?: string | null
          service_frequency_months?: number | null
          updated_at?: string
          warranty_expiration?: string | null
          workedge_equipment_id?: string | null
        }
        Update: {
          brand?: string
          capacity?: string | null
          created_at?: string
          customer_id?: string
          equipment_type?: string
          expected_lifespan_years?: number | null
          external_equipment_id?: string | null
          id?: string
          install_date?: string | null
          last_service_invoice_id?: string | null
          location?: string | null
          manufacturer_website?: string | null
          model?: string | null
          next_service_due?: string | null
          notes?: string | null
          photo_url?: string | null
          purchase_date?: string | null
          purchase_price?: number | null
          serial_number?: string | null
          service_address_id?: string | null
          service_frequency_months?: number | null
          updated_at?: string
          warranty_expiration?: string | null
          workedge_equipment_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "customer_equipment_customer_id_fkey"
            columns: ["customer_id"]
            isOneToOne: false
            referencedRelation: "customers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "customer_equipment_customer_id_fkey"
            columns: ["customer_id"]
            isOneToOne: false
            referencedRelation: "customers_public"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "customer_equipment_last_service_invoice_id_fkey"
            columns: ["last_service_invoice_id"]
            isOneToOne: false
            referencedRelation: "invoices"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "customer_equipment_service_address_id_fkey"
            columns: ["service_address_id"]
            isOneToOne: false
            referencedRelation: "customer_addresses"
            referencedColumns: ["id"]
          },
        ]
      }
      customer_notes: {
        Row: {
          business_id: string
          created_at: string | null
          created_by: string | null
          customer_id: string
          id: string
          is_important: boolean | null
          is_pinned: boolean | null
          note_text: string
          note_type: string | null
          updated_at: string | null
        }
        Insert: {
          business_id: string
          created_at?: string | null
          created_by?: string | null
          customer_id: string
          id?: string
          is_important?: boolean | null
          is_pinned?: boolean | null
          note_text: string
          note_type?: string | null
          updated_at?: string | null
        }
        Update: {
          business_id?: string
          created_at?: string | null
          created_by?: string | null
          customer_id?: string
          id?: string
          is_important?: boolean | null
          is_pinned?: boolean | null
          note_text?: string
          note_type?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "customer_notes_business_id_fkey"
            columns: ["business_id"]
            isOneToOne: false
            referencedRelation: "businesses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "customer_notes_business_id_fkey"
            columns: ["business_id"]
            isOneToOne: false
            referencedRelation: "businesses_public"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "customer_notes_customer_id_fkey"
            columns: ["customer_id"]
            isOneToOne: false
            referencedRelation: "customers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "customer_notes_customer_id_fkey"
            columns: ["customer_id"]
            isOneToOne: false
            referencedRelation: "customers_public"
            referencedColumns: ["id"]
          },
        ]
      }
      customers: {
        Row: {
          address: string | null
          business_id: string
          company_name: string | null
          created_at: string
          customer_type: string | null
          email: string | null
          external_customer_id: string | null
          first_service_date: string | null
          id: string
          last_invoice_date: string | null
          last_payment_date: string | null
          last_service_date: string | null
          last_synced_at: string | null
          lifetime_value: number | null
          name: string
          outstanding_balance: number | null
          payment_terms: string | null
          payment_terms_days: number | null
          phone: string | null
          preferred_payment_method: string | null
          source: string | null
          sync_status: string | null
          tags: string[] | null
          tax_exempt: boolean | null
          tax_exempt_id: string | null
          total_jobs: number | null
          updated_at: string
          workedge_customer_id: string | null
        }
        Insert: {
          address?: string | null
          business_id: string
          company_name?: string | null
          created_at?: string
          customer_type?: string | null
          email?: string | null
          external_customer_id?: string | null
          first_service_date?: string | null
          id?: string
          last_invoice_date?: string | null
          last_payment_date?: string | null
          last_service_date?: string | null
          last_synced_at?: string | null
          lifetime_value?: number | null
          name: string
          outstanding_balance?: number | null
          payment_terms?: string | null
          payment_terms_days?: number | null
          phone?: string | null
          preferred_payment_method?: string | null
          source?: string | null
          sync_status?: string | null
          tags?: string[] | null
          tax_exempt?: boolean | null
          tax_exempt_id?: string | null
          total_jobs?: number | null
          updated_at?: string
          workedge_customer_id?: string | null
        }
        Update: {
          address?: string | null
          business_id?: string
          company_name?: string | null
          created_at?: string
          customer_type?: string | null
          email?: string | null
          external_customer_id?: string | null
          first_service_date?: string | null
          id?: string
          last_invoice_date?: string | null
          last_payment_date?: string | null
          last_service_date?: string | null
          last_synced_at?: string | null
          lifetime_value?: number | null
          name?: string
          outstanding_balance?: number | null
          payment_terms?: string | null
          payment_terms_days?: number | null
          phone?: string | null
          preferred_payment_method?: string | null
          source?: string | null
          sync_status?: string | null
          tags?: string[] | null
          tax_exempt?: boolean | null
          tax_exempt_id?: string | null
          total_jobs?: number | null
          updated_at?: string
          workedge_customer_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "customers_business_id_fkey"
            columns: ["business_id"]
            isOneToOne: false
            referencedRelation: "businesses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "customers_business_id_fkey"
            columns: ["business_id"]
            isOneToOne: false
            referencedRelation: "businesses_public"
            referencedColumns: ["id"]
          },
        ]
      }
      equipment_catalog: {
        Row: {
          brand: string
          business_id: string
          created_at: string
          default_capacity: string | null
          default_location: string | null
          description: string | null
          equipment_type: string
          id: string
          image_url: string | null
          installed_cost: number | null
          model: string | null
          typical_lifespan_years: number | null
          updated_at: string
        }
        Insert: {
          brand: string
          business_id: string
          created_at?: string
          default_capacity?: string | null
          default_location?: string | null
          description?: string | null
          equipment_type: string
          id?: string
          image_url?: string | null
          installed_cost?: number | null
          model?: string | null
          typical_lifespan_years?: number | null
          updated_at?: string
        }
        Update: {
          brand?: string
          business_id?: string
          created_at?: string
          default_capacity?: string | null
          default_location?: string | null
          description?: string | null
          equipment_type?: string
          id?: string
          image_url?: string | null
          installed_cost?: number | null
          model?: string | null
          typical_lifespan_years?: number | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "equipment_catalog_business_id_fkey"
            columns: ["business_id"]
            isOneToOne: false
            referencedRelation: "businesses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "equipment_catalog_business_id_fkey"
            columns: ["business_id"]
            isOneToOne: false
            referencedRelation: "businesses_public"
            referencedColumns: ["id"]
          },
        ]
      }
      estimate_bid_line_items: {
        Row: {
          bid_id: string
          catalog_item_id: string | null
          created_at: string | null
          description: string
          id: string
          line_cost: number | null
          quantity: number
          section_id: string
          sort_order: number
          unit_cost: number
        }
        Insert: {
          bid_id: string
          catalog_item_id?: string | null
          created_at?: string | null
          description?: string
          id?: string
          line_cost?: number | null
          quantity?: number
          section_id: string
          sort_order?: number
          unit_cost?: number
        }
        Update: {
          bid_id?: string
          catalog_item_id?: string | null
          created_at?: string | null
          description?: string
          id?: string
          line_cost?: number | null
          quantity?: number
          section_id?: string
          sort_order?: number
          unit_cost?: number
        }
        Relationships: [
          {
            foreignKeyName: "estimate_bid_line_items_bid_id_fkey"
            columns: ["bid_id"]
            isOneToOne: false
            referencedRelation: "estimate_bids"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "estimate_bid_line_items_section_id_fkey"
            columns: ["section_id"]
            isOneToOne: false
            referencedRelation: "estimate_sections"
            referencedColumns: ["id"]
          },
        ]
      }
      estimate_bids: {
        Row: {
          approved_at: string | null
          bid_date: string
          bid_number: string
          business_id: string
          created_at: string | null
          created_by: string | null
          customer_address: string | null
          customer_email: string | null
          customer_name: string | null
          customer_phone: string | null
          declined_at: string | null
          grand_total: number
          id: string
          margin: number
          notes_customer: string | null
          notes_internal: string | null
          pdf_internal_url: string | null
          pdf_quote_url: string | null
          profit: number
          sell_price: number
          sent_at: string | null
          status: string
          tags: string[] | null
          tax_amount: number
          tax_rate: number
          title: string | null
          total_cost: number
          updated_at: string | null
          valid_until: string | null
        }
        Insert: {
          approved_at?: string | null
          bid_date?: string
          bid_number: string
          business_id: string
          created_at?: string | null
          created_by?: string | null
          customer_address?: string | null
          customer_email?: string | null
          customer_name?: string | null
          customer_phone?: string | null
          declined_at?: string | null
          grand_total?: number
          id?: string
          margin?: number
          notes_customer?: string | null
          notes_internal?: string | null
          pdf_internal_url?: string | null
          pdf_quote_url?: string | null
          profit?: number
          sell_price?: number
          sent_at?: string | null
          status?: string
          tags?: string[] | null
          tax_amount?: number
          tax_rate?: number
          title?: string | null
          total_cost?: number
          updated_at?: string | null
          valid_until?: string | null
        }
        Update: {
          approved_at?: string | null
          bid_date?: string
          bid_number?: string
          business_id?: string
          created_at?: string | null
          created_by?: string | null
          customer_address?: string | null
          customer_email?: string | null
          customer_name?: string | null
          customer_phone?: string | null
          declined_at?: string | null
          grand_total?: number
          id?: string
          margin?: number
          notes_customer?: string | null
          notes_internal?: string | null
          pdf_internal_url?: string | null
          pdf_quote_url?: string | null
          profit?: number
          sell_price?: number
          sent_at?: string | null
          status?: string
          tags?: string[] | null
          tax_amount?: number
          tax_rate?: number
          title?: string | null
          total_cost?: number
          updated_at?: string | null
          valid_until?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "estimate_bids_business_id_fkey"
            columns: ["business_id"]
            isOneToOne: false
            referencedRelation: "businesses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "estimate_bids_business_id_fkey"
            columns: ["business_id"]
            isOneToOne: false
            referencedRelation: "businesses_public"
            referencedColumns: ["id"]
          },
        ]
      }
      estimate_line_items: {
        Row: {
          created_at: string
          description: string
          estimate_id: string
          id: string
          line_total: number
          quantity: number
          sort_order: number
          unit_price: number
        }
        Insert: {
          created_at?: string
          description: string
          estimate_id: string
          id?: string
          line_total?: number
          quantity?: number
          sort_order?: number
          unit_price?: number
        }
        Update: {
          created_at?: string
          description?: string
          estimate_id?: string
          id?: string
          line_total?: number
          quantity?: number
          sort_order?: number
          unit_price?: number
        }
        Relationships: [
          {
            foreignKeyName: "estimate_line_items_estimate_id_fkey"
            columns: ["estimate_id"]
            isOneToOne: false
            referencedRelation: "estimates"
            referencedColumns: ["id"]
          },
        ]
      }
      estimate_section_templates: {
        Row: {
          business_id: string
          color_index: number
          created_at: string | null
          id: string
          is_active: boolean
          name: string
          sort_order: number
        }
        Insert: {
          business_id: string
          color_index?: number
          created_at?: string | null
          id?: string
          is_active?: boolean
          name: string
          sort_order?: number
        }
        Update: {
          business_id?: string
          color_index?: number
          created_at?: string | null
          id?: string
          is_active?: boolean
          name?: string
          sort_order?: number
        }
        Relationships: [
          {
            foreignKeyName: "estimate_section_templates_business_id_fkey"
            columns: ["business_id"]
            isOneToOne: false
            referencedRelation: "businesses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "estimate_section_templates_business_id_fkey"
            columns: ["business_id"]
            isOneToOne: false
            referencedRelation: "businesses_public"
            referencedColumns: ["id"]
          },
        ]
      }
      estimate_sections: {
        Row: {
          bid_id: string
          collapsed: boolean
          color_index: number
          created_at: string | null
          id: string
          name: string
          sort_order: number
        }
        Insert: {
          bid_id: string
          collapsed?: boolean
          color_index?: number
          created_at?: string | null
          id?: string
          name: string
          sort_order?: number
        }
        Update: {
          bid_id?: string
          collapsed?: boolean
          color_index?: number
          created_at?: string | null
          id?: string
          name?: string
          sort_order?: number
        }
        Relationships: [
          {
            foreignKeyName: "estimate_sections_bid_id_fkey"
            columns: ["bid_id"]
            isOneToOne: false
            referencedRelation: "estimate_bids"
            referencedColumns: ["id"]
          },
        ]
      }
      estimates: {
        Row: {
          acceptance_text: string | null
          accepted_at: string | null
          accepted_by_name: string | null
          accepted_note: string | null
          billing_city: string | null
          billing_state: string | null
          billing_street: string | null
          billing_zip: string | null
          business_id: string
          cc_fee_amount: number
          cc_fee_enabled: boolean
          converted_to_invoice_id: string | null
          created_at: string
          customer_id: string
          declined_at: string | null
          declined_note: string | null
          estimate_number: string
          id: string
          issue_date: string
          notes: string | null
          payment_terms: string | null
          project_name: string | null
          shareable_token: string | null
          show_line_item_pricing: boolean
          site_address_id: string | null
          site_city: string | null
          site_state: string | null
          site_street: string | null
          site_zip: string | null
          status: string
          subtotal: number
          tax_amount: number
          tax_rate: number
          terms_conditions: string | null
          total: number
          updated_at: string
          valid_until: string
        }
        Insert: {
          acceptance_text?: string | null
          accepted_at?: string | null
          accepted_by_name?: string | null
          accepted_note?: string | null
          billing_city?: string | null
          billing_state?: string | null
          billing_street?: string | null
          billing_zip?: string | null
          business_id: string
          cc_fee_amount?: number
          cc_fee_enabled?: boolean
          converted_to_invoice_id?: string | null
          created_at?: string
          customer_id: string
          declined_at?: string | null
          declined_note?: string | null
          estimate_number: string
          id?: string
          issue_date?: string
          notes?: string | null
          payment_terms?: string | null
          project_name?: string | null
          shareable_token?: string | null
          show_line_item_pricing?: boolean
          site_address_id?: string | null
          site_city?: string | null
          site_state?: string | null
          site_street?: string | null
          site_zip?: string | null
          status?: string
          subtotal?: number
          tax_amount?: number
          tax_rate?: number
          terms_conditions?: string | null
          total?: number
          updated_at?: string
          valid_until?: string
        }
        Update: {
          acceptance_text?: string | null
          accepted_at?: string | null
          accepted_by_name?: string | null
          accepted_note?: string | null
          billing_city?: string | null
          billing_state?: string | null
          billing_street?: string | null
          billing_zip?: string | null
          business_id?: string
          cc_fee_amount?: number
          cc_fee_enabled?: boolean
          converted_to_invoice_id?: string | null
          created_at?: string
          customer_id?: string
          declined_at?: string | null
          declined_note?: string | null
          estimate_number?: string
          id?: string
          issue_date?: string
          notes?: string | null
          payment_terms?: string | null
          project_name?: string | null
          shareable_token?: string | null
          show_line_item_pricing?: boolean
          site_address_id?: string | null
          site_city?: string | null
          site_state?: string | null
          site_street?: string | null
          site_zip?: string | null
          status?: string
          subtotal?: number
          tax_amount?: number
          tax_rate?: number
          terms_conditions?: string | null
          total?: number
          updated_at?: string
          valid_until?: string
        }
        Relationships: [
          {
            foreignKeyName: "estimates_business_id_fkey"
            columns: ["business_id"]
            isOneToOne: false
            referencedRelation: "businesses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "estimates_business_id_fkey"
            columns: ["business_id"]
            isOneToOne: false
            referencedRelation: "businesses_public"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "estimates_converted_to_invoice_id_fkey"
            columns: ["converted_to_invoice_id"]
            isOneToOne: false
            referencedRelation: "invoices"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "estimates_customer_id_fkey"
            columns: ["customer_id"]
            isOneToOne: false
            referencedRelation: "customers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "estimates_customer_id_fkey"
            columns: ["customer_id"]
            isOneToOne: false
            referencedRelation: "customers_public"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "estimates_site_address_id_fkey"
            columns: ["site_address_id"]
            isOneToOne: false
            referencedRelation: "customer_addresses"
            referencedColumns: ["id"]
          },
        ]
      }
      expense_line_items: {
        Row: {
          created_at: string
          description: string
          expense_id: string
          id: string
          line_total: number
          quantity: number
          sort_order: number
          unit_price: number
        }
        Insert: {
          created_at?: string
          description: string
          expense_id: string
          id?: string
          line_total?: number
          quantity?: number
          sort_order?: number
          unit_price?: number
        }
        Update: {
          created_at?: string
          description?: string
          expense_id?: string
          id?: string
          line_total?: number
          quantity?: number
          sort_order?: number
          unit_price?: number
        }
        Relationships: [
          {
            foreignKeyName: "expense_line_items_expense_id_fkey"
            columns: ["expense_id"]
            isOneToOne: false
            referencedRelation: "expenses"
            referencedColumns: ["id"]
          },
        ]
      }
      expenses: {
        Row: {
          amount: number
          business_id: string
          category: string | null
          created_at: string | null
          customer_id: string | null
          description: string
          expense_date: string | null
          id: string
          invoice_id: string | null
          job_id: string | null
          notes: string | null
          payment_method: string | null
          receipt_url: string | null
          updated_at: string | null
          vendor: string | null
        }
        Insert: {
          amount?: number
          business_id: string
          category?: string | null
          created_at?: string | null
          customer_id?: string | null
          description: string
          expense_date?: string | null
          id?: string
          invoice_id?: string | null
          job_id?: string | null
          notes?: string | null
          payment_method?: string | null
          receipt_url?: string | null
          updated_at?: string | null
          vendor?: string | null
        }
        Update: {
          amount?: number
          business_id?: string
          category?: string | null
          created_at?: string | null
          customer_id?: string | null
          description?: string
          expense_date?: string | null
          id?: string
          invoice_id?: string | null
          job_id?: string | null
          notes?: string | null
          payment_method?: string | null
          receipt_url?: string | null
          updated_at?: string | null
          vendor?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "expenses_business_id_fkey"
            columns: ["business_id"]
            isOneToOne: false
            referencedRelation: "businesses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "expenses_business_id_fkey"
            columns: ["business_id"]
            isOneToOne: false
            referencedRelation: "businesses_public"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "expenses_customer_id_fkey"
            columns: ["customer_id"]
            isOneToOne: false
            referencedRelation: "customers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "expenses_customer_id_fkey"
            columns: ["customer_id"]
            isOneToOne: false
            referencedRelation: "customers_public"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "expenses_invoice_id_fkey"
            columns: ["invoice_id"]
            isOneToOne: false
            referencedRelation: "invoices"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "expenses_job_id_fkey"
            columns: ["job_id"]
            isOneToOne: false
            referencedRelation: "jobs"
            referencedColumns: ["id"]
          },
        ]
      }
      integration_providers: {
        Row: {
          auth_type: string
          category: string
          created_at: string | null
          description: string | null
          display_name: string
          documentation_url: string | null
          id: string
          is_active: boolean | null
          is_featured: boolean | null
          logo_url: string | null
          provider_key: string
          updated_at: string | null
          webhook_support: boolean | null
        }
        Insert: {
          auth_type: string
          category: string
          created_at?: string | null
          description?: string | null
          display_name: string
          documentation_url?: string | null
          id?: string
          is_active?: boolean | null
          is_featured?: boolean | null
          logo_url?: string | null
          provider_key: string
          updated_at?: string | null
          webhook_support?: boolean | null
        }
        Update: {
          auth_type?: string
          category?: string
          created_at?: string | null
          description?: string | null
          display_name?: string
          documentation_url?: string | null
          id?: string
          is_active?: boolean | null
          is_featured?: boolean | null
          logo_url?: string | null
          provider_key?: string
          updated_at?: string | null
          webhook_support?: boolean | null
        }
        Relationships: []
      }
      integration_sync_logs: {
        Row: {
          action: string
          business_integration_id: string
          created_at: string | null
          error_message: string | null
          external_id: string | null
          fields_synced: string[] | null
          id: string
          request_payload: Json | null
          resource_id: string | null
          resource_type: string
          response_payload: Json | null
          success: boolean
          sync_direction: string
        }
        Insert: {
          action: string
          business_integration_id: string
          created_at?: string | null
          error_message?: string | null
          external_id?: string | null
          fields_synced?: string[] | null
          id?: string
          request_payload?: Json | null
          resource_id?: string | null
          resource_type: string
          response_payload?: Json | null
          success: boolean
          sync_direction: string
        }
        Update: {
          action?: string
          business_integration_id?: string
          created_at?: string | null
          error_message?: string | null
          external_id?: string | null
          fields_synced?: string[] | null
          id?: string
          request_payload?: Json | null
          resource_id?: string | null
          resource_type?: string
          response_payload?: Json | null
          success?: boolean
          sync_direction?: string
        }
        Relationships: [
          {
            foreignKeyName: "integration_sync_logs_business_integration_id_fkey"
            columns: ["business_integration_id"]
            isOneToOne: false
            referencedRelation: "business_integrations"
            referencedColumns: ["id"]
          },
        ]
      }
      invoice_activities: {
        Row: {
          activity_type: string
          created_at: string
          details: Json | null
          id: string
          invoice_id: string
        }
        Insert: {
          activity_type: string
          created_at?: string
          details?: Json | null
          id?: string
          invoice_id: string
        }
        Update: {
          activity_type?: string
          created_at?: string
          details?: Json | null
          id?: string
          invoice_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "invoice_activities_invoice_id_fkey"
            columns: ["invoice_id"]
            isOneToOne: false
            referencedRelation: "invoices"
            referencedColumns: ["id"]
          },
        ]
      }
      invoice_attachments: {
        Row: {
          caption: string | null
          file_name: string
          file_size: number
          file_url: string
          id: string
          invoice_id: string
          mime_type: string
          uploaded_at: string
        }
        Insert: {
          caption?: string | null
          file_name: string
          file_size?: number
          file_url: string
          id?: string
          invoice_id: string
          mime_type?: string
          uploaded_at?: string
        }
        Update: {
          caption?: string | null
          file_name?: string
          file_size?: number
          file_url?: string
          id?: string
          invoice_id?: string
          mime_type?: string
          uploaded_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "invoice_attachments_invoice_id_fkey"
            columns: ["invoice_id"]
            isOneToOne: false
            referencedRelation: "invoices"
            referencedColumns: ["id"]
          },
        ]
      }
      invoice_equipment_links: {
        Row: {
          created_at: string
          equipment_id: string
          id: string
          invoice_id: string
        }
        Insert: {
          created_at?: string
          equipment_id: string
          id?: string
          invoice_id: string
        }
        Update: {
          created_at?: string
          equipment_id?: string
          id?: string
          invoice_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "invoice_equipment_links_equipment_id_fkey"
            columns: ["equipment_id"]
            isOneToOne: false
            referencedRelation: "customer_equipment"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "invoice_equipment_links_invoice_id_fkey"
            columns: ["invoice_id"]
            isOneToOne: false
            referencedRelation: "invoices"
            referencedColumns: ["id"]
          },
        ]
      }
      invoice_job_links: {
        Row: {
          created_at: string | null
          id: string
          invoice_id: string | null
          job_id: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          invoice_id?: string | null
          job_id?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          invoice_id?: string | null
          job_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "invoice_job_links_invoice_id_fkey"
            columns: ["invoice_id"]
            isOneToOne: false
            referencedRelation: "invoices"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "invoice_job_links_job_id_fkey"
            columns: ["job_id"]
            isOneToOne: false
            referencedRelation: "jobs"
            referencedColumns: ["id"]
          },
        ]
      }
      invoice_line_items: {
        Row: {
          created_at: string
          description: string
          discount_type: string | null
          discount_value: number | null
          id: string
          invoice_id: string
          line_total: number
          quantity: number
          sort_order: number
          unit_price: number
        }
        Insert: {
          created_at?: string
          description: string
          discount_type?: string | null
          discount_value?: number | null
          id?: string
          invoice_id: string
          line_total?: number
          quantity?: number
          sort_order?: number
          unit_price?: number
        }
        Update: {
          created_at?: string
          description?: string
          discount_type?: string | null
          discount_value?: number | null
          id?: string
          invoice_id?: string
          line_total?: number
          quantity?: number
          sort_order?: number
          unit_price?: number
        }
        Relationships: [
          {
            foreignKeyName: "invoice_line_items_invoice_id_fkey"
            columns: ["invoice_id"]
            isOneToOne: false
            referencedRelation: "invoices"
            referencedColumns: ["id"]
          },
        ]
      }
      invoices: {
        Row: {
          acceptance_text: string | null
          adjustment_amount: number
          adjustment_label: string | null
          business_id: string
          cc_fee_amount: number
          cc_fee_enabled: boolean
          created_at: string
          customer_id: string
          draw_number: number | null
          due_date: string | null
          estimate_id: string | null
          id: string
          invoice_date: string
          invoice_number: string
          invoice_type: string | null
          job_id: string | null
          last_viewed_at: string | null
          notes: string | null
          paid_date: string | null
          parent_invoice_id: string | null
          payment_status: string
          payment_terms: string | null
          payment_url: string | null
          retainage_amount: number | null
          retainage_percent: number | null
          retainage_released: number | null
          retainage_released_date: string | null
          shareable_token: string | null
          show_line_item_pricing: boolean
          sms_sent: boolean
          sms_sent_at: string | null
          status: string
          subtotal: number
          tax_amount: number
          tax_inclusive: boolean
          tax_rate: number
          terms_conditions: string | null
          total: number
          total_paid: number
          updated_at: string
          view_count: number
        }
        Insert: {
          acceptance_text?: string | null
          adjustment_amount?: number
          adjustment_label?: string | null
          business_id: string
          cc_fee_amount?: number
          cc_fee_enabled?: boolean
          created_at?: string
          customer_id: string
          draw_number?: number | null
          due_date?: string | null
          estimate_id?: string | null
          id?: string
          invoice_date?: string
          invoice_number: string
          invoice_type?: string | null
          job_id?: string | null
          last_viewed_at?: string | null
          notes?: string | null
          paid_date?: string | null
          parent_invoice_id?: string | null
          payment_status?: string
          payment_terms?: string | null
          payment_url?: string | null
          retainage_amount?: number | null
          retainage_percent?: number | null
          retainage_released?: number | null
          retainage_released_date?: string | null
          shareable_token?: string | null
          show_line_item_pricing?: boolean
          sms_sent?: boolean
          sms_sent_at?: string | null
          status?: string
          subtotal?: number
          tax_amount?: number
          tax_inclusive?: boolean
          tax_rate?: number
          terms_conditions?: string | null
          total?: number
          total_paid?: number
          updated_at?: string
          view_count?: number
        }
        Update: {
          acceptance_text?: string | null
          adjustment_amount?: number
          adjustment_label?: string | null
          business_id?: string
          cc_fee_amount?: number
          cc_fee_enabled?: boolean
          created_at?: string
          customer_id?: string
          draw_number?: number | null
          due_date?: string | null
          estimate_id?: string | null
          id?: string
          invoice_date?: string
          invoice_number?: string
          invoice_type?: string | null
          job_id?: string | null
          last_viewed_at?: string | null
          notes?: string | null
          paid_date?: string | null
          parent_invoice_id?: string | null
          payment_status?: string
          payment_terms?: string | null
          payment_url?: string | null
          retainage_amount?: number | null
          retainage_percent?: number | null
          retainage_released?: number | null
          retainage_released_date?: string | null
          shareable_token?: string | null
          show_line_item_pricing?: boolean
          sms_sent?: boolean
          sms_sent_at?: string | null
          status?: string
          subtotal?: number
          tax_amount?: number
          tax_inclusive?: boolean
          tax_rate?: number
          terms_conditions?: string | null
          total?: number
          total_paid?: number
          updated_at?: string
          view_count?: number
        }
        Relationships: [
          {
            foreignKeyName: "invoices_business_id_fkey"
            columns: ["business_id"]
            isOneToOne: false
            referencedRelation: "businesses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "invoices_business_id_fkey"
            columns: ["business_id"]
            isOneToOne: false
            referencedRelation: "businesses_public"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "invoices_customer_id_fkey"
            columns: ["customer_id"]
            isOneToOne: false
            referencedRelation: "customers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "invoices_customer_id_fkey"
            columns: ["customer_id"]
            isOneToOne: false
            referencedRelation: "customers_public"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "invoices_estimate_id_fkey"
            columns: ["estimate_id"]
            isOneToOne: false
            referencedRelation: "estimates"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "invoices_job_id_fkey"
            columns: ["job_id"]
            isOneToOne: false
            referencedRelation: "jobs"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "invoices_parent_invoice_id_fkey"
            columns: ["parent_invoice_id"]
            isOneToOne: false
            referencedRelation: "invoices"
            referencedColumns: ["id"]
          },
        ]
      }
      jobs: {
        Row: {
          address: string | null
          business_id: string
          contract_value: number | null
          created_at: string | null
          customer_id: string | null
          description: string | null
          end_date: string | null
          id: string
          job_address: string | null
          job_name: string | null
          job_number: string | null
          name: string
          start_date: string | null
          status: string | null
          updated_at: string | null
          workedge_project_id: string | null
          workedge_synced_at: string | null
        }
        Insert: {
          address?: string | null
          business_id: string
          contract_value?: number | null
          created_at?: string | null
          customer_id?: string | null
          description?: string | null
          end_date?: string | null
          id?: string
          job_address?: string | null
          job_name?: string | null
          job_number?: string | null
          name: string
          start_date?: string | null
          status?: string | null
          updated_at?: string | null
          workedge_project_id?: string | null
          workedge_synced_at?: string | null
        }
        Update: {
          address?: string | null
          business_id?: string
          contract_value?: number | null
          created_at?: string | null
          customer_id?: string | null
          description?: string | null
          end_date?: string | null
          id?: string
          job_address?: string | null
          job_name?: string | null
          job_number?: string | null
          name?: string
          start_date?: string | null
          status?: string | null
          updated_at?: string | null
          workedge_project_id?: string | null
          workedge_synced_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "jobs_business_id_fkey"
            columns: ["business_id"]
            isOneToOne: false
            referencedRelation: "businesses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "jobs_business_id_fkey"
            columns: ["business_id"]
            isOneToOne: false
            referencedRelation: "businesses_public"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "jobs_customer_id_fkey"
            columns: ["customer_id"]
            isOneToOne: false
            referencedRelation: "customers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "jobs_customer_id_fkey"
            columns: ["customer_id"]
            isOneToOne: false
            referencedRelation: "customers_public"
            referencedColumns: ["id"]
          },
        ]
      }
      labor_rates: {
        Row: {
          business_id: string
          created_at: string
          description: string | null
          id: string
          is_taxable: boolean
          name: string
          rate: number
          rate_type: string
          updated_at: string
        }
        Insert: {
          business_id: string
          created_at?: string
          description?: string | null
          id?: string
          is_taxable?: boolean
          name: string
          rate?: number
          rate_type?: string
          updated_at?: string
        }
        Update: {
          business_id?: string
          created_at?: string
          description?: string | null
          id?: string
          is_taxable?: boolean
          name?: string
          rate?: number
          rate_type?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "labor_rates_business_id_fkey"
            columns: ["business_id"]
            isOneToOne: false
            referencedRelation: "businesses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "labor_rates_business_id_fkey"
            columns: ["business_id"]
            isOneToOne: false
            referencedRelation: "businesses_public"
            referencedColumns: ["id"]
          },
        ]
      }
      materials: {
        Row: {
          business_id: string
          category: string
          created_at: string
          description: string | null
          id: string
          image_url: string | null
          in_stock: boolean
          is_taxable: boolean
          markup_percent: number
          name: string
          sell_price: number
          sku: string | null
          unit: string
          unit_cost: number
          updated_at: string
        }
        Insert: {
          business_id: string
          category?: string
          created_at?: string
          description?: string | null
          id?: string
          image_url?: string | null
          in_stock?: boolean
          is_taxable?: boolean
          markup_percent?: number
          name: string
          sell_price?: number
          sku?: string | null
          unit?: string
          unit_cost?: number
          updated_at?: string
        }
        Update: {
          business_id?: string
          category?: string
          created_at?: string
          description?: string | null
          id?: string
          image_url?: string | null
          in_stock?: boolean
          is_taxable?: boolean
          markup_percent?: number
          name?: string
          sell_price?: number
          sku?: string | null
          unit?: string
          unit_cost?: number
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "materials_business_id_fkey"
            columns: ["business_id"]
            isOneToOne: false
            referencedRelation: "businesses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "materials_business_id_fkey"
            columns: ["business_id"]
            isOneToOne: false
            referencedRelation: "businesses_public"
            referencedColumns: ["id"]
          },
        ]
      }
      notification_templates: {
        Row: {
          body: string
          business_id: string
          category: string
          created_at: string
          id: string
          is_enabled: boolean
          is_system: boolean
          subject: string | null
          template_type: string
          updated_at: string
        }
        Insert: {
          body: string
          business_id: string
          category?: string
          created_at?: string
          id?: string
          is_enabled?: boolean
          is_system?: boolean
          subject?: string | null
          template_type: string
          updated_at?: string
        }
        Update: {
          body?: string
          business_id?: string
          category?: string
          created_at?: string
          id?: string
          is_enabled?: boolean
          is_system?: boolean
          subject?: string | null
          template_type?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "notification_templates_business_id_fkey"
            columns: ["business_id"]
            isOneToOne: false
            referencedRelation: "businesses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "notification_templates_business_id_fkey"
            columns: ["business_id"]
            isOneToOne: false
            referencedRelation: "businesses_public"
            referencedColumns: ["id"]
          },
        ]
      }
      page_meta: {
        Row: {
          canonical_url: string | null
          description: string
          og_description: string | null
          og_image_url: string | null
          og_title: string | null
          robots: string | null
          route: string
          structured_data: Json | null
          title: string
          twitter_card: string | null
          updated_at: string
        }
        Insert: {
          canonical_url?: string | null
          description: string
          og_description?: string | null
          og_image_url?: string | null
          og_title?: string | null
          robots?: string | null
          route: string
          structured_data?: Json | null
          title: string
          twitter_card?: string | null
          updated_at?: string
        }
        Update: {
          canonical_url?: string | null
          description?: string
          og_description?: string | null
          og_image_url?: string | null
          og_title?: string | null
          robots?: string | null
          route?: string
          structured_data?: Json | null
          title?: string
          twitter_card?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      partner_applications: {
        Row: {
          company: string | null
          created_at: string | null
          email: string
          how_they_refer: string | null
          id: string
          name: string
          notes: string | null
          phone: string | null
          reviewed_at: string | null
          status: string
        }
        Insert: {
          company?: string | null
          created_at?: string | null
          email: string
          how_they_refer?: string | null
          id?: string
          name: string
          notes?: string | null
          phone?: string | null
          reviewed_at?: string | null
          status?: string
        }
        Update: {
          company?: string | null
          created_at?: string | null
          email?: string
          how_they_refer?: string | null
          id?: string
          name?: string
          notes?: string | null
          phone?: string | null
          reviewed_at?: string | null
          status?: string
        }
        Relationships: []
      }
      parts: {
        Row: {
          business_id: string
          created_at: string
          description: string | null
          id: string
          image_url: string | null
          is_taxable: boolean
          name: string
          part_number: string | null
          price: number
          updated_at: string
        }
        Insert: {
          business_id: string
          created_at?: string
          description?: string | null
          id?: string
          image_url?: string | null
          is_taxable?: boolean
          name: string
          part_number?: string | null
          price?: number
          updated_at?: string
        }
        Update: {
          business_id?: string
          created_at?: string
          description?: string | null
          id?: string
          image_url?: string | null
          is_taxable?: boolean
          name?: string
          part_number?: string | null
          price?: number
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "parts_business_id_fkey"
            columns: ["business_id"]
            isOneToOne: false
            referencedRelation: "businesses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "parts_business_id_fkey"
            columns: ["business_id"]
            isOneToOne: false
            referencedRelation: "businesses_public"
            referencedColumns: ["id"]
          },
        ]
      }
      payment_history: {
        Row: {
          amount: number
          check_number: string | null
          created_at: string
          id: string
          internal_notes: string | null
          invoice_id: string
          notes: string | null
          payment_date: string
          payment_method: string
          receipt_url: string | null
          reference_id: string | null
          tracking_id: string | null
          transaction_id: string | null
          updated_at: string | null
        }
        Insert: {
          amount: number
          check_number?: string | null
          created_at?: string
          id?: string
          internal_notes?: string | null
          invoice_id: string
          notes?: string | null
          payment_date?: string
          payment_method: string
          receipt_url?: string | null
          reference_id?: string | null
          tracking_id?: string | null
          transaction_id?: string | null
          updated_at?: string | null
        }
        Update: {
          amount?: number
          check_number?: string | null
          created_at?: string
          id?: string
          internal_notes?: string | null
          invoice_id?: string
          notes?: string | null
          payment_date?: string
          payment_method?: string
          receipt_url?: string | null
          reference_id?: string | null
          tracking_id?: string | null
          transaction_id?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "payment_history_invoice_id_fkey"
            columns: ["invoice_id"]
            isOneToOne: false
            referencedRelation: "invoices"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string
          first_name: string | null
          id: string
          last_name: string | null
          phone: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string
          first_name?: string | null
          id?: string
          last_name?: string | null
          phone?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          avatar_url?: string | null
          created_at?: string
          first_name?: string | null
          id?: string
          last_name?: string | null
          phone?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      redirects: {
        Row: {
          from_path: string
          id: string
          is_active: boolean
          status_code: number
          to_path: string
          updated_at: string
        }
        Insert: {
          from_path: string
          id?: string
          is_active?: boolean
          status_code?: number
          to_path: string
          updated_at?: string
        }
        Update: {
          from_path?: string
          id?: string
          is_active?: boolean
          status_code?: number
          to_path?: string
          updated_at?: string
        }
        Relationships: []
      }
      referral_partners: {
        Row: {
          commission_amount: number
          commission_type: string
          commission_value: number
          company: string | null
          created_at: string
          email: string
          id: string
          linked_business_id: string | null
          name: string
          notes: string | null
          payout_details: Json | null
          payout_method: string | null
          pending_payout: number
          phone: string | null
          qualified_referrals: number
          qualifying_volume: number
          referral_code: string
          source: string
          status: string
          total_earned: number
          total_paid_out: number
          total_referrals: number
          updated_at: string
          user_id: string | null
        }
        Insert: {
          commission_amount?: number
          commission_type?: string
          commission_value?: number
          company?: string | null
          created_at?: string
          email: string
          id?: string
          linked_business_id?: string | null
          name: string
          notes?: string | null
          payout_details?: Json | null
          payout_method?: string | null
          pending_payout?: number
          phone?: string | null
          qualified_referrals?: number
          qualifying_volume?: number
          referral_code: string
          source?: string
          status?: string
          total_earned?: number
          total_paid_out?: number
          total_referrals?: number
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          commission_amount?: number
          commission_type?: string
          commission_value?: number
          company?: string | null
          created_at?: string
          email?: string
          id?: string
          linked_business_id?: string | null
          name?: string
          notes?: string | null
          payout_details?: Json | null
          payout_method?: string | null
          pending_payout?: number
          phone?: string | null
          qualified_referrals?: number
          qualifying_volume?: number
          referral_code?: string
          source?: string
          status?: string
          total_earned?: number
          total_paid_out?: number
          total_referrals?: number
          updated_at?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "referral_partners_linked_business_id_fkey"
            columns: ["linked_business_id"]
            isOneToOne: false
            referencedRelation: "businesses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "referral_partners_linked_business_id_fkey"
            columns: ["linked_business_id"]
            isOneToOne: false
            referencedRelation: "businesses_public"
            referencedColumns: ["id"]
          },
        ]
      }
      referrals: {
        Row: {
          created_at: string
          id: string
          notes: string | null
          paid_at: string | null
          payment_due_date: string | null
          payout_amount: number
          payout_due_at: string | null
          processing_volume: number
          qualified_at: string | null
          qualifying_volume_target: number
          referral_code: string
          referral_partner_id: string
          referred_business_id: string | null
          referred_email: string | null
          signed_up_at: string | null
          status: string
          stripe_volume: number
          updated_at: string
        }
        Insert: {
          created_at?: string
          id?: string
          notes?: string | null
          paid_at?: string | null
          payment_due_date?: string | null
          payout_amount?: number
          payout_due_at?: string | null
          processing_volume?: number
          qualified_at?: string | null
          qualifying_volume_target?: number
          referral_code: string
          referral_partner_id: string
          referred_business_id?: string | null
          referred_email?: string | null
          signed_up_at?: string | null
          status?: string
          stripe_volume?: number
          updated_at?: string
        }
        Update: {
          created_at?: string
          id?: string
          notes?: string | null
          paid_at?: string | null
          payment_due_date?: string | null
          payout_amount?: number
          payout_due_at?: string | null
          processing_volume?: number
          qualified_at?: string | null
          qualifying_volume_target?: number
          referral_code?: string
          referral_partner_id?: string
          referred_business_id?: string | null
          referred_email?: string | null
          signed_up_at?: string | null
          status?: string
          stripe_volume?: number
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "referrals_referral_partner_id_fkey"
            columns: ["referral_partner_id"]
            isOneToOne: false
            referencedRelation: "referral_partners"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "referrals_referred_business_id_fkey"
            columns: ["referred_business_id"]
            isOneToOne: false
            referencedRelation: "businesses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "referrals_referred_business_id_fkey"
            columns: ["referred_business_id"]
            isOneToOne: false
            referencedRelation: "businesses_public"
            referencedColumns: ["id"]
          },
        ]
      }
      reminder_settings: {
        Row: {
          business_id: string
          created_at: string
          days: number
          enabled: boolean
          id: string
          label: string
          sort_order: number
          timing_type: string
          updated_at: string
          via_email: boolean
          via_sms: boolean
        }
        Insert: {
          business_id: string
          created_at?: string
          days?: number
          enabled?: boolean
          id?: string
          label: string
          sort_order?: number
          timing_type: string
          updated_at?: string
          via_email?: boolean
          via_sms?: boolean
        }
        Update: {
          business_id?: string
          created_at?: string
          days?: number
          enabled?: boolean
          id?: string
          label?: string
          sort_order?: number
          timing_type?: string
          updated_at?: string
          via_email?: boolean
          via_sms?: boolean
        }
        Relationships: [
          {
            foreignKeyName: "reminder_settings_business_id_fkey"
            columns: ["business_id"]
            isOneToOne: false
            referencedRelation: "businesses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "reminder_settings_business_id_fkey"
            columns: ["business_id"]
            isOneToOne: false
            referencedRelation: "businesses_public"
            referencedColumns: ["id"]
          },
        ]
      }
      service_templates: {
        Row: {
          business_id: string
          created_at: string
          description: string | null
          id: string
          is_active: boolean
          name: string
          updated_at: string
        }
        Insert: {
          business_id: string
          created_at?: string
          description?: string | null
          id?: string
          is_active?: boolean
          name: string
          updated_at?: string
        }
        Update: {
          business_id?: string
          created_at?: string
          description?: string | null
          id?: string
          is_active?: boolean
          name?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "service_templates_business_id_fkey"
            columns: ["business_id"]
            isOneToOne: false
            referencedRelation: "businesses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "service_templates_business_id_fkey"
            columns: ["business_id"]
            isOneToOne: false
            referencedRelation: "businesses_public"
            referencedColumns: ["id"]
          },
        ]
      }
      subscription_events: {
        Row: {
          business_id: string
          created_at: string | null
          details: Json | null
          event_type: string
          from_plan: string | null
          id: string
          stripe_event_id: string | null
          to_plan: string | null
        }
        Insert: {
          business_id: string
          created_at?: string | null
          details?: Json | null
          event_type: string
          from_plan?: string | null
          id?: string
          stripe_event_id?: string | null
          to_plan?: string | null
        }
        Update: {
          business_id?: string
          created_at?: string | null
          details?: Json | null
          event_type?: string
          from_plan?: string | null
          id?: string
          stripe_event_id?: string | null
          to_plan?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "subscription_events_business_id_fkey"
            columns: ["business_id"]
            isOneToOne: false
            referencedRelation: "businesses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "subscription_events_business_id_fkey"
            columns: ["business_id"]
            isOneToOne: false
            referencedRelation: "businesses_public"
            referencedColumns: ["id"]
          },
        ]
      }
      subscriptions: {
        Row: {
          business_id: string
          cancel_at_period_end: boolean | null
          canceled_at: string | null
          created_at: string | null
          current_period_end: string | null
          current_period_start: string | null
          id: string
          plan_type: string
          status: string
          stripe_customer_id: string | null
          stripe_price_id: string | null
          stripe_subscription_id: string | null
          trial_end: string | null
          updated_at: string | null
        }
        Insert: {
          business_id: string
          cancel_at_period_end?: boolean | null
          canceled_at?: string | null
          created_at?: string | null
          current_period_end?: string | null
          current_period_start?: string | null
          id?: string
          plan_type?: string
          status?: string
          stripe_customer_id?: string | null
          stripe_price_id?: string | null
          stripe_subscription_id?: string | null
          trial_end?: string | null
          updated_at?: string | null
        }
        Update: {
          business_id?: string
          cancel_at_period_end?: boolean | null
          canceled_at?: string | null
          created_at?: string | null
          current_period_end?: string | null
          current_period_start?: string | null
          id?: string
          plan_type?: string
          status?: string
          stripe_customer_id?: string | null
          stripe_price_id?: string | null
          stripe_subscription_id?: string | null
          trial_end?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "subscriptions_business_id_fkey"
            columns: ["business_id"]
            isOneToOne: true
            referencedRelation: "businesses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "subscriptions_business_id_fkey"
            columns: ["business_id"]
            isOneToOne: true
            referencedRelation: "businesses_public"
            referencedColumns: ["id"]
          },
        ]
      }
      template_line_items: {
        Row: {
          created_at: string
          description: string
          id: string
          quantity: number
          sort_order: number
          template_id: string
          unit_price: number
        }
        Insert: {
          created_at?: string
          description: string
          id?: string
          quantity?: number
          sort_order?: number
          template_id: string
          unit_price?: number
        }
        Update: {
          created_at?: string
          description?: string
          id?: string
          quantity?: number
          sort_order?: number
          template_id?: string
          unit_price?: number
        }
        Relationships: [
          {
            foreignKeyName: "template_line_items_template_id_fkey"
            columns: ["template_id"]
            isOneToOne: false
            referencedRelation: "service_templates"
            referencedColumns: ["id"]
          },
        ]
      }
      user_notification_preferences: {
        Row: {
          business_id: string
          created_at: string
          enabled: boolean
          event_type: string
          id: string
          summary_time: string | null
          updated_at: string
          via_email: boolean
          via_push: boolean
          via_sms: boolean
        }
        Insert: {
          business_id: string
          created_at?: string
          enabled?: boolean
          event_type: string
          id?: string
          summary_time?: string | null
          updated_at?: string
          via_email?: boolean
          via_push?: boolean
          via_sms?: boolean
        }
        Update: {
          business_id?: string
          created_at?: string
          enabled?: boolean
          event_type?: string
          id?: string
          summary_time?: string | null
          updated_at?: string
          via_email?: boolean
          via_push?: boolean
          via_sms?: boolean
        }
        Relationships: [
          {
            foreignKeyName: "user_notification_preferences_business_id_fkey"
            columns: ["business_id"]
            isOneToOne: false
            referencedRelation: "businesses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_notification_preferences_business_id_fkey"
            columns: ["business_id"]
            isOneToOne: false
            referencedRelation: "businesses_public"
            referencedColumns: ["id"]
          },
        ]
      }
      user_preferences: {
        Row: {
          created_at: string
          id: string
          preference_key: string
          preference_value: string
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          preference_key: string
          preference_value: string
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          preference_key?: string
          preference_value?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          created_at: string
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
      workedge_photos: {
        Row: {
          ai_description: string | null
          ai_labels: string[] | null
          attached_to_invoices: string[] | null
          business_id: string
          caption: string | null
          created_at: string | null
          customer_id: string
          file_size: number | null
          file_url: string
          height: number | null
          id: string
          last_fetched_at: string | null
          latitude: number | null
          longitude: number | null
          photo_id: string
          taken_at: string | null
          thumbnail_url: string | null
          uploaded_by_name: string | null
          width: number | null
          workedge_project_id: string
        }
        Insert: {
          ai_description?: string | null
          ai_labels?: string[] | null
          attached_to_invoices?: string[] | null
          business_id: string
          caption?: string | null
          created_at?: string | null
          customer_id: string
          file_size?: number | null
          file_url: string
          height?: number | null
          id?: string
          last_fetched_at?: string | null
          latitude?: number | null
          longitude?: number | null
          photo_id: string
          taken_at?: string | null
          thumbnail_url?: string | null
          uploaded_by_name?: string | null
          width?: number | null
          workedge_project_id: string
        }
        Update: {
          ai_description?: string | null
          ai_labels?: string[] | null
          attached_to_invoices?: string[] | null
          business_id?: string
          caption?: string | null
          created_at?: string | null
          customer_id?: string
          file_size?: number | null
          file_url?: string
          height?: number | null
          id?: string
          last_fetched_at?: string | null
          latitude?: number | null
          longitude?: number | null
          photo_id?: string
          taken_at?: string | null
          thumbnail_url?: string | null
          uploaded_by_name?: string | null
          width?: number | null
          workedge_project_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "workedge_photos_business_id_fkey"
            columns: ["business_id"]
            isOneToOne: false
            referencedRelation: "businesses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "workedge_photos_business_id_fkey"
            columns: ["business_id"]
            isOneToOne: false
            referencedRelation: "businesses_public"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "workedge_photos_customer_id_fkey"
            columns: ["customer_id"]
            isOneToOne: false
            referencedRelation: "customers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "workedge_photos_customer_id_fkey"
            columns: ["customer_id"]
            isOneToOne: false
            referencedRelation: "customers_public"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "workedge_photos_workedge_project_id_fkey"
            columns: ["workedge_project_id"]
            isOneToOne: false
            referencedRelation: "workedge_projects"
            referencedColumns: ["id"]
          },
        ]
      }
      workedge_projects: {
        Row: {
          business_id: string
          completion_date: string | null
          created_at: string | null
          customer_id: string
          id: string
          last_synced_at: string | null
          note_count: number | null
          photo_count: number | null
          project_name: string
          project_status: string | null
          project_type: string | null
          property_address: string | null
          start_date: string | null
          sync_status: string | null
          updated_at: string | null
          video_count: number | null
          workedge_project_id: string
          workedge_team_id: string
        }
        Insert: {
          business_id: string
          completion_date?: string | null
          created_at?: string | null
          customer_id: string
          id?: string
          last_synced_at?: string | null
          note_count?: number | null
          photo_count?: number | null
          project_name: string
          project_status?: string | null
          project_type?: string | null
          property_address?: string | null
          start_date?: string | null
          sync_status?: string | null
          updated_at?: string | null
          video_count?: number | null
          workedge_project_id: string
          workedge_team_id: string
        }
        Update: {
          business_id?: string
          completion_date?: string | null
          created_at?: string | null
          customer_id?: string
          id?: string
          last_synced_at?: string | null
          note_count?: number | null
          photo_count?: number | null
          project_name?: string
          project_status?: string | null
          project_type?: string | null
          property_address?: string | null
          start_date?: string | null
          sync_status?: string | null
          updated_at?: string | null
          video_count?: number | null
          workedge_project_id?: string
          workedge_team_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "workedge_projects_business_id_fkey"
            columns: ["business_id"]
            isOneToOne: false
            referencedRelation: "businesses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "workedge_projects_business_id_fkey"
            columns: ["business_id"]
            isOneToOne: false
            referencedRelation: "businesses_public"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "workedge_projects_customer_id_fkey"
            columns: ["customer_id"]
            isOneToOne: false
            referencedRelation: "customers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "workedge_projects_customer_id_fkey"
            columns: ["customer_id"]
            isOneToOne: false
            referencedRelation: "customers_public"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      businesses_public: {
        Row: {
          accept_ach: boolean | null
          accept_cards: boolean | null
          accept_manual: boolean | null
          address: string | null
          allow_partial_payments: boolean | null
          brand_color: string | null
          city: string | null
          default_acceptance_text: string | null
          default_payment_terms: string | null
          default_terms_conditions: string | null
          email: string | null
          fee_absorption: string | null
          fee_display_label: string | null
          id: string | null
          license_number: string | null
          logo_url: string | null
          minimum_payment_amount: number | null
          name: string | null
          phone: string | null
          show_address_on_invoices: boolean | null
          show_license_on_invoices: boolean | null
          show_logo_on_invoices: boolean | null
          state: string | null
          street_address: string | null
          suite_unit: string | null
          warranty_duration: number | null
          warranty_duration_unit: string | null
          warranty_enabled: boolean | null
          warranty_label: string | null
          warranty_terms: string | null
          zip_code: string | null
        }
        Insert: {
          accept_ach?: boolean | null
          accept_cards?: boolean | null
          accept_manual?: boolean | null
          address?: string | null
          allow_partial_payments?: boolean | null
          brand_color?: string | null
          city?: string | null
          default_acceptance_text?: string | null
          default_payment_terms?: string | null
          default_terms_conditions?: string | null
          email?: string | null
          fee_absorption?: string | null
          fee_display_label?: string | null
          id?: string | null
          license_number?: string | null
          logo_url?: string | null
          minimum_payment_amount?: number | null
          name?: string | null
          phone?: string | null
          show_address_on_invoices?: boolean | null
          show_license_on_invoices?: boolean | null
          show_logo_on_invoices?: boolean | null
          state?: string | null
          street_address?: string | null
          suite_unit?: string | null
          warranty_duration?: number | null
          warranty_duration_unit?: string | null
          warranty_enabled?: boolean | null
          warranty_label?: string | null
          warranty_terms?: string | null
          zip_code?: string | null
        }
        Update: {
          accept_ach?: boolean | null
          accept_cards?: boolean | null
          accept_manual?: boolean | null
          address?: string | null
          allow_partial_payments?: boolean | null
          brand_color?: string | null
          city?: string | null
          default_acceptance_text?: string | null
          default_payment_terms?: string | null
          default_terms_conditions?: string | null
          email?: string | null
          fee_absorption?: string | null
          fee_display_label?: string | null
          id?: string | null
          license_number?: string | null
          logo_url?: string | null
          minimum_payment_amount?: number | null
          name?: string | null
          phone?: string | null
          show_address_on_invoices?: boolean | null
          show_license_on_invoices?: boolean | null
          show_logo_on_invoices?: boolean | null
          state?: string | null
          street_address?: string | null
          suite_unit?: string | null
          warranty_duration?: number | null
          warranty_duration_unit?: string | null
          warranty_enabled?: boolean | null
          warranty_label?: string | null
          warranty_terms?: string | null
          zip_code?: string | null
        }
        Relationships: []
      }
      customers_public: {
        Row: {
          address: string | null
          email: string | null
          id: string | null
          name: string | null
        }
        Insert: {
          address?: string | null
          email?: string | null
          id?: string | null
          name?: string | null
        }
        Update: {
          address?: string | null
          email?: string | null
          id?: string | null
          name?: string | null
        }
        Relationships: []
      }
    }
    Functions: {
      generate_bid_number: { Args: { p_business_id: string }; Returns: string }
      generate_estimate_number: {
        Args: { p_business_id: string }
        Returns: string
      }
      generate_invoice_number: {
        Args: { p_business_id: string }
        Returns: string
      }
      generate_referral_code: { Args: { p_name: string }; Returns: string }
      get_business_plan: { Args: { p_business_id: string }; Returns: string }
      get_monthly_invoice_count: {
        Args: { p_business_id: string }
        Returns: number
      }
      get_my_referral_stats: {
        Args: { p_referral_code: string }
        Returns: Json
      }
      get_user_business_id: { Args: never; Returns: string }
      get_user_role_in_business: { Args: never; Returns: string }
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
      increment_referral_count: {
        Args: { p_partner_id: string }
        Returns: undefined
      }
      seed_notification_templates: {
        Args: { p_business_id: string }
        Returns: undefined
      }
      track_invoice_view: { Args: { p_token: string }; Returns: undefined }
    }
    Enums: {
      app_role: "admin"
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
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never) = never,
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
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
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
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
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
  EnumName extends (DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never) = never,
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
  CompositeTypeName extends (PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never) = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["admin"],
    },
  },
} as const
