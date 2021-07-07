import React, { BrowserRouter, Route, Switch } from 'react-router-dom'
import { Login } from './pages/Login'
import { Register } from './pages/Register'
import { Home } from './pages/Home'
import { Admin } from './pages/Admin'

function App(): JSX.Element {
  return (
    <>
      <BrowserRouter>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/register" component={Register} />
          <Route path="/login" component={Login} />
          <Route path="/admin" component={Admin} />
        </Switch>
      </BrowserRouter>
    </>
  )
}

export default App
