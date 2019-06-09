import { checkFields } from '../../../lib/checkFields';

export const checkFieldsAndSites = (item, fields, sites) => {
	let itemCheck = checkFields(item, fields);
	let siteCheck = sites.sites.reduce((status, site, index) => {
		return status && (!site || (sites.ids[index]));
	}, true);

	return itemCheck && siteCheck;
}
