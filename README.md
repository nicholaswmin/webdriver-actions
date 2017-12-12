# webdriver-actions

[![Build Status](https://travis-ci.org/nicholaswmin/webdriver-actions.svg?branch=master)](https://travis-ci.org/nicholaswmin/webdriver-actions)

Backwards-compatible W3C [WebDriver][webdriver-spec] [Actions API][actions-api]
commands.

**Important:** This is still a WIP. Most actions are not implemented yet.

---

As of December 2017 the [Actions API][actions-api] is only implemented in
[geckodriver][geckodriver].

This module takes a series of Actions API compatible actions and transforms
them to backwards-compatible WebDriver commands that work with current versions
of [chromedriver][chromedriver] and [safaridriver][safaridriver] -
where possible.

This should become obsolete as soon as all modern browser web-drivers support
the Actions API.

You can track chromedriver's progress [here][chromedriver-features-schedule].

## Usage

```bash
$ npm i --save webdriver-actions
```

```javascript
const WebdriverActions = require('webdriver-actions')

// - 1st argument, an object containing W3C Actions
// - 2nd argument, the active element ID - will be used to dispatch keyboard
//   values
const commands = WebdriverActions.transform([
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
], { activeElementId: 'foo-active-element-id'})

console.log(commands)

/*
[
  {
    "url": "element/foo/value",
    "data": {
      "value": [ "" ]
    }
  },
  {
    "url": "element/foo/value",
    "data": {
      "value": [ "" ]
    }
  },
  {
    "url": "moveto",
    "data": {
      "xoffset": 100,
      "yoffset": 100
    }
  },
  {
    "url": "buttonup",
    "data": {
      "button": 0
    }
  },
  {
    "url": "buttondown",
    "data": {
      "button": 0
    }
  }
]
*/
```

## Test

```bash
npm test
```


## Authors

- [Nicholas Kyriakides, @nicholaswmin][nicholaswmin]

## License

MIT


[webdriver-spec]: https://www.w3.org/TR/webdriver/
[actions-api]: https://www.w3.org/TR/webdriver/#actions
[geckodriver]: https://github.com/mozilla/geckodriver
[chromedriver]: https://sites.google.com/a/chromium.org/chromedriver/
[safaridriver]: https://webkit.org/blog/6900/webdriver-support-in-safari-10/
[chromedriver-features-schedule]: https://chromium.googlesource.com/chromium/src/+/master/docs/chromedriver_status.md
[nicholaswmin]: https://github.com/nicholaswmin
