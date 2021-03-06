import React, { useState, useCallback } from "react";
import ReactDOM from "react-dom";
import { message, Button, Icon } from "antd";
import ModalForm from "./modalForm";

import axios from 'axios';
import Config from '../../../constants/config';
import moment from 'moment';

const token = localStorage.getItem('token');

const AddNewTopic = ({getAllTopics}) => {

  const [visible, setVisible] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [formRef, setFormRef] = useState(null);

  const handleCreate = () => {
    formRef.validateFields((err, values) => {
      if (err) {
        return;
      }
      handleFormSubmit(values)
      formRef.resetFields();
      setVisible(false);
    });
  };

  const saveFormRef = useCallback(node => {
    if (node !== null) {
      setFormRef(node);
    }
  }, []);

  const handleFormSubmit = (values) => {
    setLoading(true)
    const {
      topicTitle,
      topicDesc,
      topicDuration } = values

    axios.post(Config.add_new_topic, {
      topicTitle,
      topicDesc,
      topicDuration
    },{
      headers: {
        'content-type': 'application/json',
        'Authorization' : token
      }
    })
     .then((res) => {
      message.success(res.data.message);
      setLoading(false)
      formRef.resetFields();
      setVisible(false);
      getAllTopics()
      console.log(res);
     })
     .catch((res) => {
      message.error('Can not update data');
      setLoading(false)
      formRef.resetFields();
      setVisible(false);
       console.log(res)
     })
  }

  return (
    <>
      <Button type="primary" className="btn-add" style={{fontSize:20,marginBottom:10}} onClick={() => setVisible(true)}>
      <Icon type="plus" /> Add New Topic
      </Button>
      <ModalForm
        ref={saveFormRef}
        formTitle = "Add New Topic"
        visible={visible}
        isLoading={isLoading}
        onCancel={() => setVisible(false)}
        onCreate={() => handleCreate()}
      />
    </>
  );
};

export default AddNewTopic;