import React from "react";
import "./styles.scss";

const Header: React.FC = () => {
  return (
    <>
      <header>
        <div className="header-content">
          <h2>DEV LEARN</h2>
          <a href="/regiter">CADASTRAR</a>
          <a href="/login">ENTRAR</a>
        </div>
      </header>
    </>
  );
};

export default Header;
