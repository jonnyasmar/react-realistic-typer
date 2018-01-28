# react-realistic-typer
A simple React component that outputs text in a way that simulates human typing.

*Requires `React 16.2` or later (due to its dependency on `React.Fragment`).*

## Usage
`RealisticTyper` is the `React` component provided by `react-realistic-typer` and is very easy to use:

### Install
At the root of your project:
```
npm install --save react-realistic-typer
```

### Import
Somewhere in your `React` app:
```
import { RealisticTyper } from 'react-realistic-typer'
```

or, if you're old-school:
```
const RealisticTyper = require('react-realistic-typer').RealisticTyper;
```

### Implement
In it's simplest form:
```
<RealisticTyper message="Hello world!"/>
```

With all available options:
```
/*
 * @param {string} message - The message to be typed.
 * @param {number} [wpm=160] - Target words/minute to type at.
 * @param {number} [maxVariance=.5] - The maximum percentage variance in decimal format to delay
 *   keystrokes.
 * @param {number} [maxPause=500] - The maximum pause in milliseconds to simulate when
 *   encountering non-alphabetical characters.
 */
<RealisticTyper
    message="Hello world!"
    wpm={160}
    maxVariance={.5}
    maxPause={500}
/>
```

**Please don't forget to star this repo if you find it useful!**

### Notes
- `RealisticTyper` begins typing as soon as it is mounted.
- If the `message` prop is updated on a mounted `RealisticTyper`, it will clear any existing output and begin typing the new message.
- `react-realistic-typer` leverages `React 16.2`'s `Fragment` component, so it only renders the message being typed.