import React from 'react';
import {FormControl} from '@material-ui/core';
import styled from 'styled-components';
import {useTheme} from "@material-ui/core";
import InputAdornment from '@material-ui/core/InputAdornment';

import { OutlinedInput } from '@material-ui/core';
import {BiSearchAlt2} from "react-icons/bi";

const StyledOutlinedField = styled(OutlinedInput)`
    div{
        background: ${props => props.theme.palette.secondary.main};
        padding-bottom: 56px;
        padding-right: 20px;
        margin-left: -15px;
    }


    input {
        color: ${props => props.theme.palette.common.white};
        background: ${props => props.theme.palette.secondary.main};
    }
`;

function SearchBox(props) {
    const theme = useTheme();

    return <FormControl>
        <StyledOutlinedField startAdornment={<InputAdornment ><BiSearchAlt2 style={{marginTop: "50px", marginLeft: "5px", marginRight: "-5px"}} color="white"/></InputAdornment>} {...props} placeholder="Search" theme={theme}></StyledOutlinedField>
    </FormControl>
}

export default SearchBox;
