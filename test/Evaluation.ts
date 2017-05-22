import * as Qx from '../index'
import * as chai from 'chai'

describe('Query#Evaluation', () => {

  describe('$mod', () => {
    it('should modulo', () => {
      return chai.assert.deepEqual(Qx().where('qty').mod(4, 0).eval(),
        { qty: { $mod: [4, 0] } })
    })
  })

  describe('$regex', () => {
    it('should be RegEx with option extacted', () => {
      return chai.assert.deepEqual(Qx().where('name').regex('/acme.*corp/si').eval(),
        { name: { $regex: 'acme.*corp', $options: "si" } })
    })

    it('should be RegEx inline', () => {
      return chai.assert.deepEqual(Qx().where('sku').regex(/789$/).eval(),
        { sku: { $regex: /789$/ } })
    })
  })

  describe('$text', () => {
    it('should be text query', () => {
      return chai.assert.deepEqual(Qx().text('"coffee shop"', 'none', true, false).eval(),
        {
          $text: {
            $search: "\"coffee shop\"",
            $language: 'none',
            $caseSensitive: true,
            $diacriticSensitive: false
          }
        })
    })
  })

  describe('$where', () => {
    it('should be where query with JS expression string', () => {
      return chai.assert.deepEqual(Qx().$where('this.credits == this.debits').eval(),
        { $where: "this.credits == this.debits" })
    })

    it('should be where query with JS function', () => {
      return chai.assert.deepEqual(typeof Qx().$where(function (this: any) {
        return this.credits == this.debits
      }).eval()['$where'],
        typeof function (this: any) {
          return this.credits == this.debits
        })
    })
  })
})
