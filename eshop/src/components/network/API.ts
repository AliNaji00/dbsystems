import axios, { AxiosResponse } from "axios";
import {
  GetProductsResponse,
  LoginFormInputs,
  LoginResponse,
} from "./APITypes";

export const STATUS_CODE_UNAUTHORIZED = 401;
export const STATUS_CODE_BAD_REQUEST = 400;
export const STATUS_CODE_NOT_ALLOWED = 403;

const PORT = 8080;

const prefix = (url: string) => `http://localhost:${PORT}/api` + url;

export const API = {
  async login(data: LoginFormInputs): Promise<AxiosResponse<LoginResponse>> {
    try {
      const response = await axios.post<LoginResponse>(prefix("/user/login"), {
        email: data.email,
        password: data.password,
      });
      return response;
    } catch (err) {
      throw err;
    }
  },

  async getProducts(
    search_keyword: string
  ): Promise<AxiosResponse<GetProductsResponse>> {
    try {
      const response = await axios.get<GetProductsResponse>(
        prefix("/products"),
        {
          params: {
            keyword: search_keyword,
          },
        }
      );
      return response;
    } catch (err) {
      throw err;
    }
  },

  async getBasket(
    user_id: string
  ): Promise<AxiosResponse<GetProductsResponse>> {
    try {
      const response = await axios.get<GetProductsResponse>(
        prefix(`/basket/${user_id}`)
      );
      return response;
    } catch (err) {
      throw err;
    }
  },
};
