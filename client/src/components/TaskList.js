import React from 'react';
import {List, Icon} from 'antd';

class TaskList extends React.Component {
  
  
  render(){
    return (
      <List
        
        dataSource={this.props.data}
        renderItem={(item,index) => (
          <List.Item 
            style={{padding:'10px', fontSize:'1.5em',fontWeight:'lighter', textDecoration:item.isFinished?'line-through':'none'}}
            actions={[
              <Icon type='delete' 
              style={{fontSize:'1.5em'}} 
              onClick={(e)=>this.props.onDelete(e,index)} />
            ]}
            onClick={e => this.props.onTaskFinished(e,index)}
            key={index} 
          >
            {item.task}
          </List.Item>
        )}
      />
    );
  }
}

export default TaskList;