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
          <span className="allocated">
            Дополнительно фотографий:
          </span> {props.item.pictures.length - 1}
        </p>
        <PriceComponent price={props.item.price} />
        <p><span className="allocated">Продавец:</span> {props.item.name}</p>
        <p><span className="allocated">Рейтинг:</span> {props.item.rating}</p>
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


