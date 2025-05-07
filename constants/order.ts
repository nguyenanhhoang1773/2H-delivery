export interface Order {
  id: string;
  shopName: string;
  productName: string;
  image: string;
  description: string,
  originalPrice: number;
  price: number;
  total: number;
  status: string;
  reviewDeadline?: string;
  reward?: string;
  favorite?: boolean;
}