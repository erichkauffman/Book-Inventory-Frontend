import React from 'react';

const covers = ['Hard', 'Soft'];
const conditions = ['New', 'Like New', 'Very Good', 'Good', 'Acceptable'];
const sites = ['Amazon', 'EBay'];
const consign = ['no', 'yes'];

const displaySites = (siteNums) => {
	let siteString = siteNums.map((siteNum) => {
		return sites[siteNum];
	}).join(', ');
	if(siteString === ''){
		return 'None';
	}
	return siteString;
}

const getBookAndUPCDetail = (item, type) => {
	let detailArray = [];
	if(type === 'books'){
		detailArray.push(<p key='a'>Author: {item.author}</p>)
		detailArray.push(<p key='i'>ISBN: {item.upc}</p>)
		detailArray.push(<p key='e'>Edition: {item.edition}</p>)
		detailArray.push(<p key='p'>Printing: {item.printing}</p>)
		detailArray.push(<p key='c'>Cover: {covers[item.cover]}</p>)
		return detailArray;
	}else{
		return(<p>UPC: {item.upc}</p>);
	}
}

const ItemDetail = (props) => {
	let item = props.item;
	if(item){
		return(
			<div>
				<p>Id: {item.itemId}</p>
				<p>Title: {item.title}</p>
				{getBookAndUPCDetail(props.item, props.type)}
				<p>Condition: {conditions[item.condition]}</p>
				<p>Sell Price: {(item.sellPrice/100).toFixed(2)}</p>
				<p>Site Listed: {displaySites(item.siteListed)}</p>
				<p>Shelf Location: {item.shelfLocation}</p>
				<p>Description: {item.description}</p>
				<p>Amount Paid: {(item.amountPaid/100).toFixed(2)}</p>
				<p>Date Purchased: {item.datePurchased}</p>
				<p>Location Purchased: {item.locationPurchased}</p>
				<p>Consignment: {consign[item.consignment]}</p>
			</div>
		);
	}
	return null;
}

export default ItemDetail;
