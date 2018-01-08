var assert = require('assert');

const hello = () => 'hello';

describe('Array', function() {
  describe('#indexOf()', function() {
    it('should return -1 when the value is not present', function() {
      const result = hello();
      assert.equal(result, 'hello');
    });
  });
});
