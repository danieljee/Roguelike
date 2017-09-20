import React, { Component } from 'react';
import {connect} from 'react-redux';
import Header from './Header';
import Footer from './Footer';
import Display from './Display';
class App extends Component {

  render() {
    return (
      <div>
        <Header/>
        <Display />
        <Footer />
      </div>
    );
  }
}

export default App;
