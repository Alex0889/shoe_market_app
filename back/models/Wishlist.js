class Wishlist {
  constructor(oldWishlist) {
    this.items = oldWishlist || {};
  }

  addToWishlist(item, id) {
    if (!this.items[id]) {
      this.items[id] = item;
      return item;
    }
    return null;
  }

  removeFromWishlist(id) {
    if (Object.keys(this.items).includes(id)) {
      const item = this.items[id];
      delete this.items[id];
      return item;
    }
    return null;
  }
}

module.exports = Wishlist;