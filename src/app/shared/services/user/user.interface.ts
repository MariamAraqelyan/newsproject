export interface IUserResponse {
  id: number;
  email: string;
  bio: string;
  avatar: string;
  avatar_thumbnail: string;
  username: string;
  user_type: number;
  phone_number: string;
  avarageRate: number;
  is_top_rated: boolean;
  reviewsQuantity: number;
  posts: number;
  subscribers: number;
  comments: number;
  reviews: number;
  own_reviews: number;
  rating: number;
  ethics: number;
  fairness: number;
  trust: number;
  expertise: number;
  accuracy: number;
  contribution: number;
  facebook: string;
  twitter: string;
  linkedin: string;
  is_reviewed?: boolean;
  is_subscribed?: boolean;
  feed_ordering: string;
}

export interface IUser extends IUserResponse {
  role: number;
  roleName: string;
}

export interface IUpdateUserParams {
  avatar?: File;
  username?: string;
  facebook?: string;
  twitter?: string;
  linkedin?: string;
  bio?: string;
}
