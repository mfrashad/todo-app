import React from 'react';
import {Input} from 'antd';

class InputTask extends React.Component {

  render() {
    if(this.props.isInputRendered){
      return (
        <Input 
            value={this.props.value}
            onChange={this.props.onChange}
            onPressEnter={this.props.onEnter}
            autoFocus={true}
          />
      );
    }
    return (<div></div>);
  }
}

export default InputTask;