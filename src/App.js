import React, {useCallback, useEffect, useState} from 'react';
import './App.scss';
import {Route, Switch, Redirect} from 'react-router-dom';
import {Header, Drawer, BaseModal, AuthFormModal, UserModal} from "./components";
import {WishlistPage, HomePage, OrderPage} from "./pages";
import {AppContext} from "./context";
import {findItemFunc, isItemAdded} from "./utils";
import {fetchSneakers} from "./http/sneakersApi";
import {addToCart, fetchCart, removeFromCart} from "./http/cartApi";
import {addToWishlist, fetchWishlist, removeFromWishlist} from "./http/wishlistApi";
import {refresh} from "./http/userApi";

const App = () => {
  const [items, setItems] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpened, setIsCartOpened] = useState(false);
  const [wishlistItems, setWishlistItems] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isAuth, setIsAuth] = useState(false);
  const [isOpenAuthModal, setIsOpenAuthModal] = useState(false);
  const [isOpenUserModal, setIsOpenUserModal] = useState(false);
  const [user, setUser] = useState(null);


  useEffect(() => {
    console.log('app')
    if (!isAuth) {
      refresh().then(data => {
        setIsAuth(true);
        setUser(data);
      }).catch(e => {
        console.log('Error ' + e);
      });
    }
    fetchSneakers().then(data => {
      setItems(data);
    }).then(() => {
      fetchCart().then(data => {
        console.log('app cart', data);
        setCartItems(data)
      }).catch(e => {
        console.log('Error ' + e);
      });
    })
      .then(() => {
        fetchWishlist().then((data) => {
          setWishlistItems(data);
          setIsLoading(false);
        }).catch(e => {
          console.log('Error ' + e);
        });
      })
      .catch(e => {
        console.log('Error ' + e);
      });
  }, []);

  const onAddToCart = (id) => {
    const findItem = findItemFunc(cartItems, id);

    if (findItem) {
      setCartItems(prev => prev.filter(i => i._id !== id));
      onRemoveFromCart(findItem._id);
    } else {
      addToCart(id)
        .then(data => {
          setCartItems(prev => [...prev, data])
        })
    }
  }

  const onRemoveFromCart = (id) => {
    const filter = cartItems.filter(i => i._id === id).length;
    if (filter) {
      removeFromCart(id)
        .then(data => {
          if (data) {
            setCartItems(prev => prev.filter(i => i._id !== data._id))
          } else {
            setUser(null);
            setIsAuth(false);
            setIsOpenAuthModal(true);
          }
        });
    }
  };

  const onToggleWishlist = (id) => {
    const findItem = findItemFunc(wishlistItems, id);
    if (findItem) {
      removeFromWishlist(findItem._id)
        .then(data => {
          if (data) {
            setWishlistItems(prev => prev.filter(i => i._id !== data._id))
          } else {
            setUser(null);
            setIsAuth(false);
            setIsOpenAuthModal(true);
          }
        });
    } else {
      addToWishlist(id)
        .then(data => {
            setWishlistItems(prev => [...prev, data])
          }
        );
    }
  };


  const onChangeSearch = (e) => {
    setSearchValue(e.target.value.toLowerCase());
  }

  const onClearSearch = () => {
    setSearchValue('');
  }

  const isItemAddedToCart = (id) => {
    return isItemAdded(cartItems, id);
  }

  const isItemAddedToWishlist = (id) => {
    return isItemAdded(wishlistItems, id);
  }

  return (
    <AppContext.Provider value={{
      items,
      cartItems,
      wishlistItems,
      isItemAddedToCart,
      isItemAddedToWishlist,
      setIsCartOpened,
      setCartItems,
      setWishlistItems,
      setIsAuth,
      setIsOpenAuthModal,
      setIsOpenUserModal,
      user,
      setUser,
    }}>
      <div className="App">
        <div className="wrapper">

          {isOpenAuthModal || isOpenUserModal ?
            (
              <BaseModal callback={isAuth ? () => setIsOpenUserModal(false) : () => setIsOpenAuthModal(false)}>
                {isOpenAuthModal ? <AuthFormModal/> : <UserModal/>}
              </BaseModal>
            ) : null}

          <Drawer items={cartItems}
                  onRemoveFromCart={onRemoveFromCart}
                  isCartOpened={isCartOpened}
          />
          <Header onOpenCart={useCallback(() => setIsCartOpened(true), [setIsCartOpened])}
                  onOpenAuthModal={useCallback(() => setIsOpenAuthModal(true), [setIsOpenAuthModal])}
                  onOpenUserModal={useCallback(() => setIsOpenUserModal(true), [setIsOpenUserModal])}
                  isAuth={isAuth}
          />
          <Switch>
            <Route path={'/wishlist'} exact>
              <WishlistPage
                onChangeSearch={onChangeSearch}
                onClearSearch={onClearSearch}
                searchValue={searchValue}
                onAddToCart={onAddToCart}
                onToggleWishlist={onToggleWishlist}
              />
            </Route>
            <Route path={'/'} exact>
              <HomePage
                items={items}
                onAddToCart={onAddToCart}
                onChangeSearch={onChangeSearch}
                onClearSearch={onClearSearch}
                onToggleWishlist={onToggleWishlist}
                searchValue={searchValue}
                addedToCart={cartItems}
                isLoading={isLoading}
              />
            </Route>
            <Route path={'/orders'} exact>
              <OrderPage/>
            </Route>
            <Redirect to="/"/>
          </Switch>
        </div>
      </div>
    </AppContext.Provider>
  );
}

export default App;
