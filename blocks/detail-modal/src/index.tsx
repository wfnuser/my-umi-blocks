import React from 'react';
import { Modal, Row, Col } from 'antd';
import { ModalProps } from 'antd/lib/modal';

interface DetailResult {
  name: string;
  id: number;
}

interface IProps extends ModalProps {
  onCancel?: () => void;
  detail?: DetailResult;
}

function DetailModal(props: IProps) {
  const {
    visible = true,
    onCancel = () => {},
    title,
    detail = { name: '测试', id: '测试id' },
  } = props;
  return (
    <Modal title={title} visible={visible} footer={null} onCancel={() => onCancel()}>
      <Row gutter={{ md: 12, lg: 24, xl: 48 }}>
        <Col md={9} sm={24}>
          名称:
        </Col>
        <Col md={15} sm={24}>
          {detail.name}
        </Col>
      </Row>
      <Row gutter={{ md: 12, lg: 24, xl: 48 }}>
        <Col md={9} sm={15}>
          id
        </Col>
        <Col md={15} sm={15}>
          {detail.id}
        </Col>
      </Row>
    </Modal>
  );
}
export default DetailModal;
