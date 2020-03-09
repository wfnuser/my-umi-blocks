import React from 'react';
import { Button, Input } from 'antd';
import { Form } from '@ant-design/compatible';
import { WrappedFormUtils } from '@ant-design/compatible/lib/form/Form';
import '@ant-design/compatible/assets/index.css';

interface IProps {
  form: WrappedFormUtils;
  title: string;
  handleSearch: (form: any) => {}; // 父组件需实现该方法; 接收子组件的form参数,并刷新数据
}

const FormItem = Form.Item;
const formItemLayout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 12 },
};

const QueryForm = (props: IProps) => {
  const { form } = props;

  const handleSubmit = () => props.handleSearch && props.handleSearch(form);

  const handleFormReset = () => {
    form.resetFields();
    return props.handleSearch && props.handleSearch(form);
  };

  return (
    <Form layout="inline">
      <FormItem label="名称" {...formItemLayout}>
        {form.getFieldDecorator('name', {
          rules: [
            { required: true, message: '请输入名称' },
            {
              pattern: new RegExp('^[a-zA-Z0-9_]{1,32}$'),
              message: '名称必须为最多32位的字母、数字、下划线',
            },
          ],
        })(<Input placeholder="请输入" />)}
      </FormItem>
      <FormItem>
        <Button type="primary" onClick={handleSubmit}>
          查询
        </Button>
      </FormItem>
      <FormItem>
        <Button onClick={handleFormReset}>重置</Button>
      </FormItem>
    </Form>
  );
};

const QueryArea = Form.create({ name: 'form' })(QueryForm);
export default QueryArea;
