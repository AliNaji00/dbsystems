import axios, { AxiosResponse } from "axios";
import {
  GetProductsResponse,
  LoginFormInputs,
  LoginResponse,
} from "./APITypes";

export const STATUS_CODE_UNAUTHORIZED = 401;
export const STATUS_CODE_BAD_REQUEST = 400;
export const STATUS_CODE_NOT_ALLOWED = 403;

const prefix = (url: string) => "http://localhost" + url;

export const API = {
  async login(data: LoginFormInputs): Promise<AxiosResponse<LoginResponse>> {
    const formData = new FormData();
    formData.append("email", data.email);
    formData.append("password", data.password);
    formData.append("request", "login");
    try {
      const response = await axios.post<LoginResponse>(
        prefix("/php/login.php"),
        formData
      );
      return response;
    } catch (err) {
      throw err;
    }
  },

  async getProducts(
    keyword: string
  ): Promise<AxiosResponse<GetProductsResponse>> {
    console.log(keyword);

    const formData = new FormData();
    formData.append("category", "all");
    formData.append("request", "getproductdata");
    try {
      const response = await axios.post<GetProductsResponse>(
        prefix("/php/home.php"),
        formData
      );
      return response;
    } catch (err) {
      throw err;
    }
  },
};