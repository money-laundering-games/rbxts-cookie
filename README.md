# rbxts-cookie

roblox-ts cookie parser. rewritten in ts from [cookie.lua](https://github.com/cyx/cookie.lua/)

## Usage
```ts
import { parse, build } from "@rbxts/cookie";

// basic usage
assert("foo=bar" === build({foo: "bar"}));

// using all possible option values

const time = 1398283214;
const options = {
    'max_age': 3600,
    'domain': ".example.com",
    'path': "/",
    'expires': time,
    'http_only': true,
    'secure': true
};

const expected =
	"foo=bar; Max-Age=3600; Domain=.example.com; " +
	"Path=/; Expires=Wed, 23 Apr 2014 13:01:14 GMT; " +
	"HttpOnly; Secure";

assert(expected === build({foo: "bar"}, options));

// parsing

assert(equal({ foo:"bar", bar:"baz" },
	parse("foo=bar; bar=baz")));

assert(equal({ foo:"bar", bar:"baz" },
	parse('foo=bar; bar="baz"')));

assert(equal({ foo:"bar", bar:"baz" },
	parse('foo=bar; bar="baz"; foo=baz')));

assert(equal({ foo:"bar", bar:"baz" },
	parse('foo=bar; bar="baz"; barabaz')));

```