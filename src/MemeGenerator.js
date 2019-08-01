import React from "react";

class MemeGenerator extends React.Component {
	constructor() {
		super();
		this.state = {
			topText: '',
			bottomText: '',
			randomImage: "http://i.imgflip.com/1bij.jpg",
			allMemeImgs: []
		};
	}
	
	componentDidMount() {
		fetch("https://api.imgflip.com/get_memes")
			.then(response => response.json())
			.then(response => this.setState({
				allMemeImgs: response.data.memes
			}));
	}
	
	changeHandler = (evt) => {
		const target = evt.target;
		const {name, value} = target;
		this.setState({
			[name]: value
		});
	}
	
	clickHandler = (evt) => {
		evt.preventDefault();
		const randomNum = Math.floor(Math.random() * (this.state.allMemeImgs.length + 1));
		const randomImage = this.state.allMemeImgs[randomNum];
		const urlOfRandomImg = randomImage["url"];
		this.setState({
			randomImage: urlOfRandomImg
		});
	}
	
	render() {
		return (
			<main>
				<form className="meme-form">
					<input 
						type="text"
						name="topText"
						onChange={this.changeHandler}
						value={this.state.topText}
						placeholder="Top text"
					/>
					<input 
						type="text"
						name="bottomText"
						onChange={this.changeHandler}
						value={this.state.bottomText}
						placeholder="Bottom text"
					/>
					<button onClick={this.clickHandler}>Gen</button>
				</form>
				<div className="meme">
					<img
						align="center"
						src={this.state.randomImage}
						alt="random"
					/>
					<h2 className="top">{this.state.topText}</h2>
					<h2 className="bottom">{this.state.bottomText}</h2>
				</div>
			</main>
		);
	}
}


export default MemeGenerator;
