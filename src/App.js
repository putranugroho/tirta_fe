import React from 'react'
import { BrowserRouter, Route} from 'react-router-dom'
import cookies from 'universal-cookie'
import { connect } from 'react-redux'
import './App.css';

import Login from './components/Login'
import Register from './components/Register'  
// import History from './components/History'
// import Detail_History from './components/Detail_History'
import {keepLogin} from './action'

const cookie = new cookies()

class App extends React.Component {

  componentDidMount(){
    // Check cookie
    const objCookie = cookie.get("userData")

    if (objCookie !== undefined) {
        this.props.keepLogin(objCookie)
    }
  }

  render(){
    return (
      <BrowserRouter>
          {/* <h1>Hello World!!</h1> */}
          <Route path="/login" exact component={Login}/>
          <Route path="/" exact component={Register}/>
          {/* <Route path="/" exact component={History}/>
          <Route path="/" exact component={Detail_History}/> */}
      </BrowserRouter>
    );
  }

}

export default connect(null, {keepLogin})(App)
