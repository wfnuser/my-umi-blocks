import React, { useRef } from 'react';
import { Modal } from 'antd';
import { ModalProps } from 'antd/lib/modal';
import { ItemParamsType } from '../model';
// import { ItemParamsType } from '@/services/RequestTypes/access';
import UpdateItemForm from './ItemForm';

// 以下为测试代码应该被移除
interface ItemParamsType {
  name: string;
}
// 以上为测试代码应该被移除

interface IProps extends ModalProps {
  onOk: (arg: any) => void;
  onCancel: () => void;
  itemParams: ItemParamsType;
}

function UpdateItemModal(props: IProps) {
  const { visible, onOk, onCancel, title, itemParams } = props;
  const form = useRef(null) as any;
  return (
    <Modal title={title} visible={visible} onOk={() => onOk(form)} onCancel={() => onCancel()}>
      <UpdateItemForm ref={form} itemParams={itemParams} />
    </Modal>
  );
}
export default UpdateItemModal;
