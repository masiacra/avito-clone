import React from "react";



class Header extends React.Component {
  constructor() {
	super();
	this.in1 = React.createRef();
	this.inp2 = React.createRef();
  }
  
  clickHandler = (evt) => {
		
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
        <select
          name="category"
		  onChange={this.props.changeHandler}
	    >
          <option value='any'>
		    Выберите категорию
		  </option>
		  <option value='immovable'>
		    Недвижимость
		  </option>
		  <option value='cameras'>
		    Камеры
		  </option>
		  <option value='auto'>
		    Автомобили
		  </option>
		  <option value='laptops'>
		    Ноутбуки
		  </option>
	    </select>
	    <br />
	    <input 
	      type="number"
		  defaultValue={this.props.lowPrice}
		  name="lowPrice"
		  ref={this.inp1}
	    />
	    <input 
	      type="number"
		  defaultValue={this.props.highPrice}
		  name="highPrice"
		  ref={this.inp2}
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
