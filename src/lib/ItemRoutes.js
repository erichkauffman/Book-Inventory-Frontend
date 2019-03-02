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

const sendJson = (url, method, data) => {
	return fetch(url, {
		method: method,
		headers: {
			'Content-Type': 'application/json',
			'mode': 'cors'
		},
		body: JSON.stringify(data)
	})
	.then((res) => {
		console.log(res.json());
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

export const getItemById = (id, type) => {
	return getJson(`${apiPath}/${type}/${id}/`);
}

export const commitNewInventory = (type, data) => {
	return sendJson(`${apiPath}/${type}/`, 'POST', data);
}

export const updateInventory = (type, data) => {
	return sendJson(`${apiPath}/${type}/`, 'PUT', data);
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

export const getLocations = () => {
	return getJson(`${apiPath}/locations/`);
}

export const commitLocation = (location) => {
	let url = `${apiPath}/locations/${location}/`;
	fetch(url, {
		method: 'POST'
	})
	.then((res) => {
		console.log(res);
	});
}

export const searchBookByIsbn = (isbn) => {
	let url = `https://www.googleapis.com/books/v1/volumes?q=isbn:${isbn}`;
	return getJson(url);
}
