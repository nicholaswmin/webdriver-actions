'use strict'

const chai = require('chai')
const compatActionAssertion = require('./compat-action.assertion.js')

const WebdriverActions = require('../index.js')

chai.should()
chai.use(compatActionAssertion)

const outerActions = [
  {
    type: 'key',
    id: 'keyboard_1',
    actions: [
      { type: 'keyDown', value: '\uE00C' },
      { type: 'keyUp', value: '\uE00C' }
    ]
  },
  {
     type: 'pointer',
     id: 'pointer_1',
     parameters: { pointerType : 'mouse' },
     actions: [
       { type: 'pointerMove', 'duration': 0, x: 100, y: 100 },
       { type: 'pointerUp', 'button': 0 },
       { type: 'pointerDown', 'button': 0 }
     ]
   }
]

describe('static #transform', () => {
  let compatActions

  beforeEach(() => {
    compatActions = WebdriverActions.transform(outerActions)
  })

  it('should return all the inner commands', () => {
    compatActions.should.be.an('Array')
    compatActions.should.have.length(5)
  })

  it('should return commands that include the endpoint and payload(data)', () => {
    compatActions.forEach(action => {
      action.should.be.a.compatAction
    })
  })

  it('include the inner action as data', () => {
    compatActions[0].data.should.deep.equal(outerActions[0].actions[0])
  })

  describe('transformations', () => {
    it('should map keyDown to keydown', () => {
      compatActions[0].url.should.equal('keydown')
    })

    it('should map keyUp to keyup', () => {
      compatActions[1].url.should.equal('keyup')
    })

    it('should map pointerMove to moveto', () => {
      compatActions[2].url.should.equal('moveto')
    })

    it('should map pointerUp to buttonup', () => {
      compatActions[3].url.should.equal('buttonup')
    })

    it('should map pointerDown to buttondown', () => {
      compatActions[4].url.should.equal('buttondown')
    })
  })
})
