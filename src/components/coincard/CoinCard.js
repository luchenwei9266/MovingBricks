import React from 'react';
import { connect } from 'dva';
import { Card } from 'antd';
import CoinCardStyle from './CoinCard.css';
import bittrex from '../../key';

class CoinCardPage extends React.Component {
  componentDidMount() {
    bittrex.getmarketsummaries( function( data, err ) {
      if (err) {
        return console.error(err);
      }
      for( var i in data.result ) {
        bittrex.getticker( { market : data.result[i].MarketName }, function( ticker ) {
          console.log( ticker );
        });
      }
    });
  }
  render() {
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
    )
  }
}

CoinCardPage.propTypes = {
};

export default CoinCardPage;
