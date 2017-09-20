
class IntRandom{
  constructor(min, max){
    this.min = min;
    this.max = max;
  }

  random(){
    return Math.floor(Math.random() * (this.max - this.min + 1)) + this.min;
  }

  increaseMinMax(min, max){
    this.min += min;
    this.max += max;
    return this;
  }
}

export default IntRandom;
