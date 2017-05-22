import * as Qx from '../index'
import * as chai from 'chai'

describe('Query#Elements', () => {

  describe('$exists', () => {
    it('should exist', () => {
      return chai.assert.deepEqual(Qx().where('qty').exists().nin(5, 15).eval(),
        { qty: { $exists: true, $nin: [5, 15] } })
    })
  })

  describe('$type', () => {
    it('should be typed', () => {
      return chai.assert.deepEqual(Qx().where('zipCode').type('string').eval(),
        { "zipCode": { $type: "string" } })
    })
  })
})
