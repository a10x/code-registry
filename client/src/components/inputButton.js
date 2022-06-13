import React from 'react';
import {Button, Box} from '@material-ui/core';
import styled from 'styled-components';
import {useTheme} from "@material-ui/core";

const StyledBox = styled(Box)`
    .MuiButtonBase-root {
        width: 100%;
        height: 50px;
        background: #240090;
        color: ${props => props.theme.palette.common.white};
    }
`

let InputButton = function(props){
    const theme = useTheme();

    let proper = JSON.parse(JSON.stringify(props));;
    delete proper.style;

    let onClickEvent= props.onChildClick;
    if(onClickEvent === undefined)onClickEvent = props.onclick;

    return <StyledBox theme={theme} style={props.style}>
        <Button {...proper} onClick={onClickEvent}>{proper.label}</Button>
    </StyledBox>
}

export default InputButton;