import React, { Component } from 'react';
import './App.css';
import 'materialize-css/dist/css/materialize.min.css';

import {Layout} from 'antd';

import Header from './components/common/Header';
import TaskList from './components/TaskList';
import AddTask from './components/AddTask';




class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      response : '',
      inputValue:'',
      data:[],
      isInputRendered:false,
      user:null

    };
  }

  handleChange = (event) => {
    this.setState({inputValue:event.target.value});
  }

  handleEnter = (event) => {
    if(!this.state.inputValue) return;
    let tempData = this.state.data;
    tempData.push({task:this.state.inputValue,isFinished:false});
    this.setState({data:tempData, inputValue:'', isInputRendered:false});
    this.postTask(event.target.value);
  }

  handleButton = (event) => {
    this.setState({isInputRendered:true});
  }

  handleDelete = (event, index) => {
    event.stopPropagation();
    let tempData = this.state.data;
    let task = tempData.splice(index,1);
    this.setState({data:tempData});
    this.removeTask(task[0].task);
    

  }

  handleTaskFinished = (event, index) => {
    let tempData = this.state.data;
    tempData[index].isFinished = !tempData[index].isFinished;
    this.setState({data:tempData});
  }

  getTask() {
    fetch('api/getTasks',{
      method:'GET',
      credentials:'include'
    })
      .then(res => res.json())
      .then(
        (res) => {
          this.setState({data:res});
        }
      );
  }

  removeTask(task) {
    fetch('api/removeTask',{
      method:'POST',
      headers:{
        'Accept':'application/json',
        'Content-Type':'application/json'
      },
      body:JSON.stringify({
        'task':task
      }),
      credentials:'include'
    }).catch(err => console.log(err));
  }

  getUser() {
    fetch('api/getUser',{
      method:'GET',
      credentials:'include'
    }).then(res => res.json())
      .then(
        (res) => {
          this.setState({user:res});
        }
      );
  }

  initialize() {
    this.getTask();
    this.getUser();
  }

  postTask(task){
    fetch('api/addTask', {
      method:'POST',
      headers:{
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      credentials:'include',
      body:JSON.stringify({
        'task':task,
        'isFinished':false
      })
    }).catch(function(error){
      console.log(error);
    });
  }
 

  componentDidMount(){
    this.initialize();
  }

  render() {
    return (
      <Layout style={{minHeight:'100%'}} >
        <Layout.Header style={{padding:'0px'}} >
          <Header user={this.state.user} />
        </Layout.Header>
        <Layout.Content style={{minHeight:'400px'}} >
          <TaskList data={this.state.data}
            onDelete={this.handleDelete}
            onTaskFinished={this.handleTaskFinished}
          />
        </Layout.Content>
        <Layout.Footer  style={{position:'sticky', bottom:'0px',paddingLeft:'5px' , width:'100%',height:'100px',background:'transparent'}}>
          <AddTask value={this.state.inputValue} 
            onChange={this.handleChange} 
            onEnter={this.handleEnter} 
            isInputRendered={this.state.isInputRendered}
          />
          <div className='fab-addTask'>
            <a onClick={this.handleButton} className="btn-floating btn-large waves-effect waves-light red"><i className="material-icons">+</i></a>
          </div>
        </Layout.Footer>
      </Layout>
    );
  }
}

export default App
