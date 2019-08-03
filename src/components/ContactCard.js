import React from "react";

import PriceComponent from "./PriceComponent";

function ContactCard(props) {
  return (
    <div>
      <h2>{props.item.title}</h2>
      <img
        src={props.item.pictures[0]}
        alt="some"
      />
      <h2>
        Дополнительно фотографий: {props.item.pictures.length - 1}
      </h2>
      <PriceComponent price={props.item.price} />
      <h2>Продавец: {props.item.name}</h2>
      <h2>Рейтинг: {props.item.rating}</h2>
      <button 
        onClick={() => {
          props.clickHandler(props.item.id);
        }}
       >
         {props.phrase}
       </button>
    </div>
  );
	
}


export default ContactCard;


