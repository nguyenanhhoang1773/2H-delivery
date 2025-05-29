export interface user {
  id: number;
  email: string;
  phone: number;
  fullname: string;
}
export interface Eatery {
  _id: string;
  name: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  phone?: string;
  isOpen?: boolean;
  imageUrl?: string;
  rating?: number;
  createdAt?: string; // hoặc Date nếu bạn muốn xử lý dạng Date
}
