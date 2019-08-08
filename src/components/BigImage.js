import React from "react";


function BigImage(props) {
	const className= props.isHidden ? 'big_image hidden' : 'big_image';
	return (
		<div className={className}>
		  <div className="big_image__wrapper">
		  <img
			src={props.src}
			alt={props.title}
			className="big_image__img"
		   />
		   <div 
			  className="big_image__closing_btn"
			  onClick={props.clickHandlerForClosing}
			>
			  x
			</div>
		  </div>
		</div>		
	);
}

export default BigImage;
