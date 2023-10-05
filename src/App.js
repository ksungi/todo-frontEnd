import React from 'react';
import Todo from './Todo';
import AddTodo from './AddTodo';
import {Paper, List, Container, Grid, Button, AppBar, Toolbar, Typography} from "@material-ui/core";
import './App.css';
import { call, signout, userInfoSet_route } from './service/ApiService';


class App extends React.Component {
  constructor(props){ //매개변수 props 생성자
    super(props);   //매개변수 pros 초기화
    this.state ={  // Item 에 item.id, item.done 매개변수 이름과 값 할당
      items: [],
      /*로딩 중 이라는 상태를 표현할 변수 생성자에 상태 변수를 초기화*/
      loading: true,
    };
  }

  add = (item) => {
    call("/todo", "POST", item).then( (response)=>
      this.setState({items: response.data})
      );
  }

  delete = (item)=>{
    call("/todo", "DELETE", item).then( (response)=>
      this.setState({items: response.data})
      );
  }

  update = (item)=>{
    call("/todo", "PUT", item).then( (response)=>
      this.setState({items: response.data})
      );
  }
  
  //페이지(DOM) 마운트가 일어나고 렌더링 되기 전에 실행됨
  componentDidMount() {
    call("/todo", "GET", null).then( (response)=>
      this.setState({items: response.data, loading: false})
      );
  }

  // useEffect() {
  //   call("/todo", "GET", null).then((response) => {
  //     this.setState({items: response.data});
  //   });
  // }


  render() {
    //조건문 (참이라면 && 이후 실행)
    var todoItems = this.state.items.length > 0 &&(
      <Paper style= {{margin:16}}>
        <List>
          {this.state.items.map( (item, idx) => (
              <Todo item={item} key={item.id} delete={this.delete} update={this.update}/> 
          ))}
        </List>
      </Paper>
    );
    
    const accessUsername = localStorage.getItem("ACCESS_USERNAME");
    //navigationBar
    var navigationBar = (
      <AppBar position="static">
        <Toolbar>
          <Grid justify-content="space-between" alignItems="center" container>         
            <Grid item xs={8}>
              <Typography variant="h6"  align="left" > 오늘의 할 일 </Typography>
            </Grid>

            <Grid item xs={2} alignContent="center" >
              <Typography align="right" > {accessUsername}님 </Typography>
            </Grid>

            <Grid item xs={2}>
              <Button color="inherit" onClick={userInfoSet_route}> 회원정보수정 </Button>
              <Button color="inherit" onClick={signout}> 로그아웃 </Button>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
    );

    //loading 중이 아닐 때
    var todoListPage = (
      <div>
        {navigationBar}
        <Container maxWidth="md">
          <AddTodo add = {this.add} />
          <div className='TodoList'> {todoItems} </div>
        </Container>
      </div>
    );
    
    //loading 중일 때
    var loadingPage = <h1>로딩중...</h1>
    var content = loadingPage;

    if(!this.state.loading) {
      content = todoListPage;
    }

    //생성된 컴포넌트 JPX를 리턴
    return (
      <div className="App">
        {content}  
      </div>
    );
  }
}

export default App;