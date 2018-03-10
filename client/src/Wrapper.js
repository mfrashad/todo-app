import React from 'react';
import {Row} from 'antd';
import MediaQuery from 'react-responsive';
import App from './App';

class Wrapper extends React.Component {

  render() {
    return (
      <div>
        <MediaQuery minWidth={768}>
          <Row type='flex' justify='center'>
            <div style={{minWidth:'400px', minHeight:'600px', border:'1px solid #dddddd', marginTop:'20px'}} >
              <App/>
            </div>
          </Row>
      </MediaQuery>
      <MediaQuery maxWidth={767}>
        <App/>
      </MediaQuery>
      </div>
    );
  }
}

export default Wrapper;