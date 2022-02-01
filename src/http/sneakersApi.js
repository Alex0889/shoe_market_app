import {$host} from "./index";

export const fetchSneakers = async () => {
  const {data} = await $host.get('/items');
  return data;
}