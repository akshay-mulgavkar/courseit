import React from "react";
import {Row, Col, Modal, Form, Input } from "antd";

const ModalFormComponent = ({ visible, onCancel, onCreate, form, formTitle , initialValue, isLoading}) => {
  
  const { getFieldDecorator } = form;
  return (
    <Modal
      visible={visible}
      title={formTitle}
      okText="Submit"
      onCancel={onCancel}
      onOk={onCreate}
      height="80vh"
      width="60%"
      maskClosable={false}
      centered={true}
      confirmLoading={isLoading}

    >
      <Form layout="vertical">
        <Row gutter={8}>
          <Col span={12}>
            <Form.Item label="Title">
              {getFieldDecorator("courseTitle", {
                initialValue : initialValue  ? initialValue.courseTitle : '',
                rules: [
                  {
                    required: true,
                    message: "Please input the course title. "
                  }
                ]
              })(<Input />)}
            </Form.Item>
          </Col>
          <Col span={12}>
          <Form.Item label="Desc">
          {getFieldDecorator("courseDesc", {
            initialValue :  initialValue  ? initialValue.courseDesc : '',
            rules: [
              {
                required: true,
                message: "Please input course desc. "
              }
            ]
          })(<Input />)}
        </Form.Item>
          </Col>
        </Row>

        <Row gutter={8}>
          <Col span={8}>
            <Form.Item label="Duration">
              {getFieldDecorator("courseDuration", {
                initialValue : initialValue  ? initialValue.courseDuration : '',
                rules: [
                  {
                    required: true,
                    message: "Please input the duration. "
                  }
                ]
              })(<Input />)}
            </Form.Item>
          </Col>
        </Row>

      </Form>
    </Modal>
  );
};

const ModalForm = Form.create({ name: "modal_form" })(ModalFormComponent);

export default ModalForm;