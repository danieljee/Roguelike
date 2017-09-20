import Materialize from 'materialize-css/dist/js/materialize.min.js';

const playerDirection = {
  DOWN: 'down',
  UP: 'up',
  LEFT: 'left',
  RIGHT: 'right',
  UPLEFT: 'upLeft',
  UPRIGHT: 'upRight',
  DOWNLEFT: 'downLeft',
  DOWNRIGHT: 'downRight'
};

class Logic{
  constructor(mapProps, dungeonProps, playerProps, playerActions){
    this.updateProps(mapProps, dungeonProps, playerProps, playerActions);
    this.moveScroll();
  }

  updateProps(mapProps, dungeonProps, playerProps, playerActions){
    this.config = mapProps;
    this.dungeonConfig = dungeonProps;
    this.playerConfig = playerProps,
    this.playerHealth = playerProps.health;
    this.playerNextLevel =  playerProps.nextLevel;
    this.playerActions = playerActions;
    this.keyState = {};
    this.weakMonstersList = [];
    this.normalMonstersList = [];
    this.strongMonstersList = [];
    this.bossList = [];
    this.stepsTaken=0;
    this.lastDirection= playerDirection.RIGHT;
    [...document.getElementsByClassName('monster_1')].forEach((monster)=>{
      this.weakMonstersList.push({
        id: monster.id,
        health: this.dungeonConfig.weakMonsterHealth,
        power: this.dungeonConfig.weakMonsterDamage
      });
    });
    [...document.getElementsByClassName('monster_2')].forEach((monster)=>{
      this.normalMonstersList.push({
        id: monster.id,
        health: this.dungeonConfig.normalMonsterHealth,
        power: this.dungeonConfig.normalMonsterDamage
      });
    });
    [...document.getElementsByClassName('monster_3')].forEach((monster)=>{
      this.strongMonstersList.push({
        id: monster.id,
        health: this.dungeonConfig.strongMonsterHealth,
        power: this.dungeonConfig.strongMonsterDamage
      });
    });

    var boss = document.getElementsByClassName('boss')[0];
    if (boss){
      this.bossList.push({
        id:boss.id,
        health:this.dungeonConfig.bossHealth,
        power: this.dungeonConfig.bossDamage
      });
    }
  }

  initializeEventHandler(){
    document.addEventListener('keydown', (e) => {
      this.keyState[e.keyCode || e.which] = true;
    });
    document.addEventListener('keyup', (e) => {
      this.keyState[e.keyCode || e.which] = false;
    });
    //return loop id to Display?
    return setInterval(this.playerKeyEventHandler.bind(this), 100);
  }

  playerKeyEventHandler(){
    this.player = document.getElementById('player');
    const left = parseInt(this.player.style.left, 10);
    const top = parseInt(this.player.style.top, 10);
    const x= left/ this.config.tileSize;
    const y=  top/ this.config.tileSize;
    const id = x + y * this.config.columns;
    var tileSize = this.config.tileSize;
    if (this.keyState[65] && this.keyState[83]){
      this.movingAction(playerDirection.DOWNLEFT);
      if (this.hasObject(id-1+this.config.columns)){

      } else {
        this.player.style.left = `${left-this.config.tileSize}px`;
        this.player.style.top = `${top+this.config.tileSize}px`;
      }
    } else if (this.keyState[65] && this.keyState[87]){
      this.movingAction(playerDirection.UPLEFT);
      if (this.hasObject(id-1-this.config.columns)){

      } else {
        this.player.style.left = `${left-this.config.tileSize}px`;
        this.player.style.top = `${top-this.config.tileSize}px`;
      }
    } else if (this.keyState[68] && this.keyState[83]){
      this.movingAction(playerDirection.DOWNRIGHT);
      if (this.hasObject(id+1+this.config.columns)){

      } else {
        this.player.style.left = `${left+this.config.tileSize}px`;
        this.player.style.top = `${top+this.config.tileSize}px`;
      }
    } else if (this.keyState[68] && this.keyState[87]){
      this.movingAction(playerDirection.UPRIGHT);
      if (this.hasObject(id+1-this.config.columns)){

      } else {
        this.player.style.left = `${left+this.config.tileSize}px`;
        this.player.style.top = `${top-this.config.tileSize}px`;
      }
    } else {
      if (this.keyState[65]){
        this.movingAction(playerDirection.LEFT);
        if (this.hasObject(id-1)){

        } else {
          this.player.style.left = `${left-this.config.tileSize}px`;
        }
      }
      if (this.keyState[68]){
        this.movingAction(playerDirection.RIGHT);
        if (this.hasObject(id+1)){

        } else {
            this.player.style.left = `${left+this.config.tileSize}px`;
        }
      }
      if (this.keyState[87]){
        this.movingAction(playerDirection.UP);
        if (this.hasObject(id-this.config.columns)){

        } else {
            this.player.style.top = `${top-this.config.tileSize}px`;
        }
      }
      if (this.keyState[83]){
        this.movingAction(playerDirection.DOWN);
        if (this.hasObject(id+this.config.columns)){

        } else {
          this.player.style.top = `${top+this.config.tileSize}px`;
        }
      }
    }
    this.moveScroll();
  }

