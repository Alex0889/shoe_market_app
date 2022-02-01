import React, {useContext, useState} from 'react';
import {useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';

import {Icon} from "../index";
import s from './AuthFormModal.module.scss';

import {AppContext} from "../../context";
import {loginValidationScheme, registrationValidationScheme} from "../../utils/validationSchema";
import {login, registration} from "../../http/userApi";

const defaultValues = {
  email: '',
  password: '',
  name: ''
}

const AuthFormModal = () => {
    const [isLogin, setIsLogin] = useState(false);
    const {setIsAuth, setIsOpenAuthModal, setUser, setWishlistItems, setCartItems} = useContext(AppContext);

    const {register, setError, reset, clearErrors, formState: {errors}, handleSubmit} = useForm({
      resolver: yupResolver(isLogin ? loginValidationScheme : registrationValidationScheme),
      reValidateMode: "onBlur",
      defaultValues
    });

    const onModalClose = () => {
      setIsOpenAuthModal(false);
    }

    const onChangeIsLogin = () => {
      setIsLogin(!isLogin);
      reset();
    }

    const onSubmit = async (data) => {
      try {
        let userLogged = null;

        if (isLogin) {
          let {user, cart = null, wishlist = null} = await login(data.email, data.password);
          userLogged = user;
          if (cart) {
            setCartItems(cart);
          }
          if (wishlist) {
            setWishlistItems(wishlist);
          }
        } else {
          userLogged = await registration(data.email, data.password, data.name);
        }
        clearErrors();
        reset();
        setUser(userLogged);
        setIsAuth(true);
        setIsOpenAuthModal(false);
      } catch (e) {
        const {errors, message} = e.response.data;
        if (errors.length !== 0) {
          errors.forEach(err => {
            setError(err.param, {
              type: "server",
              message: err.msg,
            });
          })
        } else {
          ['email', 'password'].forEach(err => {
            setError(err, {
              type: "server",
              message,
            });
          });
        }
      }
    }

    const onError = (errors, e) => console.log(errors, e);

    return (
      <div className={s.authFormModal}>
        <span onClick={onModalClose} className={s.icon}><Icon icon="clear" size={20}/></span>
        <h3>{isLogin ? "Login" : "Registration"}</h3>
        <form className={s.form} onSubmit={handleSubmit(onSubmit, onError)} noValidate={true}>
          <label className={errors.email && `${s.error}`}>
            <span>Email:</span>
            <input type="email"
                   placeholder="Email"
                   {...register('email')}
            />
            {errors.email && <span className={s.errorSpan}>{errors.email.message}</span>}
          </label>
          <label className={errors.password && `${s.error}`}>
            <span>Password:</span>
            <input type="password"
                   placeholder="Password"
                   {...register('password')}
            />
            {errors.password && <span className={s.errorSpan}>{errors.password.message}</span>}
          </label>

          {!isLogin ?
            <label className={errors.name && `${s.error}`}>
              <span>Name:</span>
              <input type="text"
                     placeholder="Name"
                     {...register('name')}
              />
              {errors.name && <span className={s.errorSpan}>{errors.name.message}</span>}
            </label>
            : null
          }

          <button className={s.btn} type="submit">{isLogin ? "Login" : "Registration"}</button>
          <p>or <span onClick={onChangeIsLogin}><b>{!isLogin ? "Login" : "Registration"}</b></span></p>
        </form>
      </div>
    );
  }
;

export default AuthFormModal;