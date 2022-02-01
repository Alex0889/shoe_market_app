import {$host} from "./index";

export const fetchWishlist = async () => {
  const {data} = await $host.get('/wishlist');
  return data;
}

export const addToWishlist = async (id) => {
  const {data} = await $host.post('/wishlist', {id});
  return data;
}

export const removeFromWishlist = async (id) => {
  const {data} = await $host.delete('/wishlist/' + id);
  return data;
}