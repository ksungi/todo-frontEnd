import React, { useEffect, useState } from "react";
import {ListItem, ListItemText, InputBase, Checkbox, ListItemSecondaryAction, IconButton}from "@material-ui/core";
import DeleteOutlined from "@material-ui/icons/DeleteOutlined";

function Todo(props) {
    const [item, setItem] = useState(props.item);
    const [readOnly, setReadonly] = useState(true);
    const [itemColor, setItemColor] = useState("");
    const [itemTextDeco, setItemTextDeco] = useState("");

    const deleteEventHandler = ()=>{
        props.delete(item); 
    }
    
    const offReadOnlyMode = ()=>{
        setReadonly(false);
        console.log("ReadOnly? ", readOnly);
    }

    const enterKeyEventHandler = (e)=>{
        if(e.key === "Enter"){
            setReadonly(true);
            console.log("ReadOnly? ", readOnly);
            props.update(item);
        }
    }

    const editEventHandler = (e)=>{
        const thisItem = {...item};
        thisItem.title = e.target.value;
        setItem(thisItem);
    }

    function checkboxEventHandler() {
        const thisItem = {...item}
        thisItem.done = thisItem.done ? false : true; // bool값 반전
        setItem(thisItem);
        setReadonly(true);

        props.update(thisItem);
        
        setItemColor(thisItem.done ? "#f4f4f4" : "");
        setItemTextDeco(thisItem.done ? "line-through" : ""); 
    }

    useEffect( ()=>{
        const thisItem = {...item}
        setItemColor(thisItem.done ? "#f4f4f4" : "");
        setItemTextDeco(thisItem.done ? "line-through" : ""); 
    },[setItemColor, setItemTextDeco]);

    //render() {
    return (
        <ListItem>
            <Checkbox checked={item.done} onChange={checkboxEventHandler}/>
            <ListItemText>
                <InputBase 
                inputProps={{"aria-label":"naked", readOnly: readOnly}}
                type="text" id="{item.id}" name="{item.id}"
                value={item.title} multiline={true} fullWidth={true}
                onClick={offReadOnlyMode} onChange={editEventHandler}
                onKeyPress={enterKeyEventHandler}
                style={{background: itemColor, 
                        textDecoration: itemTextDeco,
                        borderRadius: 10,
                        alignSelf: "flex-start"}}
                        //텍스트 길이 만큼 배경을 넣으려 했으나 grid에서는 작동하지 않음
                />
            </ListItemText>
            <ListItemSecondaryAction>
                <IconButton aria-label="Delete" onClick={deleteEventHandler}>
                    <DeleteOutlined />
                </IconButton>
            </ListItemSecondaryAction>
        </ListItem>
    );
}

export default Todo;