import React, { useRef } from 'react';
import { Modal } from 'antd';
import { ModalProps } from 'antd/lib/modal';
import CreateItemForm from './ItemForm';

interface IProps extends ModalProps {
  onOk: (arg: any) => void;
  onCancel: () => void;
}

function CreateItemModal(props: IProps) {
  const { visible, onOk, onCancel, title } = props;
  const form = useRef(null) as any;
  return (
    <Modal title={title} visible={visible} onOk={() => onOk(form)} onCancel={() => onCancel()}>
      <CreateItemForm ref={form} />
    </Modal>
  );
}
export default CreateItemModal;
