Welcome to leap context!
===================
I'm here to help the leap framework stack takes care of inversion control and dependency injection.

Why did you do it?
=================
As Java developer used to work with spring framework and getting passionated to NodeJs and JavaScript I was missing standards and the beauty of spring framework taking care of dependency injection and autowiring the components of my application.
I was looking for similar solutions but I didn't find any framework like spring for NodeJs.

Restrictions
=================
This framework is for developers which prefers Classes rather than Functions. It only works for classes and does the autowiring based on constructor parameters.
The constructor parameters needs to match the Classes from you application and your .js files must have the same name as your Classes.

### For example:

Let's suppose your application has the following files:
```
----> js
--------> Foo.js
--------> Bar.js
```
#### This is the Foo class:

```js
class Foo {

    constructor(bar) {

    }
}

module.exports = Foo;

```
#### This is the Bar class:
```js
class Bar {

    constructor() {

    }
}

module.exports = Foo;

```
Given this example your application context is going to work very well because the framework is going to create first the instace of Bar and during the Foo instance creation will match the instance of Bar with the the Foo constructor parameter bar.
So remember if the context cannot find the any class which can be used to the construtor parameter the leap context will not load successfuly.

### For example:
Let's suppos win your application o have the following files:
root
```
----> js
--------> Foo.js
--------> Bar.js
```
```js
class Foo {

    constructor(bar) {

    }
}

module.exports = Foo;

```
#### This is the Bar class:
```js
class Bar {

    constructor(bla) {

    }
}
```
Given this example your application context will not work because in your application there is no Bla Class.

How to use me:
=================
```js
const ContextLoader = require("leap-context").ContextLoader;

const PATH = process.cwd() + "/the-root-path-of-your-app/";

const contextLoader = new ContextLoader();

const context = contextLoader.load(PATH);
```
If everything in your application is right you should get back from contextLoader.load a list of instancies of your application classes.

You should see a message like this:
```bash
Cheers mate. Leap is up and running 🍻
```

Otherwise if something is wrong.
You should see a message like this:
```bash
Oh Oh 💩
Something went wrong mate. The Leap context loader failed to load 2 component(s)
Cannot create component: /example/Bar.js
Cannot find parameter: bla
Cannot create component: /example/Foo.js
Cannot find parameter: bar
```

I hope this doc can help you a bit and I'll do my best to bring more details.

## Feel free to bring any suggestion or sending a pull request and as soon I get more inspired I'll update better this page