import React from 'react';
import SideMenu from './helper/sideMenu';
import {Row, Col, List, Avatar, Button, Skeleton, Card, Icon, Modal, Upload} from 'antd';
import { DeleteOutlined} from '@ant-design/icons';
import AddNewTopic from './helper/addNewTopic';
import EditTopic from './editTopics';

import axios from 'axios';
import Config from '../../constants/config';

const token = localStorage.getItem('token');
const confirm = Modal.confirm;
class Topics extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            windowHeight: null,
            dataRequested : [],
            isLoading : false,
            isVisible : false,
            isCompleted : null
        }
    }

    getAllTopics = () => {
      axios.get(Config.get_all_topics, { headers: {"authorization" : localStorage.getItem('token')} })
        .then(({ data }) => {
          const state = { ...this.state }
          state.dataRequested = data;
          this.setState(state);
          console.log(data,'all topics');
        }).catch((err) => {
          console.log('error', err);
        })
    }

    componentDidMount() {
      this.setState({ windowHeight: window.innerHeight });
      this.getAllTopics();
    }

    handleDelete = (id, title) =>{
      confirm({
        title: 'Are you sure you want to delete this "'+ title +'" topic ?',
        content: '',
        okText: 'Yes',
        okType: 'danger',
        cancelText: 'No',
        onOk() {
          const headers = {
            'authorization': token
          }
          const data = {
            id: id
          }
          return (
            axios.delete(Config.delete_topic, {headers, data})
              .then(({ data }) => {
                window.location.reload()
              })
              .catch((err) => {
                console.log('error', err);
              })
          )
        },
        onCancel() {
          console.log('Cancel');
        },
      });
    }

    setVisible = () => {
      this.setState({
        isVisible : !this.state.isVisible
      })
    }

    render(){
        const IconDelete = ({ id, name, icon, text, color }) => (
            <span style={{color : color}} onClick={() => this.handleDelete(id, name)}>
              {React.createElement(icon, { style: { marginRight: 8 , color : color} })}
              {text}
            </span>
          );

        const TopicData = ({id, title, desc }) => (
          <>
           <span style={{color : "black"}} >

           Topic ID : {id} <br/>

           Topic Title : {title} <br/>

           Description : {desc} <br/>

           </span>
          </>
        )
        return(
          <SideMenu current='topics' openCurrent='topics'>
            <div type="flex" justify="center"  style={{ background: '#EDF1F3', padding: 24, minHeight: this.state.windowHeight - 112 }}> 
                <AddNewTopic handleFormSubmit= {this.handleFormSubmit} getAllTopics={this.getAllTopics}/>
                <Row>  
                  <Col span={24}>
                    <List
                      itemLayout="vertical"
                      size="large"
                      dataSource={this.state.dataRequested}
                      renderItem={item => (
                        <Card style={{ marginTop: 16 }} >
                          <List.Item
                            key={item.name}
                            actions={[
                              <EditTopic data={item} id={item.id} getAllTopics={this.getAllTopics} HandleTest={this.handleTest} handleEdit={this.handleEdit} isLoading={this.state.isLoading} visible={this.state.isVisible} isCompleted ={this.state.isCompleted}/>
                              ,
                              <IconDelete id={item.id} title={item.topicTitle} icon={DeleteOutlined} text="Delete" key="list-vertical-star-o" color = "#FF0000" />,
                            ]}
                           > 
                            <List.Item.Meta
                              title={<p>{item.title}</p>}
                             />
                            {  <TopicData
                                id = {item.id}
                                title = {item.topicTitle}
                                desc = {item.topicDesc}
                                 />}
                          </List.Item>
                        </Card>
                        )}
                      />
                  </Col>
                </Row>
            </div>
          </SideMenu>
        )
    }
}

export default Topics