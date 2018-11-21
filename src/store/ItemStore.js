import { apiPath } from '../config'

export const getListOfInventory = (type) => {
	return fetch(`${apiPath}/${type}/`)
	.then((response) => {
		return response.json();
	})
	.catch((err) => {
		console.log(err);
	});
}