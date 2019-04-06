export const trueIndecies = (booleanArray) => {
	let newArr = [];
	booleanArray.forEach((element, index) => {
		if(element){
			newArr.push(index);
		}
	});
	return newArr;
}
