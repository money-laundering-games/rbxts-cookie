# rbxts-cookie

roblox-ts cookie parser. rewritten in ts from [cookie.lua](https://github.com/cyx/cookie.lua/)

## Installation
```
npm install @rbxts/cookie
```

## Usage
```ts
import { parse, build } from "@rbxts/cookie";

// basic usage
build({ foo: "bar" }); // --> foo=bar

// using all possible option values

const time = 1398283214;
const options = {
	max_age: 3600,
	domain: ".example.com",
	path: "/",
	expires: time,
	http_only: true,
	secure: true,
};

build({ foo: "bar" }, options); // --> foo=bar; Max-Age=3600; Domain=.example.com; Path=/; Expires=Wed, 23 Apr 2014 13:01:14 GMT; HttpOnly; Secure;

// parsing

parse("foo=bar"); // {foo: "bar"};
```