import React, { Component } from 'react';
import {connect} from 'react-redux';

class Header extends Component{
  render(){
    return(
      <div className="center-align">
        <h3>RogueLike</h3>
        <div className="status">
          <div className="row">
            <div className="col m2">Health: 50</div>
            <div className="col m2">Weapon: Stick</div>
            <div className="col m2">Power: 10</div>
            <div className="col m2">Level: 0</div>
            <div className="col m2">Experience: 20</div>
            <div className="col m2">Dungeon: 0</div>
          </div>
        </div>
      </div>
    );
  }
}

export default Header;
