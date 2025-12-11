export type AvatarRow = {
  id?: string;
  created_at?: string;
  email?: string | null;
  gender?: string | null;
  skin_tone?: string | null;
  vibe?: string | null;
  base_image_url?: string | null;
  output_url?: string | null;
  license_token?: string | null;
  consent_json?: any;
  consent_name?: string | null;
  qr_campaign?: string | null;
};

export type Database = {
  public: {
    Tables: {
      avatars: {
        Row: AvatarRow;
        Insert: AvatarRow;
        Update: AvatarRow;
      };
    };
  };
};
