export interface IReviewResponse {
  count: number;
  next: string;
  previous: string;
  results: IReview[];
}

export interface IReview {
  id: number;
  author: IReviewAuthor;
  text: string;
  agree_number: number;
  disagreed_num: number;
  agreed_num: number;
  is_agreed: boolean;
  is_disagreed: boolean;
  created_at: string;
  reply: IReviewAnswer;
  rating: number;
  reported: boolean; // TODO: not yet implemented by api
}

export interface IReviewAuthor {
  id: number;
  is_top_rated: boolean;
  rating: number;
  avatar_thumbnail: string;
  username: string;
}

export interface IReviewAnswer {
  id: number;
  user: IReviewAuthor;
  text: string;
  agree_number: number;
  disagree_number: number;
  creation_time: number;
  reported: boolean; // TODO: not yet implemented by api
}

export interface IGetReviewsParams {
  page: number;
  page_size: number;
  user_id: string;
  ordering: 'rating' | '-rating' | 'id' | '-id';
}

export interface ICreateReviewParams extends IRateFields {
  user: number;
  text: string;
}

export interface IRateFields {
  ethics: number;
  trust: number;
  accuracy: number;
  fairness: number;
  contribution: number;
  expertise: number;
}
