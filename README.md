# csplay

testing the content security policy with inline styles on "standard" HTML and the shadow DOM

## nuclear

policy: nothing dangerous whatsoever

result: 

* standard - react element cannot be coloured with inline styles and the client script cannot run
* shadow - cannot apply style block but can apply inline style

## evil

policy: there isn't one

result:

* standard - react element works as expected
* shadow - works as expected

## read the script

policy: script-src unsafe-eval

result:

* standard - webpack built client script can run - the state can change the style but initial style cannot be loaded
* shadow - cannot apply style block but can apply inline style

## \#justsayin

policy: script-src \<hash\> (echo -n "color:red;" | openssl dgst -sha256 -binary | openssl enc -base64)

result:

* standard - umm...doesn't work in [Chrome](https://code.google.com/p/chromium/issues/detail?id=546106) and Safari...works in Firefox though :-)
* shadow - cannot apply style block but can apply inline style

## crypto once

policy script-src nonce-$random

result:

* standard - allows style block
* shadow - allows style block to run and can apply inline style