export const checkFields = (item, fields, sites) => {
	let itemCheck = fields.reduce((status, field) => {
		return status && (item[field] || item[field] === 0);
	}, true);

	let siteCheck = sites.sites.reduce((status, site, index) => {
		return status && (!site || (sites.ids[index]));
	}, true);

	return itemCheck && siteCheck;
}
