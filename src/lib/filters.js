export const filterOutId = (itemId, itemList) => {
	return itemList.filter((item) => {
		return item.itemId !== itemId;
	});
}

export const filterOutExactData = (dataString, dataList) => {
	return dataList.filter((data) => {
		return data !== dataString;
	});
}

