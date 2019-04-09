import React from 'react';
import './BookSearch.css';

const BookSearch = (props) => {
	if(props.renderCondition){
		return(
			<div className='search'>
				<input type='text'
					   placeholder='Enter ISBN'
					   value={props.value}
					   onChange={props.onChange}
					   onKeyPress={props.onKeyPress}/>
				<button type='button' onClick={props.onClick}>search</button>
			</div>
		);
	}
	return null;
}

export default BookSearch;
