var assert = chai.assert;

describe('IntRandom', function(){
    it('IntRandom should value within the range', function(){
      const min = 10;
      const max = 15;
      var intRandom = new IntRandom(min, max);

      assert(min <= intRandom.random() && max >= intRandom.random(), 'Int random value was not within the range');
    });
    it('IntRandom value should not exceed the range', function(){
      const min = 10;
      const max = 10;
      var intRandom = new IntRandom(min, max);

      assert.equal(intRandom.random(), 10, 'Int random value was not within the range');
    });
});
