import React from 'react';
import { Layout, Icon, Tooltip } from 'antd';
import { BrowserRouter as Router,  Link, Redirect } from 'react-router-dom';
import SignOut from '../SignOut';

const { Header } = Layout;
class HeaderSection extends React.Component {
	constructor(props) {
	    super(props)
	    this.state = {
	    }
	}
	isAuthenticated() {
	    const token = localStorage.getItem('token');
	    return token && token.length > 10;
	}
	render() {
		const isAlreadyAuthenticated = this.isAuthenticated();
		return (
			<div>
		        {!isAlreadyAuthenticated ? 
		        	<Redirect to = {{pathname: "/"}} /> : 
		          	(
						<Header style={{ background: '#EDF1F3', padding: 0 }}>
				            <Icon
				              className="trigger"
				              type={this.props.collapsed ? 'menu-unfold' : 'menu-fold'}
				              onClick={this.props.toggle}
				            />
				            <Tooltip placement="bottomLeft" title="Logout">
						        <Icon
					              className="trigger logout"
					              type="logout"
					              onClick={SignOut}
					            />
						    </Tooltip>
			          </Header>	
		          	)
		        }
		    </div>
		);
	}
}
export default HeaderSection;