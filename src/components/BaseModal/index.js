import React from 'react';
import s from './BaseModal.module.scss'

const BaseModal = ({children, callback}) => {
  return (
    <div className={s.modal} onClick={callback}>
      <div className={s.modal__content} onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </div>
  );
};

export default BaseModal;