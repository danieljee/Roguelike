import React, { Component } from 'react';
import {connect} from 'react-redux';
import $ from 'jquery';
import 'letteringjs/jquery.lettering.js';
import * as actions from '../actions/dungeon';
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
          <button id='tryAgain' className="btn-large">Try again!</button>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state){
  return {
    player: state.player,
    dungeon: state.dungeon
  };
}

export default connect(mapStateToProps,actions)(Death);
