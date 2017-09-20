import React, { Component } from 'react';
import {connect} from 'react-redux';

class Header extends Component{
  render(){
    return(
      <div className="center-align">
        <h3>RogueLike</h3>
        <p style={{fontSize:'1.1rem'}}>Goal: Defeat the boss in the fourth floor</p>
        <div className="status">
          <div className="row">
            <div className="col m2">Health: {this.props.player.health}</div>
            <div className="col m2">Weapon: {this.props.player.weapon}</div>
            <div className="col m2">Power: {this.props.player.power}</div>
            <div className="col m2">Level: {this.props.player.level}</div>
            <div className="col m2">Next Level: {this.props.player.nextLevel}</div>
            <div className="col m2">Floor: {this.props.dungeon.floor}</div>
          </div>
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

export default connect(mapStateToProps)(Header);