  moveScroll(){
    const screen = document.getElementById('screen');
    screen.scrollTop = document.getElementById('player').offsetTop - screen.offsetHeight/2;
    screen.scrollLeft = document.getElementById('player').offsetLeft - screen.offsetWidth/2;
  }

  movingAction(direction){
    if (this.lastDirection !== direction){
      this.stepsTaken = 0;
    }
    this.stepsTaken++;
    this.lastDirection = direction;
    this.removeAllMovement();
    switch(direction){
      case playerDirection.DOWN:
        if (this.stepsTaken%4 === 1){
          this.player.classList.add('playerDown_1');
        } else if (this.stepsTaken%4 === 2){
          this.player.classList.add('playerDown_0');
        } else if (this.stepsTaken%4 === 3) {
          this.player.classList.add('playerDown_2');
        } else {
          this.player.classList.add('playerDown_0');
        }
        return;
      case playerDirection.UP:
        if (this.stepsTaken%4 === 1){
          this.player.classList.add('playerUp_1');
        } else if (this.stepsTaken%4 === 2){
          this.player.classList.add('playerUp_0');
        } else if (this.stepsTaken%4 === 3) {
          this.player.classList.add('playerUp_2');
        } else {
          this.player.classList.add('playerUp_0');
        }
        return;
      case playerDirection.LEFT:
        if (this.stepsTaken%4 === 1){
          this.player.classList.add('playerLeft_1');
        } else if (this.stepsTaken%4 === 2){
          this.player.classList.add('playerLeft_0');
        } else if (this.stepsTaken%4 === 3) {
          this.player.classList.add('playerLeft_2');
        } else {
          this.player.classList.add('playerLeft_0');
        }
        return;
      case playerDirection.RIGHT:
        if (this.stepsTaken%4 === 1){
          this.player.classList.add('playerRight_1');
        } else if (this.stepsTaken%4 === 2){
          this.player.classList.add('playerRight_0');
        } else if (this.stepsTaken%4 === 3) {
          this.player.classList.add('playerRight_2');
        } else {
          this.player.classList.add('playerRight_0');
        }
        return;
      case playerDirection.UPLEFT:
        if (this.stepsTaken%4 === 1){
          this.player.classList.add('playerUpLeft_1');
        } else if (this.stepsTaken%4 === 2){
          this.player.classList.add('playerUpLeft_0');
        } else if (this.stepsTaken%4 === 3) {
          this.player.classList.add('playerUpLeft_2');
        } else {
          this.player.classList.add('playerUpLeft_0');
        }
        return;
      case playerDirection.UPRIGHT:
        if (this.stepsTaken%4 === 1){
          this.player.classList.add('playerUpRight_1');
        } else if (this.stepsTaken%4 === 2){
          this.player.classList.add('playerUpRight_0');
        } else if (this.stepsTaken%4 === 3) {
          this.player.classList.add('playerUpRight_2');
        } else {
          this.player.classList.add('playerUpRight_0');
        }
        return;
      case playerDirection.DOWNLEFT:
        if (this.stepsTaken%4 === 1){
          this.player.classList.add('playerDownLeft_1');
        } else if (this.stepsTaken%4 === 2){
          this.player.classList.add('playerDownLeft_0');
        } else if (this.stepsTaken%4 === 3) {
          this.player.classList.add('playerDownLeft_2');
        } else {
          this.player.classList.add('playerDownLeft_0');
        }
        return;
      case playerDirection.DOWNRIGHT:
        if (this.stepsTaken%4 === 1){
          this.player.classList.add('playerDownRight_1');
        } else if (this.stepsTaken%4 === 2){
          this.player.classList.add('playerDownRight_0');
        } else if (this.stepsTaken%4 === 3) {
          this.player.classList.add('playerDownRight_2');
        } else {
          this.player.classList.add('playerDownRight_0');
        }
        return;
    }
  }

