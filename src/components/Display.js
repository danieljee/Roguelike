import React, { Component } from 'react';
import {connect} from 'react-redux';
import Map from '../utils/Map';
import Logic from '../utils/Logic';

class Display extends Component{
  constructor(){
    super();
  }
  componentDidMount(){
    const map = new Map(this.props.map);
    const logic = new Logic(this.props.map);
    map.createMap();

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

  render(){
    return(
      <div>
        <div className="screen">
          {this.generateGrid()}
        </div>
      </div>
    );
  }
}

function mapStateToProps(state){
  return {
    map: state.map
  }
}

export default connect(mapStateToProps)(Display);
