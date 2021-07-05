import React, { useEffect, useState } from "react";
import "./styles.scss";

const Header: React.FC = () => {
  const [hasToken, setHasToken] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setHasToken(true);
    } else {
      setHasToken(false);
    }
  }, []);

  return (
    <>
      <header>
        <div className="header-content">
          <h2>DEV LEARN</h2>
          {!hasToken ? (
            <>
              <a href="/register">CADASTRAR</a>
              <a href="/login">ENTRAR</a>
            </>
          ) : (
            <a href="/admin">ADMINISTRAR</a>
          )}
        </div>
      </header>
    </>
  );
};

export default Header;
