/* eslint-disable prettier/prettier */
export interface IZohoResponse {
  access_token: string;
  refresh_token?: string;
  scope: string;
  api_domain: string;
  token_type: string;
  expires_in: number;
}
