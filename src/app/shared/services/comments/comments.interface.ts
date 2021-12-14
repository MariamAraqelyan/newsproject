export interface IGetCommentsParams {
  page: number;
  page_size: number;
}

export interface ICommentCreateParams {
  text: string;
  post: number;
  parent_comment?: number;
}

export interface ICommentsResponse {
  count: number;
  next: string;
  previous: string;
  results: IComment[];
}

export interface IComment {
  id: number;
  text: string;
  post: number;
  parent_comment: number;
  created_at: string;
  author: ICommentAuthor;
}

export interface ICommentAuthor {
  id: number;
  is_top_rated: boolean;
  rating: number;
  reviews: number;
  avatar_thumbnail: string;
  username: string;
}
