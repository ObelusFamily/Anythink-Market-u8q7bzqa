import React from "react";
import { Link } from "react-router-dom";
import agent from "../agent";
import { connect } from "react-redux";
import { ITEM_FAVORITED, ITEM_UNFAVORITED } from "../constants/actionTypes";

const mapDispatchToProps = (dispatch) => ({
  favorite: (slug) =>
    dispatch({
      type: ITEM_FAVORITED,
      payload: agent.Items.favorite(slug),
    }),
  unfavorite: (slug) =>
    dispatch({
      type: ITEM_UNFAVORITED,
      payload: agent.Items.unfavorite(slug),
    }),
});

const ItemPreview = (props) => {
  const item = props.item;

  const handleClick = (ev) => {
    ev.preventDefault();
    if (item.favorited) {
      props.unfavorite(item.slug);
    } else {
      props.favorite(item.slug);
    }
  };

  return (
    <div
      className="card bg-dark border-light p-3"
      style={{ borderRadius: "20px" }}
      id={`item_${item.slug}`}
    >
      <img
        alt="item"
        src={item.image}
        className="card-img-top item-img"
        style={{ borderRadius: "20px" }}
      />
      <div className="card-body">
        <Link to={`/item/${item.slug}`} className="text-white">
          <h3 className="card-title">{item.title}</h3>
          <p className="card-text crop-text-3">{item.description}</p>
        </Link>
        <div className="d-flex flex-row align-items-center pt-2 item-footer">
          <div className="d-flex flex-grow-1">
            <Link to={`/@${item.seller.username}`} className="">
              <img
                src={item.seller.image}
                alt={item.seller.username}
                className="user-pic rounded-circle pr-1"
              />
            </Link>

            {item.seller.isVerified ??
              <div className="d-flex align-items-center">
                
                <img 
                  src="/verified_seller.svg"
                  alt="verified seller"
                  width={20}
                />
                <p 
                  style={{ fontSize: '1.3rem'}}
                  className="m-0"
                >TOP SELLER</p>
              </div>
          }
            
          </div>
          <button className="btn btn-outline-secondary" onClick={handleClick}>
            <i className="ion-heart"></i> {item.favoritesCount}
          </button>
        </div>
      </div>
    </div>
  );
};

export default connect(() => ({}), mapDispatchToProps)(ItemPreview);
