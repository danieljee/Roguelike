
class IntRandom{
  constructor(min, max){
    this.initMin = min;
    this.initMax = max;
    this.min = min;
    this.max = max;
  }

  random(){
    return Math.floor(Math.random() * (this.max - this.min + 1)) + this.min;
  }

  reset(){
    this.min = this.initMin;
    this.max = this.initMax;
    return this;
  }

  increaseMinMax(min, max){
    this.min += min;
    this.max += max;
    return this;
  }
}

export default IntRandom;
