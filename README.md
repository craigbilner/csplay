# csplay

testing the content security policy with inline styles

## nuclear

policy: nothing dangerous whatsoever

result: react element cannot be coloured with inline styles and the client script cannot run

## evil

policy: there isn't one

result: react element works as expected

## read the script

policy: script-src unsafe-eval

result: webpack built client script can run - the state can change the style but initial style cannot be loaded

## \#justsayin

policy: style-src \<hash\> (echo -n "color:red;" | openssl dgst -sha256 -binary | openssl enc -base64)

result: umm...just the same in [Chrome](https://code.google.com/p/chromium/issues/detail?id=546106) and Safari...works in Firefox though :-)

## crypto once

policy style-src nonce-$random

result: allows style block to run
