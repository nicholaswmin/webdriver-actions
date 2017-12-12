'use strict'

module.exports = (chai, utils) => {

  utils.addProperty(chai.Assertion.prototype, 'compatAction', function () {
    this._obj.should.be.ok

    // url prop
    this._obj.should.have.property('url')
    this._obj.url.should.be.a('String')

    // data prop
    this._obj.should.have.property('data')
    this._obj.data.should.be.a('Object')
  })
}
