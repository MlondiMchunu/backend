const {test} = require('node:test')
const assert = require('node:assert')

const reverse = require('../utils/for_testing').reverse

test('reverse of a', ()=>{
    const result = reverse('a')

    assert.strictEqual(result, 'a')
})