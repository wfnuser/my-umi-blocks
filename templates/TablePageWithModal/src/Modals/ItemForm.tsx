import React from 'react';
import { Input } from 'antd';
import { Form } from '@ant-design/compatible';
import { WrappedFormUtils } from '@ant-design/compatible/lib/form/Form';
import '@ant-design/compatible/assets/index.css';
// import { RoleParamsType } from '@/services/RequestTypes/access';

interface IProps {
  form: WrappedFormUtils;
  title: string;
  itemParams?: any;
}

const FormItem = Form.Item;
const formItemLayout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 12 },
};

const RegistrationForm = (props: IProps) => {
  const { form, itemParams } = props;
  return (
    <div>
      <Form>
        <FormItem label="名称" {...formItemLayout}>
          {form.getFieldDecorator('name', {
            rules: [
              { required: true, message: '请输入名称' },
              {
                pattern: new RegExp('^[a-zA-Z0-9_]{1,32}$'),
                message: '名称必须为最多32位的字母、数字、下划线',
              },
            ],
            initialValue: itemParams?.name,
          })(<Input placeholder="请输入" />)}
        </FormItem>
      </Form>
    </div>
  );
};

const RoleForm = Form.create({ name: 'form' })(RegistrationForm);
export default RoleForm;
