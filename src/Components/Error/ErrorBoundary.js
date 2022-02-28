import React, { Component } from 'react'

export default class ErrorBoundary extends Component {
    constructor(props) {
        super(props);
        this.state = {hasError: false}
    }
    static getDerivedStateFromError(error){
        return {hasError: true}
    }

    componentDidCatch(error, errorInfo){
        console.log(error)
    }

  render() {
      if(this.state.hasError) {
          return (
              <div style={{textAlign:"center"}}>
                  <h1>Whoops!</h1>
                  <h2 >Something went wrong</h2>
              </div>
            )
      }
        return  this.props.children;
  }
}