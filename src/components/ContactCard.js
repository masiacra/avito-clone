import React from "react";



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
      <Price price={props.item.price} />
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


function Price(props) {
	const { price } = props;
	if (!price) return <h2>Цена договорная</h2>
	let priceStr = price.toString();
	if (priceStr.length % 3 !== 0) {
		priceStr = '  ' + priceStr;
	}
	const priceArr = [];
	for (let i = 0; i < priceStr.length; i += 3) {
		priceArr.push(priceStr.slice(i, i+3));
	}
	priceArr[0] = priceArr[0].replace(/\s/g, '');
	const res = priceArr.join(' ');
	return (
		<h2>Цена: { res } руб</h2>
	);
}
