import React, { useState } from 'react';
import { Card, Col, Row, Input, Select, Button, Tabs, Radio, Dropdown, Menu } from 'antd';
import {DownOutlined, SendOutlined, DeleteTwoTone, DeleteOutlined} from '@ant-design/icons';
import EditableTable from '@/components/Table/EditableTable';
import CodeEditor from "@/components/Postman/CodeEditor";

const { Option } = Select;
const { TabPane } = Tabs;

const selectBefore = (
  <Select defaultValue='GET' style={{ width: 120, fontSize: 16, textAlign: 'left' }}>
    <Option value='GET'>GET</Option>
    <Option value='POST'>POST</Option>
    <Option value='PUT'>PUT</Option>
    <Option value='DELETE'>DELETE</Option>
  </Select>
);

export default () => {
  const [bodyType, setBodyType] = useState('none');
  const [rawType, setRawType] = useState('JSON');
  const [paramsData, setParamsData] = useState([]);
  const [headers, setHeaders] = useState([]);
  const [editableKeys, setEditableRowKeys] = useState(() => paramsData.map((item) => item.id));
  const [headersKeys, setHeadersKeys] = useState(()=>headers.map((item)=>item.id));
  const [body,setBody] = useState(null);



  // 请求url+params
  const [url, setUrl] = useState('');



  // 根据paramsData拼接url
  const joinUrl = (data) => {
    let tempUrl = url.split('?')[0];
    data.forEach((item, idx) => {
      if (item.key) {
        // 如果item.key有效
        if (idx === 0) {
          tempUrl = `${tempUrl}?${item.key}=${item.value || ''}`;
        } else {
          tempUrl = `${tempUrl}&${item.key}=${item.value || ''}`;
        }
      }
    })
    setUrl(tempUrl);
  }

  const splitUrl = nowUrl => {
    const split = nowUrl.split('?')
    if (split.length < 2) {
      setParamsData([]);
    } else {
      const params = split[1].split("&")
      const newParams = [];
      const keys = [];
      params.forEach((item, idx) => {
        const [key, value] = item.split("=");
        const now = Date.now();
        keys.push(now+idx+10);
        newParams.push({key, value, id: now+idx+10, description: ''})
      })
      setParamsData(newParams)
      setEditableRowKeys(keys);
    }
  }

  const onClickMenu = key => {
    setRawType(key);
  }

  const onDelete = (columType,key) => {
    if(columType  === 'params'){
      const data = paramsData.filter(item => item.id !== key)
      setParamsData(data);
      joinUrl(data);
    }else {
      const data = headers.filter(item => item.id !==key)
      setHeaders(data);
    }
  }

  const menu = (
    <Menu>
      <Menu.Item key="Text">
        <a onClick={()=>{onClickMenu("Text")}}>Text</a>
      </Menu.Item>
      <Menu.Item key="JavaScript">
        <a onClick={()=>{onClickMenu("JavaScript")}}>JavaScript</a>
      </Menu.Item>
      <Menu.Item key="JSON">
        <a onClick={()=>{onClickMenu("JSON")}}>JSON</a>
      </Menu.Item>
      <Menu.Item key="HTML">
        <a onClick={()=>{onClickMenu("HTML")}}>HTML</a>
      </Menu.Item>
      <Menu.Item key="XML">
        <a onClick={()=>{onClickMenu("XML")}}>XML</a>
      </Menu.Item>

    </Menu>
  );

  const Columns = columnType=>{
    return[
      {
        title: 'KEY',
        dataIndex: 'key',
      },
      {
        title: 'VALUE',
        dataIndex: 'value',
      },
      {
        title: 'DESCRIPTION',
        dataIndex: 'description',
      },
      {
        title: '操作',
        render: (text, record) => {
          return <>
            <DeleteTwoTone style={{cursor: 'pointer', marginLeft: 8}}
                           onClick={()=>{onDelete(columnType, record.id)}} twoToneColor="#eb2f96"/>
            {/*<DeleteOutlined />*/}
          </>
        }
      },
    ]
  }

  return (
    <Card>
      <Row gutter={[8, 8]}>
        <Col span={18}>
          <Input size='large' value={url} addonBefore={selectBefore} placeholder="请输入要请求的url" onChange={ e => {
            setUrl(e.target.value)
            splitUrl(e.target.value);
          }} />
        </Col>
        <Col span={6}>
          <Button type='primary' size='large' style={{ marginRight: 16, float: 'right' }}><SendOutlined />Send </Button>
        </Col>
      </Row>
      <Row style={{ marginTop: 8 }}>
        <Tabs defaultActiveKey='1' style={{width: '100%'}}>
          <TabPane tab='Params' key='1'>
            <EditableTable columns={Columns("Params")} title="Query Params" dataSource={paramsData} setDataSource={setParamsData}
                           extra={joinUrl} editableKeys={editableKeys} setEditableRowKeys={setEditableRowKeys}
            />
          </TabPane>
          <TabPane tab='Headers' key='2'>
            <EditableTable columns={Columns("headers")} title="Headers" dataSource={headers} setDataSource={setHeaders}
                           editableKeys={headersKeys} setEditableRowKeys={setHeadersKeys}
            />
          </TabPane>
          <TabPane tab='Body' key='3'>
            <Row>
              <Radio.Group defaultValue='none' value={bodyType} onChange={e => setBodyType(e.target.value)}>
                <Radio value='none'>none</Radio>
                <Radio value='form-data'>form-data</Radio>
                <Radio value='x-www-form-urlencoded'>x-www-form-urlencoded</Radio>
                <Radio value='raw'>raw</Radio>
                <Radio value='binary'>binary</Radio>
                <Radio value='GraphQL'>GraphQL</Radio>
              </Radio.Group>
              {
                bodyType === 'raw' ? <Dropdown style={{marginLeft: 8}} overlay={menu} trigger={['click']}>
                  <a onClick={e => e.preventDefault()}>
                    {rawType} <DownOutlined />
                  </a>
                </Dropdown>: null
              }
            </Row>
            {
              bodyType === 'raw' ?
                <Row style={{marginTop:12}}>
                 <Col span={24}>
                   <Card bodyStyle={{padding:0}}>
                     <CodeEditor value={body} setValue={setBody} theme="vs-dark" />
                   </Card>
                 </Col>
                </Row>: null
            }
          </TabPane>
        </Tabs>
      </Row>
    </Card>
  );
}
