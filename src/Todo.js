import React from "react";
import {ListItem, ListItemText, InputBase, Checkbox, ListItemSecondaryAction, IconButton}from "@material-ui/core";
import DeleteOutlined from "@material-ui/icons/DeleteOutlined";

class Todo extends React.Component {
    constructor(props) {
        super(props);
        this.state ={ item: props.item, 
                        readOnly: true,
                        itemColor: "",
                        itemTextDeco: "",}; //매개변수 item의 변수/값을 item에 대입
        this.delete = props.delete;
        this.update = props.update;
    }

    deleteEventHandler = ()=>{
        this.delete(this.state.item);
    }
    
    offReadOnlyMode = ()=>{
        this.setState({readOnly: false}, ()=>{
            console.log("ReadOnly? ", this.state.readOnly)
        });
    }

    enterKeyEventHandler = (e)=>{
        if(e.key === "Enter"){
            this.setState({readOnly:true});
            this.update(this.state.item);
        }
    }

    editEventHandler = (e)=>{
        const thisItem = this.state.item;
        thisItem.title = e.target.value;
        this.setState({item: thisItem});
    }

    checkboxEventHandler = (e)=>{
        const thisItem = this.state.item;
        thisItem.done = thisItem.done ? false : true; // bool값 반전
        //this.setState({item: thisItem});
        this.setState({readOnly:true});
        this.update(this.state.item);
        if(thisItem.done){
            this.setState({itemColor: "#f4f4f4"});
            this.setState({itemTextDeco: "line-through"}); 
        }else {
            this.setState({itemColor: ""});
            this.setState({itemTextDeco: ""}); 
        }
    }

    render() {
        const item = this.state.item;
        return (
            <ListItem>
                <Checkbox checked={item.done} onChange={this.checkboxEventHandler}/>
                <ListItemText>
                    <InputBase 
                    inputProps={{"aria-label":"naked", readOnly: this.state.readOnly}}
                    type="text" id="{item.id}" name="{item.id}"
                    value={item.title} multiline={true} fullWidth={true}
                    onClick={this.offReadOnlyMode} onChange={this.editEventHandler}
                    onKeyPress={this.enterKeyEventHandler}
                    style={{background: this.state.itemColor, 
                            textDecoration: this.state.itemTextDeco,
                            borderRadius: 10,
                            alignSelf: "flex-start"}}
                            //텍스트 길이 만큼 배경을 넣으려 했으나 grid에서는 작동하지 않음
                    />
                </ListItemText>
                <ListItemSecondaryAction>
                    <IconButton aria-label="Delete" onClick={this.deleteEventHandler}>
                        <DeleteOutlined />
                    </IconButton>
                </ListItemSecondaryAction>
            </ListItem>
        );
    }
}

export default Todo;