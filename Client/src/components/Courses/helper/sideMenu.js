import React from 'react';
import { Layout } from 'antd';

import Sidebar from '../../Navigation/Sidebar';
import Header from '../../Navigation/Header';

const { Content } = Layout;

class SideMenu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      collapsed: false,
      windowHeight: null
    }
  }
  componentDidMount() {
    this.setState({ windowHeight: window.innerHeight });
  }
  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed
    });
  }
  render() {

    return (
      <div className="App">
        <Layout style={{ minHeight: this.state.windowHeight }}>
          <Sidebar collapsed={this.state.collapsed} current={this.props.current} openCurrent={this.props.openCurrent}/>
          <Layout>
            <Header collapsed={this.state.collapsed} toggle={this.toggle}/>
            <Content  style={{ padding: 24, background: '#EDF1F3', minHeight: this.state.windowHeight - 112 }}>
                {this.props.children}
            </Content>
          </Layout>
        </Layout>
      </div>
    );
  }
}
export default SideMenu;