// 仅供参考 为了让模版代码可以正常工作 需移除或移至全局model目录下
import { Effect } from 'dva';
import { Reducer } from 'redux';
// import { fetchItems } from '@/services/item';

export interface ItemModelState {
  items?: ItemResult[];
  itemsTotalCount?: number;
}

export interface ItemResult {
  name: string;
  id: number;
}

export interface ItemModelType {
  namespace: 'model';
  state: ItemModelState;
  effects: {
    fetchItems: Effect;
  };
  reducers: {
    reduceItems: Reducer<ItemModelState>;
  };
}

const ItemModel: ItemModelType = {
  namespace: 'model',

  state: {
    items: [],
  },

  effects: {
    *fetchItems(_, { put }) {
      // 应该从service获取
      // const response = yield call(fetchItems, payload);
      // const items: ItemResult[] = (response && response.data && response.data.list) || [];
      // const itemsTotalCount: number = (response && response.totalCount) || 0;
      const items = [{ name: 'test', id: 1 }];
      const itemsTotalCount = 1;

      yield put({
        type: 'reduceItems',
        payload: { items, itemsTotalCount },
      });
    },
  },

  reducers: {
    reduceItems(state, action) {
      const { items } = action.payload;
      const { itemsTotalCount } = action.payload;
      return {
        ...state,
        items,
        itemsTotalCount,
      };
    },
  },
};

// 以下代码应该被注册到request目录下
export interface ListItemsParamsType {
  pageIndex?: number;
  pageSize?: number;
}

export interface ItemParamsType {
  name?: string;
  id?: number;
}
// //////////

export default ItemModel;
