export interface IPSAParams {
  text: string;
  slug?: string;
  category: string;
  description: string;
}

export interface IArticleParams {
  text: string;
  slug: string;
  title: string;
  category: string;
  description: string;
  video?: string;
  image?: File;
}

export interface IMemeParams {
  category: string;
  title?: string;
  image: File;
}

export interface IRepostParams {
  url: string;
  category: string;
}

export interface ICreatePollParams {
  category: string;
  question: string;
  choices_text: string[];
}


export interface IGetPostsParams {
  page: number;
  page_size: number;
  category: string;
}

export interface IGetUserPostsParams {
  id: string;
  page: number;
  page_size: number;
  type?: string;
  exclude?: string;
}

export interface IPostsResponse {
  count: number;
  next: string;
  previous: string;
  results: IGeneralPost[];
}

export type IGeneralPost = (IPsaPost | IMemePost | IArticlePost | IArticlePost | IPollPost | IRepost);

export interface IPost {
  id: number;
  type: string;
  slug: string;
  upvotes: number;
  comments: number;
  created_at: number;
  author: IPostAuthor;
  is_upvoted: boolean;
  category: string;
  reported: boolean;
}

export interface IPostAuthor {
  id: number;
  is_top_rated: boolean;
  rating: number;
  own_reviews: number;
  avatar_thumbnail: string;
  username: string;
}

export interface IPsaPost extends IPost {
  text: string;
  description: string;
}

export interface IMemePost extends IPost {
  title?: string;
  image: string;
}

export interface IRepost extends IPost {
  url: string;
  category: string;
  isTweet: boolean;
  repost_type?: string;
  image_url?: string;
  title?: string;
}

export interface IArticlePost extends IPost {
  title: string;
  text?: string;
  image?: string;
  video_type?: string;
  description: string;
  video?: string;
  thumbnail?: string;
  video_id?: string;
}

export interface IPollPost extends IPost {
  question: string;
  choices: IChoice[];
  votes: number;
  result?: number;
}

export interface IChoice {
  id: number;
  choice_text: string;
  votes: number;
  is_voted?: boolean;
}
