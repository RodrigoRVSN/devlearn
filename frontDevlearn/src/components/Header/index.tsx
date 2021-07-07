import React, { useEffect, useState } from 'react'
import { Button } from '../Button'
import './styles.scss'

const Header: React.FC = (): JSX.Element => {
  const [hasToken, setHasToken] = useState(false)
  const [hasLogout, setHasLogout] = useState(false)

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      setHasToken(true)
    } else {
      setHasToken(false)
    }
  }, [hasLogout])

  function handleLogout() {
    localStorage.removeItem('token')
    setHasLogout(!hasLogout)
  }

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
            <>
              <Button onClick={handleLogout}>SAIR</Button>
              <a href="/admin">ADMINISTRAR</a>
            </>
          )}
        </div>
      </header>
    </>
  )
}

export default Header
