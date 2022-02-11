// @ts-nocheck
import React from "react";
import style from "../../../../styles/Manage.module.css";
const Usertable = () => {
  return (
    <tr>
      <td>1</td>
      <td>James</td>
      <td>Admin</td>
      <td>
        <div className={style.action}>
          <button className={style.post_remove}>Remove</button>
        </div>
      </td>
    </tr>
  );
};

export default Usertable;
