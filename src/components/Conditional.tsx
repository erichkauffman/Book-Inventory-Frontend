import { ReactElement } from "react";

const Conditional = (props: {render: boolean, children: ReactElement}) => {
	if(props.render){
		return props.children;
	}
	return null;
}

export default Conditional;
