import React from "react";

import SelectComponent from "./SelectComponent";


function HeaderComponent(props) {
	return (
      <header>
        <SelectComponent changeHandler={props.changeHandler} />
	    
	    <br />
	    
	    <input 
	      type="number"
		  defaultValue={props.lowPrice}
		  name="lowPrice"
		  ref={props.inpLow}
	    />
	    
	    <input 
	      type="number"
		  defaultValue={props.highPrice}
		  name="highPrice"
		  ref={props.inpHigh}
	    />
	    
	    <button onClick={props.clickHandler}>
	     Фильтровать по цене
	    </button>
	    
	    <button onClick={props.clickHandlerForDisplay}>
          {props.phrase}
	    </button>
	    
      </header>
    );
}
