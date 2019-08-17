import React from 'react';
import { ISite, IItem, IBook } from '../../../data/types';
import { isBook } from '../../../lib/guards';

const covers = ['Hard', 'Soft'];
const conditions = ['New', 'Like New', 'Very Good', 'Good', 'Acceptable'];
const siteStrings = ['Amazon', 'EBay'];

const displaySites = (sites: ISite[]): string => {
	let siteString = sites.map((site: ISite) => {
		return `${siteStrings[site.site]}: ${site.siteId}`;
	}).join(', ');
	if(siteString === ''){
		return 'None';
	}
	return siteString;
}

const getBookAndUPCDetail = (item: IItem|IBook) => {
	let detailArray = [];
	if(isBook(item)){
		detailArray.push(<p key='a'>Author: {item.author}</p>)
		detailArray.push(<p key='i'>ISBN: {item.item.upc}</p>)
		detailArray.push(<p key='e'>Edition: {item.edition}</p>)
		detailArray.push(<p key='p'>Printing: {item.printing}</p>)
		detailArray.push(<p key='c'>Cover: {covers[item.cover]}</p>)
		return detailArray;
	}else{
		return(<p>UPC: {item.upc}</p>);
	}
}

const ItemDetail = (props: {item: IItem|IBook}) => {
	let displayItem: IItem;
	if(isBook(props.item)){
		displayItem = props.item.item;
	}else{
		displayItem = props.item;
	}
	return(
		<div>
			<p>Id: {displayItem.itemId}</p>
			<p>Title: {displayItem.title}</p>
			{getBookAndUPCDetail(props.item)}
			<p>Condition: {conditions[displayItem.condition]}</p>
			<p>Sell Price: {(displayItem.sellPrice/100).toFixed(2)}</p>
			<p>Site Listed: {displaySites(displayItem.siteListed)}</p>
			<p>Shelf Location: {displayItem.shelfLocation}</p>
			<p>Description: {displayItem.description}</p>
			<p>Amount Paid: {(displayItem.amountPaid/100).toFixed(2)}</p>
			<p>Date Purchased: {displayItem.datePurchased}</p>
			<p>Location Purchased: {displayItem.locationPurchased}</p>
			<p>Consignment: {displayItem?"yes":"no"}</p>
		</div>
	);
}

export default ItemDetail;
