import {$host} from "./index";

export const fetchCart = async () => {
  const {data} = await $host.get('/cart');
  return data;
}

export const removeFromCart = async (id) => {
  const {data} = await $host.delete('/cart/' + id);
  return data;
}

export const addToCart = async (id) => {
  const {data} = await $host.post('/cart', {id});
  return data;
}

export const checkout = async () => {
    const {data} = await $host.get('/cart/checkout');
    return data;
}