export interface Product {
  id: string;
  slug: string;
  title: string;
  description: string;
  category: string;
  price_credits: number;
  cover_emoji: string;
  content_url?: string;
  active: boolean;
  sales_count: number;
  created_at: string;
}

export interface Profile {
  id: string;
  email: string;
  full_name?: string;
  is_admin: boolean;
  wallet_balance: number;
  created_at: string;
}

export interface RechargeTier {
  id: string;
  amount_brl_cents: number;
  credits_awarded: number;
  active: boolean;
  sort_order: number;
}

export interface Order {
  id: string;
  user_id: string;
  product_id: string;
  price_paid_credits: number;
  refund_status: "nenhum" | "solicitado" | "aprovado" | "negado";
  refund_reason?: string;
  products?: Product;
  created_at: string;
}

export interface WalletTransaction {
  id: string;
  user_id: string;
  type: "recarga" | "compra" | "reembolso" | "ajuste_admin";
  amount: number;
  mp_payment_id?: string;
  related_order_id?: string;
  note?: string;
  created_at: string;
}