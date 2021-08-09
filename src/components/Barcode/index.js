import React, { Component } from 'react'
import QrReader from 'react-qr-scanner'

class Test extends Component {
  constructor(props){
    super(props)
    this.state = {
      delay: 100,
      result: 'No result',
    }

    this.handleScan = this.handleScan.bind(this)
  }
  handleScan(data){
    this.setState({
      result: data,
    })
  }
  handleError(err){
    console.error(err)
  }
  render(){
    if (typeof window === 'object') {
      const previewStyle = {
        height: 40,
        width: '100%',
      }
  
      return(
        <div>
          <QrReader
            delay={this.state.delay}
            style={previewStyle}
            onError={this.handleError}
            onScan={this.handleScan}
            />
          <p>{this.state.result}</p>
        </div>
      )
    }else{
      return null
    }
  }
}

export default Test