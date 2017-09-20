import Materialize from 'materialize-css/dist/js/materialize.min.js';

class Logic{
  constructor(mapProps, dungeonProps, playerProps, playerActions){
    this.updateProps(mapProps, dungeonProps, playerProps, playerActions);
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
      if (this.hasObject(id-1+this.config.columns)){

      } else {
        this.player.style.left = `${left-this.config.tileSize}px`;
        this.player.style.top = `${top+this.config.tileSize}px`;
      }
    } else if (this.keyState[65] && this.keyState[87]){
      if (this.hasObject(id-1-this.config.columns)){

      } else {
        this.player.style.left = `${left-this.config.tileSize}px`;
        this.player.style.top = `${top-this.config.tileSize}px`;
      }
    } else if (this.keyState[68] && this.keyState[83]){
      if (this.hasObject(id+1+this.config.columns)){

      } else {
        this.player.style.left = `${left+this.config.tileSize}px`;
        this.player.style.top = `${top+this.config.tileSize}px`;
      }
    } else if (this.keyState[68] && this.keyState[87]){
      if (this.hasObject(id+1-this.config.columns)){

      } else {
        this.player.style.left = `${left+this.config.tileSize}px`;
        this.player.style.top = `${top-this.config.tileSize}px`;
      }
    } else {
      if (this.keyState[65]){
        if (this.hasObject(id-1)){

        } else {
          this.player.style.left = `${left-this.config.tileSize}px`;
        }
      }
      if (this.keyState[68]){
        if (this.hasObject(id+1)){

        } else {
            this.player.style.left = `${left+this.config.tileSize}px`;
        }
      }
      if (this.keyState[87]){
        if (this.hasObject(id-this.config.columns)){

        } else {
            this.player.style.top = `${top-this.config.tileSize}px`;
        }
      }
      if (this.keyState[83]){
        if (this.hasObject(id+this.config.columns)){

        } else {
          this.player.style.top = `${top+this.config.tileSize}px`;
        }
      }
    }
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
      Materialize.toast(`Gained Health: 20`, 1000)
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
      Materialize.toast(`Damage taken: ${this.dungeonConfig.weakMonsterDamage}`, 1000);
    } else if (cell.classList.contains('monster_2')){
      className='monster_2';
      monsterList = this.normalMonstersList;
      monsterExperience = this.dungeonConfig.normalMonsterExperience;
      this.playerActions.attackPlayer(this.dungeonConfig.normalMonsterDamage);
      this.playerHealth -= this.dungeonConfig.normalMonsterDamage;
      Materialize.toast(`Damage taken: ${this.dungeonConfig.normalMonsterDamage}`, 1000);
    } else if (cell.classList.contains('monster_3')){
      className='monster_3';
      monsterList = this.strongMonstersList;
      monsterExperience = this.dungeonConfig.strongMonsterExperience;
      this.playerActions.attackPlayer(this.dungeonConfig.strongMonsterDamage);
      this.playerHealth -= this.dungeonConfig.strongMonsterDamage;
      Materialize.toast(`Damage taken: ${this.dungeonConfig.strongMonsterDamage}`, 1000);
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
