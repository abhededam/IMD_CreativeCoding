Write your own tests
====================

You have now seen a lot of unit tests. Now we provide you with some code.
You're responsible to write a a decent suite of tests that should cover all the possible routes.

Take a look at the available assertions: https://nodejs.org/dist/latest/docs/api/assert.html

Also, here's documentation on mocha: http://mochajs.org/#getting-started

But, what does it do?
---------------------

This script will read a file, count the number of letters in it and output the numbers like this:

    # input
    Hello, World

    # output
    l: 3
    o: 2
    h: 1
    e: 1
    ,: 1
     : 1
    w: 1
    r: 1
    d: 1

Let's pretend this is really important! We need to make sure that
this does not fail. Or our imaginary client will be very sad.


Setup
-----

    npm install
    npm install -g mocha

Running
-------

    node index.js <filename>

for example

    node index.js icb.txt

Running the test suite
----------------------

    mocha
