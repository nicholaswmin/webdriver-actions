'use strict'

class WebDriverActions {
  constructor() {

  }

  static transform(outerActions, { activeElementId }) {
    return outerActions.reduce((arr, outerAction) => {
      arr = arr.concat(outerAction.actions.reduce((arr, action) => {
        arr.push({
          url: this.getMap({ activeElementId })[outerAction.type][action.type],
          data: this.createPayloadForAction({ type: outerAction.type, action })
        })

        return arr
      }, []))

      return arr
    }, [])
  }

  static createPayloadForAction({ type, action }) {
    switch (type) {
      case 'key':
        return { value: [ action.value ] }
        break;
      case 'pointer':
        switch (action.type) {
          case 'pointerMove':
            return {
              xoffset: action.x,
              yoffset: action.y
            }
            break;
          default:
          return {
            button: action.button
          }
        }
        break;
      default:
        return action
    }
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
