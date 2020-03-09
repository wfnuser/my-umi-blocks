// 整个文件只是为了演示; 只需要使用Modals里的内容即可
import '@ant-design/compatible/assets/index.css';
import React, { useState, useEffect } from 'react';
import { Button, notification } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
// import { ConnectProps, ConnectState } from '@/models/conervices/RequestTypes/namespace';
import { RouteChildrenProps } from 'react-router';
import { Dispatch, AnyAction } from 'redux';
import CreateItemModal from './CreateItemModal';
import UpdateItemModal from './UpdateItemModal';

export interface ItemParamsType {
  name: string;
  id: number;
}
export interface ConnectProps extends RouteChildrenProps {
  dispatch: Dispatch<AnyAction>;
}

interface TableListProps extends ConnectProps {}

const Demo: React.FC<TableListProps> = props => {
  const [createItemModalVisible, setCreateItemModalVisible] = useState<boolean>(false);
  const [updateItemModalVisible, setUpdateItemModalVisible] = useState<boolean>(true);
  const [selectedItemInfo, setSelectedItemInfo] = useState<ItemParamsType>();

  useEffect(() => {
    setSelectedItemInfo({
      name: 'test',
      id: 123,
    });
  }, []);

  const onCreateItem = (form: any) => {
    const { validateFields } = form.current;
    validateFields((error: any, values: any) => {
      if (!error) {
        const { dispatch } = props;
        dispatch({
          type: 'model/addItem',
          payload: values,
          // TODO: should not use any here
          // TODO: maybe we can consider abstract the notification and fetch actions
          // as some global action
          callback: (res: any) => {
            if (res && res.code === 0) {
              notification.success({
                message: `新建项目成功!`,
              });
            }
            fetchTable();
          },
        });
      } else {
        console.log(error);
      }
    });
  };

  const onUpdateItem = (form: any) => {
    const { validateFields } = form.current;
    validateFields((error: any, values: any) => {
      if (!error) {
        const { dispatch } = props;
        dispatch({
          type: 'model/modifyItem',
          payload: { ...values, id: selectedItemInfo?.id },
          // TODO: should not use any here
          // TODO: maybe we can consider abstract the notification and fetch actions
          // as some global action
          callback: (res: any) => {
            if (res && res.code === 0) {
              notification.success({
                message: `编辑项目成功!`,
              });
            }
            fetchTable();
          },
        });
      } else {
        console.log(error);
      }
    });
  };

  const fetchTable = () => {
    setCreateItemModalVisible(false);
    setUpdateItemModalVisible(false);
  };

  return (
    <>
      <Button type="primary" onClick={() => setCreateItemModalVisible(true)}>
        <PlusOutlined /> 新建项目
      </Button>
      <CreateItemModal
        title="添加项目"
        visible={createItemModalVisible}
        onOk={onCreateItem}
        onCancel={() => {
          setCreateItemModalVisible(false);
        }}
      />
      <UpdateItemModal
        title="编辑项目"
        visible={updateItemModalVisible}
        onOk={onUpdateItem}
        itemParams={selectedItemInfo}
        onCancel={() => {
          setUpdateItemModalVisible(false);
        }}
      />
    </>
  );
};

export default Demo;
