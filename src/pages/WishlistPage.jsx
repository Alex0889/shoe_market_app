import React, {useContext, useEffect} from "react";
import {remove, search, smileSad} from "../static";
import {Card, Info} from "../components";
import {AppContext} from "../context";
import {findItemFunc} from "../utils";
import {removeFromWishlist} from "../http/wishlistApi";
import {useHistory} from "react-router-dom";
import {refresh} from "../http/userApi";

const WishlistPage = ({
                        onChangeSearch,
                        onClearSearch,
                        searchValue,
                        onAddToCart
                      }) => {
  const {wishlistItems: items, setWishlistItems, setIsAuth, setUser} = useContext(AppContext);
  const history = useHistory();

  useEffect(() => {
    refresh().then(data => {
      setIsAuth(true);
      setUser(data);
    }).catch(e => {
      console.log('Error ' + e);
    });
  }, []);

  const onGoBack = () => {
    history.push('/');
  }

  const removeItemFromWishlist = (id) => {
    const findItem = findItemFunc(items, id);
    if (findItem) {
      removeFromWishlist(findItem._id)
        .then(data => setWishlistItems(prev => prev.filter(i => i._id !== data._id)));
    }
  }

  const wishlistItems = items
    .filter(item => item.name.toLowerCase().includes(searchValue))
    .map(item => (
      <Card key={item._id}
            onAddToCart={onAddToCart}
            removeFromWishlist={removeItemFromWishlist}
            inWishlist
            {...item}/>
    ));

  return (
    <div className="content">
      <div className="content__header">
        <h2>{searchValue ? `Search in wishlist: ${searchValue}` : "Wishlist"}</h2>
        <div className="search__block">
          <img width={16} height={16} src={search} alt="search"/>
          <input
            onChange={onChangeSearch}
            value={searchValue}
            type="text"
            placeholder="Search..."
          />
          <img
            onClick={onClearSearch}
            className="search__block_clear"
            src={remove}
            alt="clear search query"
          />
        </div>
      </div>
      {items.length !== 0 ? (
          <div className="list__items">
            {wishlistItems}
          </div>)
        : <div style={{height: '100%'}}>
          <div style={{height: '400px', width: '400px', display: 'block', margin: '0 auto'}}>
            <Info
              title="Wishlist is empty"
              description="Nothing was added to your wishlist"
              image={smileSad}
              callback={onGoBack}
            />
          </div>
        </div>}
    </div>
  );
};

export default WishlistPage;