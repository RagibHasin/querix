import * as Qx from '../index'
import * as chai from 'chai'

describe('Query#Logical', () => {

  describe('$or', () => {
    it('should or with evaluated queries', () => {
      return chai.assert.deepEqual<any>(Qx().or(
        Qx().where('quantity').lt(20).eval(),
        Qx().where('price', 10).eval()
      ).eval(), { $or: [{ quantity: { $lt: 20 } }, { price: 10 }] })
    })

    it('should or with Query objects', () => {
      return chai.assert.deepEqual<any>(Qx().or(
        Qx().where('quantity').lt(20),
        Qx().where('price', 10)
      ).eval(), { $or: [{ quantity: { $lt: 20 } }, { price: 10 }] })
    })
  })

  describe('$and', () => {
    it('should and implicitly', () => {
      return chai.assert.deepEqual<any>(Qx().where('price').ne(1.99).exists(true).eval(),
        { price: { $ne: 1.99, $exists: true } })
    })

    it('should and with evaluated queries', () => {
      return chai.assert.deepEqual<any>(Qx().and(
        Qx().where('price').ne(1.99).eval(),
        Qx().where('price').exists(true).eval()
      ).eval(), { $and: [{ price: { $ne: 1.99 } }, { price: { $exists: true } }] })
    })

    it('should and with Query objects', () => {
      return chai.assert.deepEqual<any>(Qx().and(
        Qx().where('price').ne(1.99),
        Qx().where('price').exists(true)
      ).eval(), { $and: [{ price: { $ne: 1.99 } }, { price: { $exists: true } }] })
    })
  })

  describe('$not', () => {
    it('should be not with evaluated queries', () => {
      return chai.assert.deepEqual(Qx().where('price').not(Qx().gt(1.99).eval()).eval(),
        { price: { $not: { $gt: 1.99 } } })
    })

    it('should be not with Query objects', () => {
      return chai.assert.deepEqual(Qx().where('price').not(Qx().gt(1.99)).eval(),
        { price: { $not: { $gt: 1.99 } } })
    })
  })

  describe('$nor', () => {
    it('should be nor with evaluated queries', () => {
      return chai.assert.deepEqual(Qx().nor(
        Qx().where('price', 1.99).eval(),
        Qx().where('sale', true).eval()
      ).eval(), { $nor: [{ price: 1.99 }, { sale: true }] })
    })

    it('should be nor with Query objects', () => {
      return chai.assert.deepEqual(Qx().nor(
        Qx().where('price', 1.99),
        Qx().where('sale', true)
      ).eval(), { $nor: [{ price: 1.99 }, { sale: true }] })
    })
  })
})
