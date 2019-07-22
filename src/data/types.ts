export interface IItem{
	itemId: number,
	title: string
}

export interface IBook extends IItem{
	author: string
}
