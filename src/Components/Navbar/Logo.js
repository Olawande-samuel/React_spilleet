// import Image from 'next/image'
import Styles from "../../styles/Nav.module.css";
import { Link } from "react-router-dom";
import Spilleet from "../../images/Logo.svg"

const Logo = () => {
  return (
    <Link to="/">
      <div className={Styles.logo}>
        <img src={Spilleet} alt="App Logo" width={160} height={48} />
      </div>
    </Link>
  );
};

export default Logo;
