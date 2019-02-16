import { apiPath } from '../config'

const getJson = (url) => {
	return fetch(url)
	.then((response) => {
		return response.json();
	})
	.catch((err) => {
		console.log(err);
	});
}

export const getListOfInventory = (type) => {
	return getJson(`${apiPath}/${type}/`);
}

export const getSellableInventory = (type) => {
	return getJson(`${apiPath}/${type}/sellable/`);
}

export const commitRemoveAction = (id, status) => {
	let url = `${apiPath}/items/${id}/removeAction/${status}/`;
	fetch(url, {
		method: 'PUT'
	})
	.then((res) => {
		console.log(res);
	});
}
