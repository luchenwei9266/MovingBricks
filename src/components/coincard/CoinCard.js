import React from 'react';
import { connect } from 'dva';
import { Card } from 'antd';
import CoinCardStyle from './CoinCard.css';
import createG2 from 'g2-react';
import axios from 'axios';

var temperature1 = '';
var temperature2 = '';

const Chart = createG2(chart => {
  chart.col('time', {
    alias: '时间',
    type: 'time',
    mask: 'MM:ss',
    tickCount:10,
    nice: false
  });
  chart.col('temperature', {
    alias: '当前价格',
    min: 0.008,
    max: 0.007
  });
  chart.col('type', {
    type:'cat'
  });
  chart.line().position('time*temperature').color('type',['#ff7f0e','#2ca02c']).shape('smooth').size(2);
  chart.render();
});

function getData() {
  let resList = [];  
  let res1 = axios.get('/api/api/bittrex/getticker');
  let res2 = axios.get('/api/api/binance/getAllOrders');
  resList.push(res1);
  resList.push(res2);

  Promise.all(resList).then(resultList => {
    temperature1 = resultList[0].data.result.Last;
    temperature2 = resultList[1].data;
  });
}

function createData(source) {
    const now = new Date();
    let time = now.getTime();

    if(source.length >= 200) {
      source.shift();
      source.shift();
    }  
    source.push({time: time, temperature: temperature1, type: 'Bittrex'});
    source.push({time: time, temperature: temperature2, type: 'Binace'});
    return source.concat();
}

const CoinCardPage = React.createClass({
  getInitialState() {
    let source = [];
    return {
      data: createData(source),
      forceFit: true,
      width: 500,
      height: 450
    };
  },
  componentDidMount: function() {
    const self = this;
    setInterval(function() {
      getData();
      var data = self.state.data;
      self.setState({
        data: createData(data)
      });
    }, 1000);
  },
  render() {
      console.log(this.state.data);
      return (
        <div>
          <Chart
            data={this.state.data}
            width={this.state.width}
            height={this.state.height}
            forceFit={this.state.forceFit} />
  </div>
      );
  },
});

// class CoinCardPage extends React.Component {

//   constructor(props){
//     super(props);

//     this.state = {
//       data: source,
//       forceFit: true,
//       width: 500,
//       height: 450
//     }
//   }

//   componentDidMount () {
//     const self = this;
//     setInterval(function() {
//       self.createData();
//       var data = self.state.data;
//       self.setState({data:source},()=>{
//         console.log(self.state.data);
//       });
//     }, 1000);
//   }

//   createData() {
//     const now = new Date();
//     let time = now.getTime();
//     let resList = [];
  
//     let res1 = axios.get('/api/api/bittrex/getticker');
//     let res2 = axios.get('/api/api/binance/getAllOrders');
//     resList.push(res1);
//     resList.push(res2);
  
//     Promise.all(resList).then(resultList =>{
//       let temperature1 = ~~resultList[0].data.result.Last;
//       let temperature2 = ~~resultList[1].data;
//       if(source.length >= 200) {
//         source.shift();
//         source.shift();
//       }  
//       source.push({time: time, temperature: temperature1, type: '记录1'});
//       source.push({time: time, temperature: temperature2, type: '记录2'});
//       source.concat();
//     })
//   }

//   render() {
//     return (
//       <div>
//         <Card style={{ width: 240 }} bodyStyle={{ padding: 0 }}>
//           <div className={CoinCardStyle.customImage}>
//             <img alt="example" width="100%" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />
//           </div>
//           <div className={CoinCardStyle.customcard}>
//             <h3>Europe Street beat</h3>
//             <p>www.instagram.com</p>
//           </div>
//         </Card>

//         <Chart
//           data={this.state.data}
//           width={this.state.width}
//           height={this.state.height}
//           forceFit={this.state.forceFit} 
//         />


//       </div>

//     )
//   }
// }

CoinCardPage.propTypes = {
};

export default CoinCardPage;
