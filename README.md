# Angular ES6 starter

## Setup
* * *

### Pre-flight

#### place the following lines at the end of your profile or run-command file (~/.*rc)

NOTE: you need to replace **user1** with your dvm user name

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
In either case you can open a web browser to http://localhost:5000 to view the application


.