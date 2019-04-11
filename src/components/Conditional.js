const Conditional = (props) => {
	if(props.render){
		return props.children;
	}
	return null;
}

export default Conditional;
