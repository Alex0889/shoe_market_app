import React, {useContext} from 'react';
import {useHistory} from 'react-router-dom';
import s from './UserModal.module.scss';
import {Link} from "react-router-dom";
import {Icon} from "../index";
import {AppContext} from "../../context";
import {logout} from "../../http/userApi";

const UserModal = () => {
  const {setIsOpenUserModal, user, setIsAuth, setUser, setCartItems, setWishlistItems} = useContext(AppContext);
  console.log('user', user)
  const history = useHistory();

  const onModalClose = () => {
    setIsOpenUserModal(false);
  }

  const onLogout = async () => {
    const status = await logout();
    if (status === 200) {
      setIsOpenUserModal(false);
      setUser(null);
      setIsAuth(false);
      setCartItems([]);
      setWishlistItems([]);
      history.push('/');
    }
  }

  return (
    <div className={s.userModal}>
      <span onClick={onModalClose} className={s.icon}><Icon icon="clear" size={20}/></span>
      <h3>{user.name}</h3>
      <ul>
        <li><Link to={'/orders'}>My orders</Link></li>
        <li><span onClick={onLogout}>Logout</span></li>
      </ul>
    </div>
  );
};

export default UserModal;