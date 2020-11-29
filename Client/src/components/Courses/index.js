import React from 'react';
import SideMenu from './helper/sideMenu';
import {Row, Col, List, Avatar, Button, Skeleton, Card, Icon, Modal, Upload} from 'antd';
import { DeleteOutlined} from '@ant-design/icons';
import AddNewCourse from './helper/addNewCourse';
import EditCourse from './editCourse';

import axios from 'axios';
import Config from '../../constants/config';

const token = localStorage.getItem('token');
const confirm = Modal.confirm;
class Courses extends React.Component {
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

    getAllCourses = () => {
      axios.get(Config.get_all_courses, { headers: {"authorization" : localStorage.getItem('token')} })
        .then(({ data }) => {
          const state = { ...this.state }
          state.dataRequested = data;
          this.setState(state);
          console.log(data,'all courses');
        }).catch((err) => {
          console.log('error', err);
        })
    }

    componentDidMount() {
      this.setState({ windowHeight: window.innerHeight });
      this.getAllCourses();
    }

    handleDelete = (id, title) =>{
      confirm({
        title: 'Are you sure you want to delete this "'+ title +'" course ?',
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
            axios.delete(Config.delete_course, {headers, data})
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

        const CourseData = ({id, title, desc, duration }) => (
          <>
           <span style={{color : "black"}} >

           Course ID : {id} <br/>

           Course Title : {title} <br/>

           Description : {desc} <br/>

           Duration : {duration} <br/>

           </span>
          </>
        )
        return(
          <SideMenu current='courses' openCurrent='courses'>
            <div type="flex" justify="center"  style={{ background: '#EDF1F3', padding: 24, minHeight: this.state.windowHeight - 112 }}> 
                <AddNewCourse handleFormSubmit= {this.handleFormSubmit} getAllCourses={this.getAllCourses}/>
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
                              <EditCourse data={item} id={item.id} getAllCourses={this.getAllCourses} HandleTest={this.handleTest} handleEdit={this.handleEdit} isLoading={this.state.isLoading} visible={this.state.isVisible} isCompleted ={this.state.isCompleted}/>
                              ,
                              <IconDelete id={item.id} title={item.courseTitle} icon={DeleteOutlined} text="Delete" key="list-vertical-star-o" color = "#FF0000" />,
                            ]}
                           > 
                            <List.Item.Meta
                              title={<p>{item.title}</p>}
                             />
                            {  <CourseData
                                id = {item.id}
                                title = {item.courseTitle}
                                desc = {item.courseDesc}
                                duration = {item.courseDuration}
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

export default Courses