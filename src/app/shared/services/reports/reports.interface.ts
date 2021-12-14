export interface IReportsParams {
  user?: number;
  post?: number;
  reply?: number;
  review?: number;
}

export interface IReport {
  id: number;
  post?: number;
  reply?: number;
  review?: number;
}
