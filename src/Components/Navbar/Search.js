import React, { useContext, useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import { styled, alpha } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import Styles from "../../styles/Nav.module.css";
import { BsSearch } from "react-icons/bs";
import { SearchContext } from "../Auth/User";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: "21px",
  backgroundColor: "#C4C4C4",
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  border: "1px solid #C4C4C4",

  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));

const Searchh = ({ handleClick, handleClose }) => {
  const [search, setSearch] = useContext(SearchContext);
  const [value, setValue] = useState("");
  const handleChange = (e) => {
    setSearch(e.target.value);
  };
  return (
    <div className={Styles.search}>
      <div className={Styles.content}>
        <Search>
          <SearchIconWrapper>
            <SearchIcon />
          </SearchIconWrapper>
          <StyledInputBase
            placeholder="Search…"
            inputProps={{ "aria-label": "search" }}
            onChange={handleChange}
          />
        </Search>
      </div>
      <div className={Styles.minSearch}>
        <BsSearch onClick={handleClick} />
      </div>
    </div>
  );
};

export default Searchh;
