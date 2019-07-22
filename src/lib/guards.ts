import { IItem, IBook } from '../data/types';

export const isItem = (item: any): item is IItem => {
	return (item as IItem).itemId !== undefined;
}

export const isBook = (book: any): book is IBook => {
	return (book as IBook).author !== undefined;
}
