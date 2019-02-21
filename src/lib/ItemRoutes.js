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

export const commitNewInventory = (type, data) => {
	let url = `${apiPath}/${type}/`;
	fetch(url, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			'mode': 'cors'
		},
		body: JSON.stringify(data)
	})
	.then((res) => {
		console.log(res.json());
	});
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
