import { Box } from '@mui/material'
import React from 'react'
import style from "../../../styles/Manage.module.css";

const Searchbar = ({search, handleSearch}) => {
  return (
    <Box>
    <input type="text" name="search" id="search" className={style.searchbar} placeholder="Search..."  value={search} onChange={handleSearch}  />
  </Box>
  )
}

export default Searchbar