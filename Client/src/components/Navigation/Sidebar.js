import React, { Component } from 'react';
import { Layout, Menu, Icon } from 'antd';
import { BrowserRouter as Router,  Link, Redirect } from 'react-router-dom';
import '../../assets/css/App.css';

const { Sider } = Layout;
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

class Sidebar extends Component {
  constructor(props) {
    super(props)
    this.state = {
      current: props.current,
      openCurrent: props.openCurrent,
      openItem: props.openItem
    }
  }
  handleClick = (e) => {
    this.setState({
      current : this.props.current
    });
  }
  render() {
    return (
      <Sider
        trigger={null}
        collapsible
        collapsed={this.props.collapsed}
        >

          <div className="sidebar-header">
            { !this.props.collapsed ? <h1>Course IT</h1> : <h1>CI</h1> }
          </div>
          <Menu defaultSelectedKeys={[this.state.current]} defaultOpenKeys={[this.state.openCurrent]} theme="dark" mode="inline" inlineCollapsed={true}>
            <Menu.Item key="home"><Link to="/"><Icon type="appstore" /><span>Dashboard</span></Link></Menu.Item>
            <Menu.Item key="courses"><Link to="/courses"><Icon type="user" /><span>Courses</span></Link></Menu.Item>
            <Menu.Item key="topics"><Link to="/topics"><Icon type="user" /><span>Topics</span></Link></Menu.Item>
           </Menu>
      </Sider>
    );
  }
}
export default Sidebar;
