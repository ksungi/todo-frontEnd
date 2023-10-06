import React, { useEffect, useState } from 'react';
import Todo from './Todo';
import AddTodo from './AddTodo';
import {Paper, List, Container, Grid, Button, AppBar, Toolbar, Typography, Unstable_TrapFocus, styled} from "@material-ui/core";
import './App.css';
import { call, signout, userInfoSet_route } from './service/ApiService';


function App() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currnetPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemPerPage] = useState(7);

  const add = (item)=>{
    call("/todo", "POST", item).then( (response)=>
      setItems(response.data)
      );
  }

  const deleteitem = (item)=>{
    call("/todo", "DELETE", item).then( (response)=>
      setItems(response.data)
      );
  }

  const update = (item)=>{
    call("/todo", "PUT", item).then( (response)=>
      setItems(response.data)
      );
  }
  
  //페이지(DOM) 마운트가 일어나고 렌더링 되기 전에 실행됨
  useEffect( ()=>{
    call("/todo", "GET", null).then( (response)=>{
      setItems(response.data);
      setLoading(false);
    });
  }, []);

  //전체삭제
  const handleDeleteAll = ()=>{
    if(window.confirm("모든 목록이 삭제됩니다. 하시겠습니까?")) {
      if(items.length > 0){
        items.map( (item, idx)=>{
          deleteitem(item);
        });
        //this.setState([]);
        setCurrentPage(1); //현재 페이지를 1로 되돌림
      }
      alert("삭제되었습니다.");
    } else { alert("취소되었습니다."); }
  }
  
  //선택삭제
  const handleDeleteSelectedAll = ()=>{
    items.map( (item, idx)=>{
      if(item.done === true){
        deleteitem(item);
      }
    });
    //this.setState([]);
  }

  // useEffect( ()=>{
  //   call("/todo", "GET", null).then((response) => {
  //     this.setState({items: response.data});
  //   });
  // },[]);

  // *연산 불가한 관계로 다른 변수를 거쳐서 계산
  const CP = currnetPage;
  const IPP = itemsPerPage;
  //페이징 변수들
  const indexOfLastItem = CP * IPP; // 디폴트: 7
  const indexOfFirstItem = indexOfLastItem - IPP; // 배열은 0부터 시작이니까
  const currentItems = items.slice(indexOfFirstItem, indexOfLastItem);
                                      // Last(7) 전에서 컷   ^/0/--/1/--'''--/6/--^/7/
  
  //조건문 (참이라면 && 이후 실행)
  var todoItems = currentItems.length > 0 &&(
    <Paper style= {{margin:16}}>
      <List>
        {currentItems.map( (item, idx) => (
            <Todo item={item} key={item.id} delete={deleteitem} update={update}/> 
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
            <Typography align="right" > [ {accessUsername} ] </Typography>
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
        <AddTodo add = {add} />
        <div className='TodoList'> {todoItems} </div>
      </Container>
      
      {/* 페이징과 버튼들 */}
      <div >
        <Button onClick={() => {
          if( CP > 1){
            setCurrentPage(CP-1);
          }else{}
        }}> ❮ </Button>

        {Array.from(
          { length: Math.ceil(items.length / IPP) }, 
          (v, i) => ( <Button key={i+1}
                              onClick={ ()=>setCurrentPage(i+1) }
                              variant={currnetPage === (i+1) ? "contained" : "text" }
                      > {i+1} </Button> )
        )}

        <Button onClick={() => {
          if( CP > 0 && CP < items.length/IPP){
            setCurrentPage(CP+1);
          }else{}
        }}> ❯ </Button>
      </div>
      <br/>
      {/* [선택/전체] 삭제 버튼 */}
      <Button onClick={handleDeleteSelectedAll}
              variant="contained" 
              color="primary"
              size="medium"
              style={{ marginLeft: '16px' }}> 선택 삭제 </Button>
      <Button onClick={handleDeleteAll}
              variant="contained" 
              color="secondary"
              size="medium"
              style={{ marginLeft: '16px'}}> 초기화 </Button>
    </div>
  );

  //loading 중일 때
  var loadingPage = <h1>로딩중...</h1>
  var content = loadingPage;
  // 아닐 때
  if(!loading) {
    content = todoListPage;
  }

  //생성된 컴포넌트 JPX를 리턴
  return (
    <div className="App">
      {content}  
    </div>
  );
}

export default App;