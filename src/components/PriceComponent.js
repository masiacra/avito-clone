import React from "react";

//Компонент Price
function PriceComponent(props) {
	//Функция приведения цены к необходимому формату
	function transformPrice(price) {
		const priceStr = price.toString();
		const k = priceStr.length % 3;
		const res = [];
		if (k !== 0) res.push(priceStr.slice(0, k));
		for (let i = k; i < priceStr.length; i += 3) {
			res.push(priceStr.slice(i, i+3));
		}
		return res.join(' ');
	}
	//Тело функционального компонента
	const { price } = props;
	if (!price) return <p>Цена договорная</p>
	const res = transformPrice(price);
	return (
		<p>Цена: { res } руб</p>
	);
}


export default PriceComponent;
