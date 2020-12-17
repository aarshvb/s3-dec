import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import { Storage } from 'aws-amplify'
import Amplify from 'aws-amplify';
import awsconfig from './aws-exports' ;
import {AmplifySignOut, withAuthenticator } from '@aws-amplify/ui-react'
import config from './aws-exports';
Amplify.configure(config);
Amplify.configure(awsconfig)

class App extends Component {
  state = { fileUrl: '', file: '', filename: '' }
  handleChange = e => {
    const file = e.target.files[0]
    this.setState({
      fileUrl: URL.createObjectURL(file),
      file,
      filename: file.name
    })

  }
  saveFile = async () => {
    await Storage.put(this.state.filename, this.state.file)
      .then(() => {
        console.log('successful')
        this.setState({ fileUrl: '', file: '', filename: ''})
      })
      .catch(err => {
        console.log('error', err)
      })
  }
  

  render(){
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <AmplifySignOut />
        <h1 className="App-Title"> Welcome to React </h1>
         
      
      </header>
      <input type='file' onChange={this.handleChange} />
      <img src={this.state.fileUrl} />
      <button onClick={this.saveFile}>Save File</button>
    </div>
  );
}
}
export default withAuthenticator(App, { includeGreetings: true });
