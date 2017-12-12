'use strict'

class WebDriverActions {
  constructor() {

  }

  static transform(outerActions, { activeElementId }) {
    return outerActions.reduce((arr, outerAction) => {
      arr = arr.concat(outerAction.actions.reduce((arr, action) => {
        arr.push({
          url: this.getMap({ activeElementId })[outerAction.type][action.type],
          data: action.hasOwnProperty('x') && action.hasOwnProperty('y') ?
                Object.assign(action, { xoffset: action.x, yoffset: action.y }) :
                action
        })

        return arr
      }, []))

      return arr
    }, [])
  }

  static getMap({ activeElementId }) {
    return {
      key: {
        keyDown: `element/${activeElementId}/value`,
        keyUp: `element/${activeElementId}/value`,
      },
      pointer: {
        pointerMove: 'moveto',
        pointerDown: 'buttondown',
        pointerUp: 'buttonup'
      }
    }
  }
}

module.exports = WebDriverActions
