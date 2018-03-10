import React from 'react';
import {Avatar, Menu, Button} from 'antd';


class Header extends React.Component{

  getUser(){
    if(this.props.user){
      console.log('logged in already');
      return (
        <Menu.Item key='avatar' style={{float:'right'}} >
          <Avatar src={this.props.user.image}/>
        </Menu.Item>
        
      );
    } else {
      console.log('not logged in')
      return (
        <Menu.Item key='login' style={{float:'right'}}>
          <a href='auth/google'> <Button size='large' ghost>Login</Button></a>
        </Menu.Item>
      );
    }
  }

  render(){
    return (
      <Menu mode='horizontal' theme='dark' selectable={false} style={{lineHeight:'60px',fontSize:'2em'}} >
        <Menu.Item key='logo' style={{color:'white'}} >Todo App</Menu.Item>
        {this.getUser()}
      </Menu>
    );
  }
}

export default Header;