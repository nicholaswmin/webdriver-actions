'use strict'

class WebDriverActions {
  constructor() {

  }

  static transform(outerActions) {
    return outerActions.reduce((arr, outerAction) => {
      arr = arr.concat(outerAction.actions.reduce((arr, action) => {
        arr.push({
          url: this.getMap()[outerAction.type][action.type],
          data: action.x && action.y ?
                Object.assign(action, { xOffset: action.x, yOffset: action.y }) :
                action
        })

        return arr
      }, []))

      return arr
    }, [])
  }

  static getMap() {
    return {
      key: {
        keyDown: 'keydown',
        keyUp: 'keyup'
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
