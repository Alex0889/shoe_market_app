import {$host} from "./index";
// import jwtDecode from "jwt-decode";

export const registration = async (email, password, name) => {
  const {data} = await $host.post('user/registration', {email, password, name});
  localStorage.setItem('user', data);
  return data;
}

export const login = async (email, password) => {
  const {data} = await $host.post('user/login', {email, password});
  localStorage.setItem('user', data.user);
  return data;
}

export const refresh = async () => {
  const {data} = await $host.get('user/refresh');
  localStorage.setItem('user', data);
  return data;
}

export const logout = async () => {
  const {status} = await $host.get('user/logout');
  localStorage.removeItem('user');
  return status;
}
