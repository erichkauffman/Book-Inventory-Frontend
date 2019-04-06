export const checkFields = (item, fields) => {
	return fields.reduce((status, field) => {
		return status && (item[field] || item[field] === 0);
	}, true);
}
