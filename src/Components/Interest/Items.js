import { style } from "@mui/system";
import { UserContext } from "../Auth/User";
import React, { useContext } from "react";
import Style from "../../styles/Items.module.css";

const Item = ({
  item,
  handleCheck,
  check,
  setCheck,
  interests,
  handleUnCheck,
  set,
}) => {
  const context = useContext(UserContext);
  const [user, setUser] = context;
  const [id, setId] = React.useState("");
  const sets = new Set();
  // (function reSet() {
  if (interests.length > 0) {
    interests.map((item) => sets.add(item));
  }
  // })()

  console.log(sets);

  return (
    <label
      htmlFor={item.ctg_name}
      id="interest_label"
      className={sets.has(item.ctg_name) ? Style.trueLabel : Style.checkLabel}
      style={{ backgroundColor: sets.has(item.ctg_name) ? "#C035A2" : "#fff" }}
    >
      {item.ctg_name}
      <input
        type="checkbox"
        name={item.ctg_name}
        id={item.ctg_name}
        onChange={(e) => handleCheck(e, item.ctg_name)}
        // checked={set.has(item.ctg_name) ? true : false}
        onClick={(e) => handleUnCheck(e, item.ctg_name)}
      />
      <span className={Style.icon}></span>
    </label>
  );
};

export default Item;
