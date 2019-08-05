import React from "react";

import PriceComponent from "./PriceComponent";

function ContactCard(props) {
  return (
    <div className="contact_card">
      <h2>{props.item.title}</h2>
      <img
        src={props.item.pictures[0]}
        alt="some"
      />
      <div>
        <p>
          Дополнительно фотографий: {props.item.pictures.length - 1}
        </p>
        <PriceComponent price={props.item.price} />
        <p>Продавец: {props.item.name}</p>
        <p>Рейтинг: {props.item.rating}</p>
      </div>
      <button 
        onClick={() => {
          props.clickHandler(props.item.id);
        }}
        className="btn"
       >
         {props.phrase}
       </button>
    </div>
  );
	
}


export default ContactCard;


