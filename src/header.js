import React from 'react';
import { Navbar} from 'react-bootstrap';

class Header extends React.Component {
	render() {
		return (
			<>
			  <Navbar bg="dark" variant="dark">
			  	<div className="header_div">
			    	<Navbar.Brand href="#home">Crud App</Navbar.Brand>
			    </div>
			  </Navbar>
			</>
			)
	}
}

export default Header;