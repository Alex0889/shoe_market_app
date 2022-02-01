import React, {useContext, useEffect, useState} from 'react';
import {Card} from "../components";
import {AppContext} from "../context";

const OrderPage = () => {
  const [orders, setOrders] = useState();
  const [isLoading, setIsLoading] = useState(true);

  const {setIsOpenUserModal} = useContext(AppContext);

  useEffect(() => {
    setIsOpenUserModal(false)
    // fetchHelper(api.orders, 'GET').then(data => {
    //   setOrders(data.reduce((prev, obj) => [...prev, ...obj.items], []));
    //   setIsLoading(false);
    // });
  }, [setIsOpenUserModal]);

  return (
    <div className="content">
      <div className="content__header">
        <h2>My orders</h2>
      </div>
      <div className="list__items">
        {(isLoading ? [...Array(8)] : orders).map((order, idx) => {
          return (
            <Card key={idx} isLoading={isLoading} {...order} />
          )
        })}
      </div>
    </div>
  );
};

export default OrderPage;