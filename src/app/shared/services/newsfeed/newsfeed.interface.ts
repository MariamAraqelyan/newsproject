import { IGeneralPost } from 'src/app/shared/services/posts';

export interface INewsfeedParams {
  order_by?: string;
  page: number;
  page_size: number;
  category?: string;
}

export interface INewsfeedParamsByFilter {
  order_by: string;
  page: number;
  page_size: number;
  category?: any;
}

export interface INewsfeedResponse {
  count: number;
  next: string;
  previous: string;
  results: IGeneralPost[];
}
