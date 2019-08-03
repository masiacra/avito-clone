import React from "react";

import SelectComponent from "./SelectComponent";



class Header extends React.Component {
	
  constructor() {
	super();
	this.inpLow = React.createRef();
	this.inpHigh = React.createRef();
  }
  
  clickHandler = (evt) => {
	  
	//Вспомогательная функция валидации цены
	const validatePrice = price => {
		price = Number(price);
		if (price < 0) return 0;
		if (price > 9999999) return 9999999;
		return price;
	};
	
	
	evt.preventDefault();
	const target = evt.target;
	const parent = target.parentNode;
	const lowPrice = parent.querySelector('input[name="lowPrice"]');
	const lowPriceValue = lowPrice.value;
    const highPrice = parent.querySelector('input[name="highPrice"]')
    const highPriceValue = highPrice.value;
    
    let validLowPrice = validatePrice(lowPriceValue);
    const validHighPrice = validatePrice(highPriceValue);
    if (validLowPrice > validHighPrice) {
		validLowPrice = validHighPrice - 1;
	}
    this.props.clickHandlerForPrices(validLowPrice, validHighPrice);
  }
  
  render() {
    return (
      <header>
        <SelectComponent changeHandler={this.props.changeHandler} />

	    <br />
	    
	    <input 
	      type="number"
		  defaultValue={this.props.lowPrice}
		  name="lowPrice"
		  ref={this.inpLow}
	    />
	    
	    <input 
	      type="number"
		  defaultValue={this.props.highPrice}
		  name="highPrice"
		  ref={this.inpHigh}
	    />
	    
	    <button onClick={this.clickHandler}>
	     Фильтровать по цене
	    </button>
	    
	    <button onClick={this.props.clickHandlerForDisplay}>
          {this.props.phrase}
	    </button>
	    
      </header>
    );
  }
}





export default Header;
