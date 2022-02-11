import React, {useState, useContext} from 'react';
import { Box } from '@mui/material';
import { SearchContext } from '../Auth/User';
import {AiOutlineClose} from "react-icons/ai"
const SearchNav = ({handleClose}) => {
  const [search, setSearch] = useContext(SearchContext)
    const style = {
        border:"1px solid #eee",
        outline:"none",
        width:"90%",
        padding:"10px 16px"
        
    }
    const handleChange =(e)=>{
        setSearch(e.target.value)
    }
  return (
    <Box width="100%" display="flex" padding="15px 0.35rem">
        <input type="text" name="search" id="search" value={search} onChange={handleChange} style={style} />
        <i style={{fontSize:"24px", display:"flex", width:"10%",justifyContent:"center", alignItems:"center", background:"#eee"}} onClick={handleClose}> <AiOutlineClose /></i>
    </Box> 
  )
};

export default SearchNav;
