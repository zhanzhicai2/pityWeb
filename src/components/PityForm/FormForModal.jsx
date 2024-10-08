import React from "react";
import {Form, Modal,Col} from "antd";
import getComponent from './index';

const {Item: FormItem} = Form;

const FormForModal = ({title, width, left, right, formName, record, onFinish, loading, fields, visible, onCancel}) => {
  const [form] = Form.useForm();
  const onOk = () => {
    form.validateFields().then((values) => {
      onFinish(values);
    })
  }
  const layout = {
    labelCol: {span: left},
    wrapperCol: {span: right},
  }
  return (
    <Modal
      destroyOnClose confirmLoading={loading}
      title={title} width={width} visible={visible} onOk={onOk} onCancel={onCancel}>
      <Form
        form={form}
        {...layout}
        name={formName}
        initialValues={record}
        onFinish={onFinish}
      >
        {
          fields.map(item => <Col span={item.span || 24}>
            <FormItem label={item.label} colon={item.colon || true}
                      rules={
                        [{required: item.required, message: item.message}]
                      } name={item.name} valuePropName={item.valuePropName || 'value'}
            >
              {getComponent(item.type, item.placeholder, item.component)}
            </FormItem>
          </Col>)
        }
      </Form>
    </Modal>
  )

}
export default FormForModal;
