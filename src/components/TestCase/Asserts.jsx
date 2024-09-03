import { Row, Col} from 'antd';
import { useState } from 'react';
import styles from './index.less';

// const {TabPane} = Tab;

export default () => {
  const [editing, setEditing] = useState(false);


  return (
    <>
      {/*<h3 style={{ borderLeft: '3px solid #ecb64a', padding: '3px 8px' }}>标题</h3>*/}
      <p className={styles.title}>断言详情</p>
      <Row gutter={[8, 8]}>
        <Col></Col>
        <Col span={24}>

        </Col>
      </Row>
    </>
  );
}
