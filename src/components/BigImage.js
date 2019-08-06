import React from "react";


function BigImage(props) {
	return (
		<div className="fixed hidden" id="bigImage">
			<img
				src={props.src}
				alt={props.title}
			/>
		</div>		
	);
}
