import '@ant-design/compatible/assets/index.css';
import React, { useEffect, useState } from 'react';
import { Card, Table } from 'antd';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { TablePaginationConfig } from 'antd/lib/table';
// import { ConnectProps, ConnectState } from '@/models/connect';
// import { ListItemsParamsType, ItemParamsType } from '@/services/RequestTypes/namespace';
import { connect } from 'dva';
import styles from './index.less';

// /////////////////////////////////////////
// 下面的code应该被移除 仅为让代码正常工作
// 以上的code应该被移除
// ./model 仅为了让demo代码可以正常工作，应移除
import { ItemModelState, ItemResult, ListItemsParamsType } from './model';
import { RouteChildrenProps } from 'react-router';
import { Dispatch, AnyAction } from 'redux';
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

  useEffect(() => {
    fetchTable();
  }, [tableParams]);

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
          <a onClick={() => showDetailModal()}>详情</a>
        </>
      ),
    },
  ];

  const showDetailModal = () => {};

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
  };

  return (
    <PageHeaderWrapper content="这是一个空白模板页">
      <Card bordered={false}>
        <div className={styles.tableList}>
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
        </div>
      </Card>
    </PageHeaderWrapper>
  );
};

// 请用注释掉的代码替换相应代码 应该要自己定义model state类型并替换
// export default connect(({ $model_namespace$ }: ConnectState) => ({
export default connect(({ model }: { model: ItemModelState }) => ({
  model,
}))(TableList);
