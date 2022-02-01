export const findItemFunc = (arr, item) => arr.find(i => i._id === item);

export const isItemAdded = (arr, id) => {
  return arr.some(item => item._id === id);
}