  removeAllMovement(){
    this.player.classList.remove('playerLeft_0');
    this.player.classList.remove('playerLeft_1');
    this.player.classList.remove('playerLeft_2');
    this.player.classList.remove('playerRight_0');
    this.player.classList.remove('playerRight_1');
    this.player.classList.remove('playerRight_2');
    this.player.classList.remove('playerDown_0');
    this.player.classList.remove('playerDown_1');
    this.player.classList.remove('playerDown_2');
    this.player.classList.remove('playerUp_0');
    this.player.classList.remove('playerUp_1');
    this.player.classList.remove('playerUp_2');
    this.player.classList.remove('playerUpRight_0');
    this.player.classList.remove('playerUpRight_1');
    this.player.classList.remove('playerUpRight_2');
    this.player.classList.remove('playerUpLeft_0');
    this.player.classList.remove('playerUpLeft_1');
    this.player.classList.remove('playerUpLeft_2');
    this.player.classList.remove('playerDownRight_0');
    this.player.classList.remove('playerDownRight_1');
    this.player.classList.remove('playerDownRight_2');
    this.player.classList.remove('playerDownLeft_0');
    this.player.classList.remove('playerDownLeft_1');
    this.player.classList.remove('playerDownLeft_2');
  }

  hasObject(id){
    const cell = document.getElementById(id);
    if(cell.classList.contains('wall')){
      return true;
    } else if (cell.classList.contains('monster')){
      this.fightMonster(cell);
      return true;
    } else if (cell.classList.contains('potion')){
      this.playerActions.drinkPotion(20);
      this.playerHealth += 20;
      cell.classList.remove('potion');
      Materialize.toast(`Gained Health: 20`, 800)
    } else if (cell.classList.contains('stair')){
      this.playerActions.goDown();
    }
    return false;
  }

  fightMonster(cell){
    var monsterList;
    var monsterExperience;
    var className;
    if(cell.classList.contains('monster_1')){
      className='monster_1';
      monsterList = this.weakMonstersList;
      monsterExperience = this.dungeonConfig.weakMonsterExperience;
      this.playerActions.attackPlayer(this.dungeonConfig.weakMonsterDamage);
      this.playerHealth -= this.dungeonConfig.weakMonsterDamage;
      Materialize.toast(`Damage taken: ${this.dungeonConfig.weakMonsterDamage}`, 800);
    } else if (cell.classList.contains('monster_2')){
      className='monster_2';
      monsterList = this.normalMonstersList;
      monsterExperience = this.dungeonConfig.normalMonsterExperience;
      this.playerActions.attackPlayer(this.dungeonConfig.normalMonsterDamage);
      this.playerHealth -= this.dungeonConfig.normalMonsterDamage;
      Materialize.toast(`Damage taken: ${this.dungeonConfig.normalMonsterDamage}`, 800);
    } else if (cell.classList.contains('monster_3')){
      className='monster_3';
      monsterList = this.strongMonstersList;
      monsterExperience = this.dungeonConfig.strongMonsterExperience;
      this.playerActions.attackPlayer(this.dungeonConfig.strongMonsterDamage);
      this.playerHealth -= this.dungeonConfig.strongMonsterDamage;
      Materialize.toast(`Damage taken: ${this.dungeonConfig.strongMonsterDamage}`, 800);
    } else if (cell.classList.contains('boss')){
      className = 'boss';
      monsterList = this.bossList;
      monsterExperience = this.dungeonConfig.bossExperience;
      this.playerActions.attackPlayer(this.dungeonConfig.bossDamage);
      this.playerHealth -= this.dungeonConfig.bossDamage;
      Materialize.toast(`Damage taken: ${this.dungeonConfig.bossDamage}`, 800);
    }
    if (this.playerHealth <=0) return;

    monsterList.forEach((monster, i) => {
      if (monster.id === cell.id){
        monster.health -= this.playerConfig.power;
        if (monster.health <= 0){
          this.playerNextLevel -= monsterExperience;
          this.playerActions.gainExperience(monsterExperience);
          monsterList.splice(i, 1);
          cell.classList.remove(className);
          cell.classList.remove('monster');
          if (className === 'boss'){
            setTimeout(()=>{
              console.log('You\'ve defeated the boss!');
            }, 1000);
          }
        }
      }
    });

    if (this.playerNextLevel <= 0){
      this.playerActions.levelUp();
    }
  }
}

//Only clear interval upon death? Store all redux data into this class?

export default Logic;
