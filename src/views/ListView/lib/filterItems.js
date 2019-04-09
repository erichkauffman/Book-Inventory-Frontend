export const filterItems = (items, filter, search) => {
	if(search){
		return items.filter((item) => {
			return item[filter].toString().toLowerCase().includes(search.toLowerCase());
		});	
	}
	return items;
}
