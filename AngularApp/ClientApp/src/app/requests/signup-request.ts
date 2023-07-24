export interface SignupRequest {
  Username: string;
  Password: string;
  Avatar: string;
  Thumb: string;
  FullName: string;
  Email: string;
  Mobile: string;
  Address: string;
  Status: boolean;
  CreateTime: Date;
  AccountCategoryID: string;
}
