import React, {memo} from "react";
import {remove, search} from "../static";
import {Card} from "../components";

const HomePage = ({
                    items,
                    onAddToCart,
                    onChangeSearch,
                    onClearSearch,
                    onToggleWishlist,
                    searchValue,
                    isLoading,
                  }) => {

  const renderItems = () => {
    const filteredItems = items.filter(item => item.name.toLowerCase().includes(searchValue));

    return (isLoading ? [...Array(8)] : filteredItems).map((item, idx) => (
      <Card key={idx}
            onToggleWishlist={onToggleWishlist}
            onAddToCart={onAddToCart}
            isLoading={isLoading}
            {...item}/>
    ))
  }

  return (
    <div className="content">
      <div className="content__header">
        <h2>{searchValue ? `Search: ${searchValue}` : "All sneakers"}</h2>
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
      <div className="list__items">
        {renderItems()}
      </div>
    </div>
  );
};

export default memo(HomePage);