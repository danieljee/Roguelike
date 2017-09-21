import React, { Component } from 'react';
import {connect} from 'react-redux';
import $ from 'jquery';
import 'letteringjs/jquery.lettering.js';
import * as playerActions from '../actions/player';
class Death extends Component{
  componentDidMount(){
    $("#intro-text > h2").css('opacity',1).lettering('words').children("span").lettering().children("span").lettering();
    setTimeout(()=>{
      document.getElementById('tryAgain').style.visibility = 'visible';
    }, 15000);
  }

  render(){
    return(
      <div className="center-align" style={{marginTop:'30px'}}>
        <div className="intro-text" id="intro-text">
          <h2>You Died...</h2>
          <h2>Better luck next time!</h2>
          <h2>Press the button try again</h2>
        </div>
        <div id="tryAgainButtonDiv">
          <button id='tryAgain' className="btn-large" onClick={this.props.reset}>Try again!</button>
        </div>
      </div>
    );
  }
}


export default connect(null,playerActions)(Death);
