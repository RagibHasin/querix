import * as Qx from '../index'
import * as chai from 'chai'

describe('Query', () => {

  describe('$eq', () => {
    it('should be equal explicitly', () => {
      return chai.assert.deepEqual(Qx().where('item.name').eq('ab').eval(), { "item.name": { $eq: "ab" } })
    })

    it('should be equal implicitly', () => {
      return chai.assert.deepEqual(Qx().where('item.name', 'ab').eval(), { "item.name": "ab" })
    })
  })

  describe('$gt', () => {
    it('should be greater than', () => {
      return chai.assert.deepEqual(Qx().where('qty').gt(20).eval(), { qty: { $gt: 20 } })
    })
  })

  describe('$lt', () => {
    it('should be less than', () => {
      return chai.assert.deepEqual(Qx().where('qty').lt(20).eval(), { qty: { $lt: 20 } })
    })
  })

  describe('$gte', () => {
    it('should be greater than or equal', () => {
      return chai.assert.deepEqual(Qx().where('qty').gte(20).eval(), { qty: { $gte: 20 } })
    })
  })

  describe('$lte', () => {
    it('should be less than equal', () => {
      return chai.assert.deepEqual(Qx().where('qty').lte(20).eval(), { qty: { $lte: 20 } })
    })
  })

  describe('$ne', () => {
    it('should not be equal', () => {
      return chai.assert.deepEqual(Qx().where('qty').ne(20).eval(), { qty: { $ne: 20 } })
    })
  })

  describe('$in', () => {
    it('should be in', () => {
      return chai.assert.deepEqual(Qx().where('qty').in(5, 15).eval(), { qty: { $in: [5, 15] } })
    })
  })

  describe('$nin', () => {
    it('should not be in', () => {
      return chai.assert.deepEqual(Qx().where('qty').nin(5, 15).eval(), { qty: { $nin: [5, 15] } })
    })
  })
})
