import React from "react";
import { TextField, Paper, Button, Grid }from "@material-ui/core";

class AddTodo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {item: {title:""}};
        this.add = props.add; //props의 함수를 this.add에 연결
        // 상위 컴포넌트(App.js)의 함수, 매개변수가 들어있음
    }
    onInputChange = (e)=>{
        const thisItem = this.state.item;
        thisItem.title = e.target.value;
        this.setState({item: thisItem});
        console.log(thisItem);
    }

    onButtonClick = ()=>{
        this.add(this.state.item); //텍스트 삽입
        this.setState({item: {title:""}}); //입력 필드 초기화
    }

    enterKeyEventHandler = (e)=>{
        if(e.key === 'Enter') {
            this.onButtonClick();
        }
    }

    render() {
        return (
            <Paper style={{margin:16, padding:16}}>
                <Grid container>
                    <Grid xs={11} md={11} item style={{paddingRight:16}}>
                        <TextField placeholder="Add Todo Here"
                        fullWidth  onChange={this.onInputChange}
                        value={this.state.item.title}
                        onKeyPress={this.enterKeyEventHandler}
                        />
                    </Grid>
                    <Grid xs={1} md={1} item>
                        <Button fullWidth color="secondary"
                        variant="outlined" onClick={this.onButtonClick}>
                            +
                        </Button>
                    </Grid>
                </Grid>
            </Paper>
        );
    }
}

export default AddTodo;