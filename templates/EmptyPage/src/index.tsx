import { PageHeaderWrapper } from '@ant-design/pro-layout';
import React, { useState, useEffect } from 'react';
import { Card } from 'antd';
export default () => {
  return (
    <PageHeaderWrapper content="这是一个空白模板页">
      <Card>Empty Content</Card>
    </PageHeaderWrapper>
  );
};
