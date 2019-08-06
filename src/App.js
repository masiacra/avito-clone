import React, { Component } from "react";

//Импортируем компоненты
import ContactCard from "./components/ContactCard";
import Header from "./components/Header";
import Footer from "./components/Footer";


import BigImage from "./components/BigImage.js";



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
			isFavorites: false,
			isHidden: true,
			bigImage: null,
			title: null
		};
	}
	
	//Обработчик клика по фотографии
	clickHandlerForImg = (id) => {
		const numId = parseInt(id);
		const product = this.state.data[id];
		const {pictures, title} = product;
		this.setState({
			isHidden: false,
			bigImage: pictures[0],
			title: title
		});
	}
	
	//Обработчик изменения компонентов фильтрации
	changeHandler = (evt) => {
		const target = evt.target;
		const { name, value } = target;
		this.setState({
			[name]: value
		}, () => console.log(this.state));
	}
	
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
				//проверим localStorage на наличие избранных объявлений
				const jsonFavorites = localStorage.getItem('favorites');
				const favorites = jsonFavorites ? 
					JSON.parse(jsonFavorites) 
					: [];
				this.setState({
					data: data,
					renderData: data.slice(0),
					favorites: favorites
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
	clickHandlerForAddToFavorites =(id) => {
		const favorites = this.state.favorites.slice();
		if (!favorites.includes(id)) {
			favorites.push(id);
		} else {
			const index = favorites.indexOf(id);
			favorites.splice(index, 1);
		}
		this.setState({
			favorites: favorites
		}, () => {
			const jsonFavorites = JSON.stringify(favorites);
			localStorage.setItem('favorites', jsonFavorites);
		});
	}
	
	//Обработчик отображения избранных обяъвленний
	clickHandlerForDisplay = () => {
		this.setState( prevState => {
			return {
				isFavorites: !prevState.isFavorites
			};
		});
	}
	
	//Обработчик для обработки клика по кнопке фильтрации цены
	clickHandlerForPrices = (evt) => {
		//Валидация цены
		const validatePrice = price => {
			price = Number(price);
			if (price < 0) return 0;
			if (price > 9999999) return 9999999;
			return price;
		};
		//Тело метода
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
		this.setState({
			lowPrice: validLowPrice, 
			highPrice: validHighPrice
		});
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
			clickHandlerForImg={this.clickHandlerForImg}
		  />
		);
		
		//Фильтрующая массив функция
		const filterFn = (
			criterion, 
			lowPrice, 
			highPrice, 
			isFavorites, 
			favorites
		) => obj => {
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
			<div className="container">
				<Header 
					lowPrice={lowPrice}
					highPrice={highPrice}
					clickHandlerForPrices={this.clickHandlerForPrices}
					changeHandler={this.changeHandler}
					clickHandlerForDisplay={this.clickHandlerForDisplay}
					phrase={
						isFavorites ? 
							'Вернуться' : 
							'Показать избранное'
					}
				/>
				<main>
					{body}
				</main>
				<BigImage 
					isHidden={this.state.isHidden}
					src={this.state.bigImage}
					title={this.state.title}
				/>
				<Footer />
			</div>
		);
	}
	
}


export default App;
