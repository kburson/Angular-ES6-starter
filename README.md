# Angular ES6 starter

This is my starter app for building AngularJS SPA using ES6 with gulp and either SystemJS as the module loader and 
systemjs-builder as the bundler, or webpack as the module bundler.

My goal is to have a development environment that allows quick and easy modification of scripts with rapid feedback.

Also, I want to leverage ES6 modules to break the code into smaller chunks.  

It would be nice to use the latest Angular-Router
and set the routes on each module separately rather than in a nested routing table at the root level, this would allow
inclusion/exclusion of individual modules without having to edit the routing table.

I would like to be able to edit code and run unit tests against the raw source, having karma transpile the code and serve from memory.

I would like to compile and host the static assets from a build folder to verify all aspects of the build.

I would like to package all the assets into a distributable artifact.  Should this artifact be a zip of individual asset files that
are loaded on demand by the module loader, or should it be a bundle of all the assets that get loaded in a single request from the browser.
Studies into HTTP/2 show that the former is a better solution, and that the latter will actually hurt performance; but HTTP/2
is not universally available at this time.  In contrast, HTTP/1 has specified performance challenges when using multiple
sockets to download several files concurrently.  While this has become common practice in Chrome and Firefox, it is stated
that it comes with negative side affects, therefore it is still recommended to attempt to bundle apps into larger chunks
while minimizing the size of those chunks (find a balance between individual asset size and number of assets necessary to load application).

Wepack offers a nice solution that allows you to bundle all your assets into a single massive asset, and later to polish your
configuration to allow splitting the asset into specified sub-assets (to reduce the size overhead -- finding the minimum
asset content required to bootstrap an application, and allowing the application to lazy-load subsequent chunks as needed.)

SystemJS-Builder also allows for bundling and sub-modules.

Next, How do you execute unit tests?  

AngularJS apps generally use Karma as the unit test runner, 
and protractor with webdriver as the functional test runner/library.

Is it possible to configure Karma to transpile app and test code on the fly and serve the transpiled assets from memory?
This would allow a clean development chain for editing/testing the app.  On the other hand visual and manual testing will 
require a fully compiled app that can be hosted from a specified folder.  This can either be a loose-leaf compile, or a bundled
compile. If source maps allow the bundled compile to be viewed in the debugger as separate files in their native format (
(pre-transpiled format) then bundled vs loose-leaf is a moot point.

## Setup
* * *

### Pre-flight

#### place the following lines at the end of your profile or run-command file (~/.*rc)

```bash
export API_HOST='localhost:9000'

[ "$HOME" == "" ] && export HOME=$home
export NVM_DIR="$HOME/.nvm"
# ------------------------------------------------------------
# this line goes at the end of your RunCommand file
# ------------------------------------------------------------
[ -s "$NVM_DIR/nvm.sh" ] && . "$NVM_DIR/nvm.sh"  # This loads nvm
```

### Clone the repository into a local workspace

Clone this repository to your local machine. You can clone the repo workspace to any location you want.
 
- Local machine does not need to be a VM, but it does need to have a POSIX compliant OS 
- that means if you are on windows you need to install cygwin and run from a cygwin bash shell
 
 i.e.
 
```bash
git clone git@github.com:kburson/Angular-ES6-starter.git  ~/myApp
```
 
This requires you add your public key to your github account, but then you will not need to enter your password every 
time you pull or update to the latest version of the repo.

Note: You can name the target directory anything you want.  In the example above I am using the project name 'myApp'. 
If you do not supply a folder name the workspace will be created in a folder named after the repository name; 
i.e. ./Angular-ES6-starter.

If you do not have an ssh key available for your machine you can also use https to clone the repository :

```bash
git clone https://github.com/kburson/Angular-ES6-starter.git   ~/myApp
```

**CAUTION**: This is not the preferred access method.  Please use SSH when possible.


### Checkout a branch to view

You need to choose a branch you wish to build and run from.  
There are 3 default branches: [ **master** | **gulp** | **webpack** ].
- The **master** branch is the latest released version.
- The **gulp** branch is experiments in usingt he gulp build tool for building, packaging, testing and managing the application.
- The **wepack** branch is experiments in using webpack to bundle/split/host the application.

```bash
cd ~/myApp
git checkout gulp
```

### run the setup command 

-- the setup command will query your local machine and install all the tools necessary for a **NodeJs development environment**.  
This command can take several minutes to run as it is downloading and installing several dozen tools and libraries.

```bash
tools/workspace-setup.sh
```

#### optional args

 -  -i:   interactive mode, ask before performing any action.
 -  -s:   silent mode (default); all setup/install actions will be performed without user interaction

## Quick Start
* * *

To compile and launch the developer web server run one of the following commands:

### with mocked services

-- this is for testing when services are not available.

```bash
npm run mocked
```

### without mocked services

-- this will connect to live services as configured in resources.json

```bash
npm run client
```
In either case you can open a web browser to http://localhost:8000 to view the application


.