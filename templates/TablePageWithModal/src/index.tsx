import '@ant-design/compatible/assets/index.css';
import React, { useEffect, useState } from 'react';
import { Button, Card, Table, Divider, Modal, notification } from 'antd';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { TablePaginationConfig } from 'antd/lib/table';
import { PlusOutlined } from '@ant-design/icons';
// import { ConnectProps, ConnectState } from '@/models/connect';
// import { ListItemsParamsType, ItemParamsType } from '@/services/RequestTypes/namespace';
import { connect } from 'dva';
import { RouteChildrenProps } from 'react-router';
import { Dispatch, AnyAction } from 'redux';
import styles from './index.less';
import CreateItemModal from './Modals/CreateItemModal';
import UpdateItemModal from './Modals/UpdateItemModal';

// /////////////////////////////////////////
// 下面的code应该被移除 仅为让代码正常工作
// 以上的code应该被移除
// ./model 仅为了让demo代码可以正常工作，应移除
import { ItemModelState, ItemResult, ListItemsParamsType, ItemParamsType } from './model';

export interface ConnectProps extends RouteChildrenProps {
  dispatch: Dispatch<AnyAction>;
}
// 以上代码应移除
// /////////////////////////////////////////

interface TableListProps extends ConnectProps {
  model: ItemModelState;
}

const TableList: React.FC<TableListProps> = props => {
  const [tableParams, setTableParams] = useState<ListItemsParamsType>({
    pageIndex: 1,
    pageSize: 10,
  });
  const [createItemModalVisible, setCreateItemModalVisible] = useState<boolean>(false);
  const [updateItemModalVisible, setUpdateItemModalVisible] = useState<boolean>(false);
  const [selectedItemInfo, setSelectedItemInfo] = useState<ItemParamsType>();

  useEffect(() => {
    fetchTable();
  }, []);

  const { model } = props;
  // TODO: write in better way
  const items = model && model.items;
  const itemsTotalCount = model && model.itemsTotalCount;

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      fixed: 'left' as 'left',
      width: 120,
    },
    {
      title: '名称',
      dataIndex: 'name',
      width: 120,
    },
    {
      title: '操作',
      width: 340,
      render: (record: ItemResult) => (
        <>
          <Divider type="vertical" />
          <a
            onClick={() => {
              setUpdateItemModalVisible(true);
              setSelectedItemInfo(record as ItemParamsType);
            }}
          >
            编辑项目
          </a>
          <Divider type="vertical" />
          <a onClick={() => showRemoveItemConfirm(record.id!)}>删除项目</a>
        </>
      ),
    },
  ];

  const showRemoveItemConfirm = (id: number) => {
    Modal.confirm({
      title: '确认要删除吗？',
      okText: '确定',
      cancelText: '取消',
      onOk() {
        onRemoveItem(id);
      },
      onCancel() {},
    });
  };

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

  const onRemoveItem = (id: number) => {
    const { dispatch } = props;
    dispatch({
      type: 'model/removeItem',
      payload: { id },
      // TODO: should not use any
      // TODO: maybe we can consider abstract the notification action
      callback: (res: any) => {
        if (res && res.code === 0) {
          notification.success({
            message: `删除项目成功!`,
          });
        }
        fetchTable();
      },
    });
  };

  const handleTableChange = (pagination: TablePaginationConfig) => {
    setTableParams({
      pageIndex: pagination.current,
      pageSize: pagination.pageSize,
    });
    fetchTable();
  };

  const fetchTable = () => {
    const { dispatch } = props;
    dispatch({ type: 'model/fetchItems', payload: tableParams });
    setCreateItemModalVisible(false);
    setUpdateItemModalVisible(false);
  };

  return (
    <PageHeaderWrapper content="这是一个空白模板页">
      <Card bordered={false}>
        <div className={styles.tableList}>
          <div className={styles.tableListOperator}>
            <Button type="primary" onClick={() => setCreateItemModalVisible(true)}>
              <PlusOutlined /> 新建项目
            </Button>
          </div>
          <Table
            rowKey="id"
            dataSource={items}
            pagination={{
              total: itemsTotalCount,
              defaultPageSize: 10,
              showTotal: total => `共 ${total} 条`,
            }}
            onChange={handleTableChange}
            columns={columns}
            scroll={{ x: 800 }}
          />
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
        </div>
      </Card>
    </PageHeaderWrapper>
  );
};

// 请用注释掉的代码替换 应该要定义类型 model换成自己注册model的namespace
// export default connect(({ $model_namespace$ }: ConnectState) => ({
export default connect(({ model }: { model: ItemModelState }) => ({
  model,
}))(TableList);
