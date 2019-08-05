import React from "react";

import SelectComponent from "./SelectComponent";



class Header extends React.Component {
	
  constructor() {
	super();
	this.inpLow = React.createRef();
	this.inpHigh = React.createRef();
  }
  
  render() {
    return (
      <header>
        <h1>Avito</h1>
        <SelectComponent changeHandler={this.props.changeHandler} />
	    <input 
		  key={new Date().getMilliseconds() + 1}
	      type="number"
		  defaultValue={this.props.lowPrice}
		  name="lowPrice"
		  ref={this.inpLow}
	    />
	    
	    <input 
		  key={new Date().getMilliseconds() + 2}
	      type="number"
		  defaultValue={this.props.highPrice}
		  name="highPrice"
		  ref={this.inpHigh}
	    />
	    
	    <button 
			onClick={this.props.clickHandlerForPrices}
			className="btn"
		>
	     Фильтровать по цене
	    </button>
	    
	    <button 
			onClick={this.props.clickHandlerForDisplay}
			className="btn"
	    >
          {this.props.phrase}
	    </button>
	    
      </header>
    );
  }
}






export default Header;
