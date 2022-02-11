import React from "react";
import {Link} from "react-router-dom";
import Logo from "../../images/spilleet.svg"
const FLogo = () => {
  return (
    <div>
      <Link to="/">
        <img src={Logo} alt="" width={268} height={85} />
      </Link>
    </div>
  );
};

export default FLogo;
