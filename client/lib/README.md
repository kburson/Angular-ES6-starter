# lib

This directory stores any 3rd party libraries that are needed by our application that are not available using npm or bower.

It is not a good idea to commit build artifacts to a source repository; this includes artifacts from 3rd party vendors.

The one exception to this rule is when those vendors do not have a reliable repository to retrieve those artifacts from.
In such a situation it is recommended to set up a local mirror where the desired artifacts can be stored and retrieved 
reliably.
