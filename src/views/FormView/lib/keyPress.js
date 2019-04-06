export const keyPress = (e, key, func) => {
	let keyCode = e.keyCode || e.which;
	if(keyCode === key){
		func(e);
	}
}
