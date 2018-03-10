import React from 'react';
import InputTask from './InputTask';

class AddTask extends React.Component {
 
  render(){
    return (
      <div className='row' >
        <div className='input-field col s10' >
          <InputTask 
            
            value={this.props.value}
            onChange={this.props.onChange}
            onEnter={this.props.onEnter}
            isInputRendered={this.props.isInputRendered}
            
          />
        </div>
      </div>
        
    );
  }
}

export default AddTask;
