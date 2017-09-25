import React from 'react';
import { connect } from 'dva';
import { Card } from 'antd';
import CoinCardStyle from './CoinCard.css';

function CoinCardPage() {
  return (
    <Card style={{ width: 240 }} bodyStyle={{ padding: 0 }}>
      <div className={CoinCardStyle.customImage}>
        <img alt="example" width="100%" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />
      </div>
      <div className={CoinCardStyle.customcard}>
        <h3>Europe Street beat</h3>
        <p>www.instagram.com</p>
      </div>
    </Card>
  );
}

CoinCardPage.propTypes = {
};

export default connect()(CoinCardPage);
