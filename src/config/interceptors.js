import axios from "axios";
import { SHOWROOM_API, USER_API, AUTH_API, HISTORY_API } from "@env";

export const apiShowroom = axios.create({
  baseURL: SHOWROOM_API
});

export const apiUser = axios.create({
  baseURL: USER_API
});

export const apiAuth = axios.create({
  baseURL: AUTH_API
});

export const apiHistory = axios.create({
  baseURL: HISTORY_API
});