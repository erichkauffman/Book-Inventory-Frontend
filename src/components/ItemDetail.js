import React from 'react';

const getBookAndUPCDetail = (item) => {
	let detailArray = [];
	if(item['py/object'] === 'data.Book.Book'){
		detailArray.push(<p key='a'>Author: {item.author}</p>)
		detailArray.push(<p key='i'>ISBN: {item.item.upc}</p>)
		detailArray.push(<p key='e'>Edition: {item.edition}</p>)
		detailArray.push(<p key='p'>Printing: {item.printing}</p>)
		detailArray.push(<p key='c'>Cover: {item.cover}</p>)
		return detailArray;
	}else{
		return(<p>UPC: {item.upc}</p>);
	}
}

const ItemDetail = (props) => {
	let item = props.item;
	if(item.item){
		item = item.item;
	}
	return(
		<div>
			<p>Id: {item.itemId}</p>
			<p>Title: {item.title}</p>
			{getBookAndUPCDetail(props.item)}
			<p>Condition: {item.condition}</p>
			<p>Sell Price: {item.sellPrice}</p>
			<p>Site Listed: {item.siteListed}</p>
			<p>Shelf Location: {item.shelfLocation}</p>
			<p>Description: {item.description}</p>
			<p>Amount Paid: {item.amountPaid}</p>
			<p>Date Purchased: {item.datePurchased}</p>
			<p>Location Purchased: {item.locationPurchased}</p>
			<p>Consignment: {item.consignment}</p>
		</div>
	);
}

export default ItemDetail;
