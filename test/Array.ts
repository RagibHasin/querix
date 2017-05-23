import * as Qx from '../index'
import * as chai from 'chai'

describe('Query#Array', () => {

  describe('$all', () => {
    it('should be all', () => {
      return chai.assert.deepEqual<any>(Qx('tags').all(['ssl', 'security']).eval(),
        { tags: { $all: [["ssl", "security"]] } })
    })
  })

  describe('$elemMatch', () => {
    it('should match elements', () => {
      return chai.assert.deepEqual<any>(Qx('results').elemMatch(Qx('product', 'xyz').where('score').gte(8)).eval(),
        { results: { $elemMatch: { product: "xyz", score: { $gte: 8 } } } })
    })
  })

  describe('$size', () => {
    it('should of given size', () => {
      return chai.assert.deepEqual(Qx('field').size(2).eval(),
        { field: { $size: 2 } })
    })
  })
})
