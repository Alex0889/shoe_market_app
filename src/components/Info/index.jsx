import React from 'react';
import s from "./Info.module.scss";
import {arrowLeft} from "../../static";

const Info = ({title, description, image, callback}) => {
  return (
    <div className={s.info}>
      <img src={image} alt={title} width={120}/>
      <h2>{title}</h2>
      <p>{description}</p>
      <button onClick={callback} className={s.btn}>
        <img src={arrowLeft} alt="arrow"/>
        Go back
      </button>
    </div>
  );
};

export default Info;