import React, { Component } from 'react';
import {connect} from 'react-redux';
import Map from '../utils/Map';
import Logic from '../utils/Logic';
import Death from './Death';
import Gameover from './Gameover';
import * as playerActions from '../actions/player';
import * as dungeonActions from '../actions/dungeon';
class Display extends Component{
  componentDidMount(){
      console.log('init');
      this.init();
      var myAudio = new Audio('/music/dungeonBGM.mp3');
      myAudio.addEventListener('ended', function() {
          this.currentTime = 0;
          this.play();
      }, false);
      myAudio.play();
      this.props.dungeonActions.addMusic(myAudio);
  }

  componentWillMount(){
    this.markUp = this.generateGrid();
  }

  componentWillReceiveProps(nextProp){
    //If the player died.
    if (nextProp.player.health <= 0){
      clearInterval(this.state.loopId);
      // this.resetGrid();
      // this.props.playerAction.reset(); //reset when the button in the gameover page is pressed?
    //If the player died and the state is reset.
    } else if (nextProp.player.reset){
      this.markUp = this.generateGrid();
      this.state.map.updateProperties(this.props.map, this.props.dungeon);
      this.state.map.createMap();
      this.state.logic.updateProps(this.props.map, this.props.dungeon, this.props.player, this.props.playerAction);
      this.setState({
        loopId: this.state.logic.initializeEventHandler()
      });
    //If the player leveled up.
    } else if (nextProp.player.level> this.props.player.level){
      this.state.logic.updateProps(nextProp.map, nextProp.dungeon, nextProp.player, this.props.playerAction);
    } else if (nextProp.dungeon.floor < this.props.dungeon.floor){
      this.resetGrid();
      this.state.map.updateProperties(nextProp.map, nextProp.dungeon);
      this.state.map.createMap();
      this.state.logic.updateProps(nextProp.map, nextProp.dungeon, nextProp.player, this.props.playerAction);
    } else if (nextProp.player.gameover){
      clearInterval(this.state.loopId);
    }
  }

  init(){
    const map = new Map(this.props.map, this.props.dungeon);
    map.createMap();
    const logic = new Logic(this.props.map, this.props.dungeon, this.props.player, this.props.playerAction);
    this.setState({
      map,
      logic,
      loopId: logic.initializeEventHandler()
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
    console.log('gen grid');
    return React.createElement('div', {id: 'map', style:{width:`${this.props.map.tileSize * this.props.map.columns}px`, height:`${this.props.map.tileSize * this.props.map.rows}px`}}, grid);
  }

  resetGrid(){
    [...document.getElementsByClassName('cell')].forEach((cell)=>{
      cell.className='cell wall';
    });
  }

  render(){
    if (this.props.player.health <= 0){
      this.markUp = <Death/>;
    } else if (this.props.player.gameover){
      this.markUp= <Gameover/>;
    }

    return(
      <div id='screen'>
        {this.markUp}
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
      },
      gameover: () => {
        dispatch(playerActions.gameover());
      },
    },
    dungeonActions: {
      addMusic: (obj) => {
        dispatch(dungeonActions.addMusic(obj));
      }
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Display);
