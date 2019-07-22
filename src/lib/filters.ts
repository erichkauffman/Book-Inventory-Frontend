import { IItem } from '../data/types';

export const filterOutId = (itemId: number, itemList: IItem[]): IItem[] => {
	return itemList.filter((item) => {
		return item.itemId !== itemId;
	});
}

export const filterOutExact = (dataString: string, dataList: string[]) => {
	return dataList.filter((data) => {
		return data !== dataString;
	});
}

