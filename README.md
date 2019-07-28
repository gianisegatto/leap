Welcome to leap context!
===================
I'm here to help the leap framework stack takes care of inversion control and dependency injection.

Why did you do it?
=================
As Java developer used to work with spring framework and getting passionated to NodeJs and JavaScript I was missing standards and the beauty of spring framework taking care of dependency injection and autowiring the components of my application.
I was looking for similar solutions but I didn't find any framework like spring for NodeJs.

Restrictions
=================
This framework is for developers which prefers Classes rather than Functions. It only works for classes and does the autowiring based on constructor arguments.
The constructor arguments needs to match the Classes from you application and your .js files must have the same name as the Classes.

### Correct application example:

Let's suppose your application has the following files:
```
----> js
--------> Foo.js
--------> Bar.js
```
#### This is the /js/Foo.js file:

```js
class Foo {

    constructor(bar) {

    }
}

module.exports = Foo;

```
#### This is the /js/Bar.js file:
```js
class Bar {

    constructor() {

    }
}

module.exports = Bar;

```
Given this example your application context is going to work very well because the framework is going to create first the instace of Bar and during the Foo instance creation will match the instance of Bar with the the Foo constructor arguments bar.

You should see an message like this:
You should see a message like this:
```bash
Cheers mate. Leap is up and running 🍻
```

### Wrong application example 1:
On this example we are going to simulate an application which has a component that needs a not declared (not found) component
Let's suppose your application has the following files:
root
```
----> js
--------> Foo.js
--------> Bar.js
```
#### This is the /js/Foo.js file:
```js
class Foo {

    constructor(bar) {

    }
}

module.exports = Foo;

```
#### This is the /js/Bar.js file:
```js
class Bar {

    constructor(bla) {

    }
}

module.exports = Bar;
```
Given this example your application context will not work because there is no Bla Class.

You should see an error message like this:
```bash
Oh Oh 💩
Something went wrong mate. The Leap context loader failed to load 2 component(s)
Cannot create component: /js/Bar.js
Cannot find parameter: bla
Cannot create component: /js/Foo.js
Cannot find parameter: bar
```

### Wrong application example 2:
On this example we are going to simulate an application which has a .js file with one name and the class declaration with a different name.

Let's suppose your application has the following files:
root
```
----> js
--------> Foo.js
--------> Bar.js
```
#### This is the /js/Foo.js file:
```js
class Foo {

    constructor(bar) {

    }
}

module.exports = Foo;

```
#### This is the /js/Bar.js file:
```js
class Blar {

    constructor() {

    }
}

module.exports = Blar;
```
Given this example your application context will not work because the Bar.js file doesn't match to the Blar class name.

You should see this error message:
```bash
Oh Oh 💩
Something went wrong mate. The Leap context loader failed to load 0 duplicated components
The following files name dont match to its class name!
File: /js/Bar.js - Class Name: Blar
```

### Wrong application example 3:
On this example we are going to simulate an application which has duplicate file and class names.

Let's suppose your application has the following files:
root
```
----> js
--------> Foo.js
--------> Bar.js
--------> folder
---------------> Bar.js
```
#### This is the /js/Foo.js file:
```js
class Foo {

    constructor(bar) {

    }
}

module.exports = Foo;

```
#### This is the /js/Bar.js file:
```js
class Bar {

    constructor() {

    }
}

module.exports = Bar;
```
#### This is the /js/folder/Bar.js class:
```js
class Bar {

    constructor() {

    }
}

module.exports = Bar;
```

Given this example your application context will not work because the Bar file twice.

You should see this error message:
```bash
Oh Oh 💩
Something went wrong mate. The Leap context loader failed to load 2 duplicated components
The following files have the same name. To make the context load properly you should rename the files!
File: /js/Bar.js
File: /js/folder/Bar.js
```

# The last but not the least
Sometimes your classes receives a simple property as parameter. For example you have a server class which needs do receive the port number to make your server starts to listen to that port.
Using leap context it's quite simple, you just need to follow this project structure recipe:

root
```
----> src
--------> main
-------------> node
------------------> Foo.js
------------------> Bar.js
------------------> Server.js
------------------> folder
-------------------------> Bar.js
-------------> resources
-----------------------> application.json
```
Let's take a look at the Server.js file:
#### This is the /src/main/node/Server.js file:
```js
class Server {

    constructor(port) {
        console.log("Port: " + port);
    }
}

module.exports = Server;
```
This class is just saying a need something called port and as you saw above on the project structure there is not file called Port. So based on the previous examples it should fail to load, but not. Let's take a look to the new file application.json:
#### This is the /src/main/resources/application.json file:
```json
{
    "server": {
        "port": 8080
    }
}
```
When you need to load a simple propety like the Server Port you just need an application.json file following the example above. The framework is going to pick the class name + the property name and try to find it at the application.json file.
On the example we are using would be:
```js
 class Server { // class name to be used at the application.json file

    constructor(port) { // constructor argument to be used at the application.json file
        console.log("Port: " + port);
    }
}   
```
Running the example above you should see from your console:
```bash
Configuration file not found: /Users/gianisegatto/workEnvironment/node/leap-context/test/example/src/main/resources/application-local.json ##### Ignore this line we can talk about it after
Port: 8080 ### This is the port number injected from the application.json file server.port
Cheers mate. Leap is up and running 🍻
```

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

I hope this doc can help you a bit and I'll do my best to bring more details.

## Feel free to bring any suggestion or sending a pull request and as soon I get more inspired I'll update better this page