const format = string.format;
const gmatch = string.gmatch;
const sub = string.sub;
const gsub = string.gsub;
const char = string.char;
const find = string.find;
const HttpService = game.GetService("HttpService");

function tonumberproxy(...args: [string, number]): number {
	return tonumber(args)!;
}

function decodeChar(hex: string) {
	return char(tonumberproxy(hex, 16));
}

function decodeString(str: string) {
	const [output, t] = gsub(str, "%%(%x%x)", decodeChar);
	return output;
}

const identity = function <T>(toReturn: T): T {
	return toReturn;
};

const clean = function (str: string): string {
	let [s] = gsub(str, "^%s*(.-)%s*$", "%1");

	if (sub(s, 1, 1) === '"') {
		s = sub(s, 2, -2);
	}

	return s;
};

const to_utc_string = function (time: number) {
	return os.date("%a, %d %b %Y %H:%I:%S GMT", time);
};

type CODEX_TYPE = [string, string, Callback][];

const CODEX: CODEX_TYPE = [
	["max_age", "Max-Age=%d", identity],
	["domain", "Domain=%s", identity],
	["path", "Path=%s", identity],
	["expires", "Expires=%s", to_utc_string],
	["http_only", "HttpOnly", identity],
	["secure", "Secure", identity],
];

export const build = function (
	dict: Record<string, string>,
	options?: Record<string, number | string | boolean>,
): string {
	const res = [];
	options = options ? options : {};

	for (const [k, v] of pairs(dict)) {
		res.push(format("%s=%s", k, HttpService.UrlEncode(v)));
	}

	for (const [key, template, fn] of CODEX) {
		const val = options[key];
		if (val !== undefined) {
			res.push(format(template, fn(val)));
		}
	}

	return res.join("; ");
};

export const parse = function (data: string) {
	const res: Map<string, string> = new Map<string, string>();

	for (const pair of gmatch(data, "[^;]+")) {
		const eq = find(pair[0] as string, "=")[0];

		if (eq !== undefined) {
			const key = clean(sub(pair[0] as string, 1, eq - 1));
			const val = clean(sub(pair[0] as string, eq + 1));

			if (res.get(key) === undefined) {
				res.set(key, decodeString(val));
			}
		}
	}

	return res;
};

export default {
	build: build,
	parse: parse,
};
