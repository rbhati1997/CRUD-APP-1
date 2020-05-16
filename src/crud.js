import React, {Component} from 'react'
import Header from './header.js'
import ModalForm from './modalform.js'

class Crud extends Component {
    render(){
        return (
        		<div>
        			<Header /> 
        			<div>
        				<ModalForm />
        			</div>
        		</div>
        	)
    }
}

export default Crud;