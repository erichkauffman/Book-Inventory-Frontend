import { apiPath } from '../config'

export const getListOfItems = () => {
	return fetch(`${apiPath}/items/`)
	.then((response) => {
		return response.json();
	})
	.catch((err) => {
		console.log(err);
	});
}