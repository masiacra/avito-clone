import React, { Component } from "react";

import ContactCard from "./components/ContactCard";
import Header from "./components/Header";





class App extends Component {
	constructor() {
		super();
		this.state = {
			data: [],
			serverError: null,
			renderData: [],
			favorites: [],
			category: 'any',
			lowPrice: 0,
			highPrice: 9999999,
			isFavorites: false
		};
		this.clickHandlerForAddToFavorites = 
			this.clickHandlerForAddToFavorites.bind(this);
			
		this.changeHandler = this.changeHandler.bind(this);
		
		//this.clickHandlerForHeader = 
			//this.clickHandlerForHeader.bind(this);
	}
	
	//Обработчик изменения компонентов фильтрации
	changeHandler(evt) {
		const target = evt.target;
		const { name, value } = target;
		this.setState({
			[name]: value
		}, () => console.log(this.state));
	}
	
	//clickHandlerForHeader(evt) {
	  ////Функция валидация цены
	  //function validatePrice(price, value) {
		//if (isNaN(price)) return value;
		//price = Number(price);
		//if (price < 0) return 0;
		//if (price > 99999999) return 99999999;
		//return price;
	   //}
		
	   //evt.preventDefault();
	   //let lowPrice = this.state.lowPrice;
	   //let highPrice = this.state.highPrice;
		
	   //lowPrice = validatePrice(lowPrice, 0);
	   //highPrice = validatePrice(highPrice, 99999999);
	   //if (lowPrice > highPrice) lowPrice = highPrice - 1;
	   //this.setState({
	     //lowPrice: lowPrice,
		 //highPrice: highPrice
	   //}, () => {
	     //console.log(this.state)
	   //});
	//}
	
	componentDidMount() {
		//Функция получения данных сервера
		const getData = async () => {
			const resp1 = await fetch("https://avito.dump.academy/products");
			const products = await resp1.json();
			const resp2 = await fetch("https://avito.dump.academy/sellers");
			const sellers = await resp2.json();
			const productsData = products.data;
			const sellersData = sellers.data;
			const data = productsData.map( product => {
				const seller_id = product["relationships"]["seller"];
				const sellerInfo = {};
				sellersData.forEach(seller => {
					if (seller.id === seller_id) {
						sellerInfo.name = seller.name;
						sellerInfo.rating = seller.rating;
					}
				});
				const new_product = Object.assign({}, product, sellerInfo);
				return new_product;
			});
			return data;
		};
		//Используем ее при рендеринге
		getData()
			.then( data => {
				this.setState({
					data: data,
					renderData: data.slice(0)
				})
			})
			.catch( err => {
				console.error(err);
				this.setState({
					serverError: err
				});
			});
	}
	
	//Обработчик для компонента ContactCard.
	//Добавляем объявление в избранное
	clickHandlerForAddToFavorites(id) {
		const favorites = this.state.favorites.slice();
		if (!favorites.includes(id)) {
			favorites.push(id);
		} else {
			const index = favorites.indexOf(id);
			favorites.splice(index, 1);
		}
		this.setState({
			favorites: favorites
		}, () => console.log(this.state));
	}
	
	//Обработчик отображения избранных обяъвленний
	clickHandlerForDisplay = () => {
		this.setState( prevState => {
			return {
				isFavorites: !prevState.isFavorites
			};
		});
	}
	
	clickHandlerForPrices = (lowPrice, highPrice) => {
		console.log(lowPrice, highPrice);
		//this.setState({
			//lowPrice: lowPrice,
			//highPrice: highPrice
		//}, () => console.log(this.state));
	}
	
	
	render() {
		
		//Фабрика для создания компонента ContactCard
		const factory = item => (
		  <ContactCard 
		    item={item} 
			key={item.id} 
			phrase={
				this.state.favorites.includes(item.id) ? 
				'Убрать из избранного' : 
				'Добавить в избранное'
			}
			clickHandler={this.clickHandlerForAddToFavorites}
		  />
		);
		
		//Фильтрующая массив функция
		const filterFn = (criterion, lowPrice, highPrice, isFavorites, favorites) => obj => {
			if (obj["category"] === criterion || criterion === 'any') {
				if (obj["price"] >= lowPrice && obj["price"] <= highPrice) {
					if (isFavorites) {
						if (favorites.includes(obj["id"])) {
							return true;
						} else {
							return false;
						}
					}
					return true;
				}
			}
			return false;
		};
		
		const {
				category, 
				lowPrice, 
				highPrice, 
				isFavorites, 
				favorites
			} = this.state;
		const curryFilterFn = filterFn(
			category, 
			lowPrice, 
			highPrice, 
			isFavorites, 
			favorites
		);
		let body;
		if (this.state.renderData.length > 0) {
			const arr = this.state.renderData.filter(curryFilterFn);
			body = arr.map(factory);
		} else {
			body = 'Loading';
		}
		return (
			<div>
				<Header 
					lowPrice={this.state.lowPrice}
					highPrice={this.state.highPrice}
					clickHandlerForPrices={this.clickHandlerForPrices}
					changeHandler={this.changeHandler}
					clickHandlerForDisplay={this.clickHandlerForDisplay}
					phrase={
						this.state.isFavorites ? 
							'Вернуться' : 
							'Показать избранное'
					}
				/>
				<div>
					{body}
				</div>
			</div>
		);
	}
	
}


export default App;
