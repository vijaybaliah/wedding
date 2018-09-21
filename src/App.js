import React, { Component } from 'react'
import { connect } from 'react-redux'
import './App.css'
import Main from './containers/main'

class App extends Component {
  componentWillMount() {
    // if (!context.user) return app.login()
  }
  render2() {
    // eslint-disable-next-line
    const { type, payload: params } = this.props.router
    switch (type) {
        case 'HOME':
            return <Main />
        default: 
            return <div>Page not found</div>
    }
  }
  render() {
    try {
        return this.render2()
    } catch(err) {
        return (<div className="error">{err}</div>)
    }
  }
}

const mapStateToProps = state => ({ router: state.router })

export default connect(mapStateToProps)(App)
