import axios, { AxiosResponse } from "axios";
import {
  IGetProductsResponse,
  ILoginFormInputs,
  ILoginResponse,
  IPutShoppingCartResponse,
  IGetBasketResponse,
  IGetProductsRequest,
  IGetSingleProductResponse,
  IGetSingleProductRequest,
  IGetUserResponse,
  IPutUserRequest,
  IPutUserResponse,
} from "./APITypes";

export const STATUS_CODE_UNAUTHORIZED = 401;
export const STATUS_CODE_BAD_REQUEST = 400;
export const STATUS_CODE_NOT_ALLOWED = 403;

const PORT = 8080;

const prefix = (url: string) => `http://localhost:${PORT}/api` + url;

export const API = {
  async login(data: ILoginFormInputs): Promise<AxiosResponse<ILoginResponse>> {
    try {
      const response = await axios.post<ILoginResponse>(prefix("/user/login"), {
        email: data.email,
        password: data.password,
      });
      return response;
    } catch (err) {
      throw err;
    }
  },

  async getProducts(
    search_keyword: string,
    user_id: string
  ): Promise<AxiosResponse<IGetProductsResponse>> {
    try {
      const params: IGetProductsRequest = {
        user_id: user_id,
      };

      if (search_keyword) {
        params["keyword"] = search_keyword;
      }

      const response = await axios.get<IGetProductsResponse>(
        prefix("/products"),
        {
          params: params,
        }
      );
      return response;
    } catch (err) {
      throw err;
    }
  },

  async getProduct(
    product_id: string,
    user_id: string
  ): Promise<AxiosResponse<IGetSingleProductResponse>> {
    try {
      const params: IGetSingleProductRequest = {
        product_id: product_id,
        user_id: user_id,
      };

      const response = await axios.get<IGetSingleProductResponse>(
        prefix("/product"),
        {
          params: params,
        }
      );
      return response;
    } catch (err) {
      throw err;
    }
  },

  async getBasket(user_id: string): Promise<AxiosResponse<IGetBasketResponse>> {
    try {
      const response = await axios.get<IGetBasketResponse>(
        prefix(`/basket/${user_id}`)
      );
      return response;
    } catch (err) {
      throw err;
    }
  },

  async putBasket(
    user_id: string,
    product_id: number,
    quantity: number
  ): Promise<AxiosResponse<IPutShoppingCartResponse>> {
    try {
      const response = await axios.put<IPutShoppingCartResponse>(
        prefix(`/basket/${user_id}`),
        {
          product_id: product_id,
          quantity: quantity,
        }
      );
      return response;
    } catch (err) {
      throw err;
    }
  },

  async getUser(user_id?: string): Promise<AxiosResponse<IGetUserResponse>> {
    try {
      const response = await axios.get<IGetUserResponse>(
        prefix(`/users/${user_id}`)
      );
      return response;
    } catch (err) {
      throw err;
    }
  },

  async putUser(
    data: IPutUserRequest
  ): Promise<AxiosResponse<IPutUserResponse>> {
    try {
      const response = await axios.put<IPutUserResponse>(
        prefix(`/users/${data.user_id}`),
        {
          name: data.name,
          email: data.email,
          password: data.password,
          address: data.address,
          user_type: data.user_type,
        }
      );
      return response;
    } catch (err) {
      throw err;
    }
  },

  async postAvatar(user_id: string, file: File) {
    try {
      const formData = new FormData();
      formData.append("image", file);
      const response = await axios.post(
        prefix(`/users/${user_id}/avatar`),
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      return response;
    } catch (err) {
      throw err;
    }
  },
};
