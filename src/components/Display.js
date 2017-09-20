import React, { Component } from 'react';
import {connect} from 'react-redux';
import Map from '../utils/Map';
import Logic from '../utils/Logic';
import * as playerActions from '../actions/player';
class Display extends Component{
  componentDidMount(){
    this.init();
    window.onclick = () => {
      document.getElementById('gameOverPopUp').style.display = "none";
    }
  }

  componentWillReceiveProps(nextProp){
    console.log('new prop received');
    //If the player died.
    if (nextProp.player.health <= 0){
      console.log('1');
      this.resetGrid();
      this.props.playerAction.reset();
      document.getElementById('gameOverPopUp').style.display = "block";
    //If the player died and the state is reset.
    } else if (nextProp.player.reset){
      console.log('2');
      this.state.map.updateProperties(nextProp.map, nextProp.dungeon);
      this.state.map.createMap();
      this.state.logic.updateProps(nextProp.map, nextProp.dungeon, nextProp.player, this.props.playerAction);
    //If the player leveled up.
    } else if (nextProp.player.level> this.props.player.level){
      console.log('3');
      this.state.logic.updateProps(nextProp.map, nextProp.dungeon, nextProp.player, this.props.playerAction);
    } else if (nextProp.dungeon.floor < this.props.dungeon.floor){
      this.resetGrid();
      console.log('reset grid');
      this.state.map.updateProperties(nextProp.map, nextProp.dungeon);
      this.state.map.createMap();
      this.state.logic.updateProps(nextProp.map, nextProp.dungeon, nextProp.player, this.props.playerAction);
    }
  }

  init(){
    const map = new Map(this.props.map, this.props.dungeon);
    map.createMap();
    this.setState({
      map,
      logic: new Logic(this.props.map, this.props.dungeon, this.props.player, this.props.playerAction)
    }, () => {
      this.state.logic.initializeEventHandler();
    });
  }

  generateGrid(){
    const tileSize = `${this.props.map.tileSize}px`;
    const columns = this.props.map.columns;
    const rows = this.props.map.rows;
    const total = columns * rows;
    var grid = []
    for (var i=0; i<total; i++){
        let classN= 'cell wall';
        grid.push(<div key={i+1234} id={i} className={classN} style={{width:tileSize, height:tileSize}}></div>)
    }
    return React.createElement('div', {id: 'map', style:{width:`${this.props.map.tileSize * this.props.map.columns}px`, height:`${this.props.map.tileSize * this.props.map.rows}px`}}, grid);
  }

  resetGrid(){
    [...document.getElementsByClassName('cell')].forEach((cell)=>{
      cell.className='cell wall';
    });
  }

  render(){
    return(
      <div>
        <div id="gameOverPopUp" className="popUp">
          <div className="modal-content">
            <span className="close" onClick={()=>{document.getElementById('gameOverPopUp').style.display = "none";}}>&times;</span>
            <p>You died...</p>
          </div>
        </div>
        <div className="screen">
          {this.generateGrid()}
        </div>
      </div>
    );
  }
}

function mapStateToProps(state){
  return {
    map: state.map,
    player: state.player,
    dungeon: state.dungeon
  };
}

function mapDispatchToProps(dispatch){
  return{
    playerAction: {
      attackPlayer: (damage)=>{
        dispatch(playerActions.attackPlayer(damage));
      },
      drinkPotion: (health)=>{
        dispatch(playerActions.drinkPotion(health));
      },
      reset: () => {
        dispatch(playerActions.reset());
      },
      gainExperience: (experience) => {
        dispatch(playerActions.gainExperience(experience));
      },
      levelUp: () => {
        dispatch(playerActions.levelUp());
      },
      goDown: () => {
        dispatch(playerActions.goDown());
      }
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Display);
