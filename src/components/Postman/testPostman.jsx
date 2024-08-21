import React, {useEffect, useState} from 'react';
import {Card, Col, Row, Table, Tabs} from 'antd';

const {TabPane} = Tabs

const initialResponse = {
  cookies: {
    'cookie1': 'value1',
    'cookie2': 'value2',
  },
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer some_token',
  },
};

export default () => {
      const [response, setResponse] = useState(initialResponse);

      // 使用useEffect来模拟数据加载（这里只是立即设置初始数据）
      useEffect(() => {
      // 这里通常会有异步操作来获取数据，但这里我们直接设置初始数据
      setResponse(initialResponse);
    }, []); // 空依赖数组意味着这个effect只会在组件挂载时运行一次

      // 转换函数，用于将响应对象转换为表格的数据源
      const toTableDataSource = (field) => {
      if (!response[field]) {
      return [];
    }
      return Object.keys(response[field]).map((key) => ({
      key, // 注意这里的key是React的key，不是数据源中的字段
      value: response[field][key],
    }));
    };

      // 定义表格列
      const resColumns = [
      {
        title: 'KEY',
        dataIndex: 'key',
        key: 'key',
      },
      {
        title: 'VALUE',
        dataIndex: 'value',
        key: 'value',
      },
      ];

      return (
      <Tabs defaultActiveKey="1">
        <TabPane tab="Cookie" key="1">
          <Table
            columns={resColumns}
            dataSource={toTableDataSource('cookies')}
            size="small"
            pagination={false}
          />
        </TabPane>
        <TabPane tab="Headers" key="2">
          <Table
            columns={resColumns}
            dataSource={toTableDataSource('headers')}
            size="small"
            pagination={false}
          />
        </TabPane>
      </Tabs>
      );
}
