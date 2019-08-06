import React from "react";


function BigImage(props) {
	const className= props.isHidden ? 'fixed hidden' : 'fixed';
	return (
		<div className={className}>
			<img
				src={props.src}
				alt={props.title}
			/>
		</div>		
	);
}

export default BigImage;
