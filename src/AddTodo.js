import React, { useState } from "react";
import { TextField, Paper, Button, Grid }from "@material-ui/core";

function AddTodo( {add} ) {
    const [item, setItem] = useState( {title: ""} );
    // constructor(props) {
    //     super(props);
    //     this.state = {item: {title:""}};
    //     this.add = props.add; //props의 함수를 this.add에 연결
    //     // 상위 컴포넌트(App.js)의 함수, 매개변수가 들어있음
    // }
    const onInputChange = (e)=>{
        const thisItem = {...item};
        thisItem.title = e.target.value;
        setItem(thisItem);
    }

    const onButtonClick = ()=>{
        add(item); //텍스트 삽입
        setItem({title:""}); //입력 필드 초기화
    }

    const enterKeyEventHandler = (e)=>{
        if(e.key === 'Enter') {
            onButtonClick();
        }
    }

    //render() {
    return (
        <Paper style={{margin:16, padding:16}}>
            <Grid container>
                <Grid xs={11} md={11} item style={{paddingRight:16}}>
                    <TextField placeholder="Add Todo Here"
                    fullWidth  onChange={onInputChange}
                    value={item.title}
                    onKeyPress={enterKeyEventHandler}
                    />
                </Grid>
                <Grid xs={1} md={1} item>
                    <Button fullWidth color="secondary"
                    variant="outlined" onClick={onButtonClick}>
                        +
                    </Button>
                </Grid>
            </Grid>
        </Paper>
    );
}

export default AddTodo;