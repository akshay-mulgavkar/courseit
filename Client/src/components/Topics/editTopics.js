import React, { useState, useCallback } from "react";
import ReactDOM from "react-dom";
import {message, Button, Icon } from "antd";
import {  EditOutlined, DeleteOutlined } from '@ant-design/icons';
import ModalForm from "./helper/modalForm";

import axios from 'axios';
import Config from '../../constants/config';

const token = localStorage.getItem('token');
const EditCourse = ({ data, getAllTopics}) => {

  const [visible, setVisible] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [formRef, setFormRef] = useState(null);

  const handleCreate = () => {
    formRef.validateFields((err, values) => {
      if (err) {
        return;
      }
      handleEdit(values, data.id)

    });
  };

  const handleEdit = (values, id) => {
    setLoading(true)
    console.log(values)
    const {topicTitle, topicDesc} = values 

    axios.patch(Config.edit_topic, {
      topicTitle,
      topicDesc,
      id,
    },{
      headers: {
        'content-type': 'application/json',
        'Authorization' : token
      }
    })
     .then((res) => {
      console.log(res.data.message);
      message.success(res.data.message);
      setLoading(false)
      formRef.resetFields();
      setVisible(false);
      getAllTopics()
     })
     .catch((res) => {
       console.log(res,'catch')
       message.error('Can not updated data');
       setLoading(false)
       formRef.resetFields();
       setVisible(false);
     })
  }

 
  const saveFormRef = useCallback(node => {
    if (node !== null) {
      setFormRef(node);
    }
  }, []);

  const IconText = ({ icon, text, color }) => (
    <span style={{color : color}} onClick={() => setVisible(true)}>
      {React.createElement(icon, { style: { marginRight: 8 , color : color} })}
      {text}
    </span>
  );

  return (
    <>
      <IconText icon={EditOutlined} text="Edit" key="list-vertical-like-o" color = "#0000FF"   />
      <ModalForm
        ref={saveFormRef}
        formTitle = "Update Topic"
        visible={visible}
        onCancel={() => setVisible(false)}
        onCreate={() => handleCreate()}
        isLoading={isLoading}
        initialValue = {data}
      />
    </>
  );
};

export default EditCourse;