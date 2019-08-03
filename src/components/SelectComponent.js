import React from "react";

//Компонент-представление Select
function SelectComponent(props) {
	return (
		<select
          name="category"
		  onChange={props.changeHandler}
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
	);
}

export default SelectComponent;
