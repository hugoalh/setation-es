import { deepStrictEqual } from "node:assert";
import { combinationCollection } from "./collection.ts";
Deno.test("0 Map", { permissions: "none" }, () => {
	const result = Array.from(combinationCollection(new Map()));
	console.log(result);
	deepStrictEqual(result.length, 1);
});
Deno.test("0 Record", { permissions: "none" }, () => {
	const result = Array.from(combinationCollection({}));
	console.log(result);
	deepStrictEqual(result.length, 1);
});
Deno.test("3*3 Map", { permissions: "none" }, () => {
	const result = Array.from(combinationCollection(new Map([
		["foo", [1, 2, 3]],
		["bar", [4, 5, 6]]
	])));
	console.log(result);
	deepStrictEqual(result.length, 9);
});
Deno.test("3*3 Record", { permissions: "none" }, () => {
	const result = Array.from(combinationCollection({
		foo: [1, 2, 3],
		bar: [4, 5, 6]
	}));
	console.log(result);
	deepStrictEqual(result.length, 9);
});
Deno.test("9*9*9 Map", { permissions: "none" }, () => {
	const result = Array.from(combinationCollection(new Map([
		["a", [1, 2, 3, 4, 5, 6, 7, 8, 9]],
		["b", [1, 2, 3, 4, 5, 6, 7, 8, 9]],
		["c", [1, 2, 3, 4, 5, 6, 7, 8, 9]]
	])));
	console.log(result);
	deepStrictEqual(result.length, 729);
});
Deno.test("9*9*9 Record", { permissions: "none" }, () => {
	const result = Array.from(combinationCollection({
		a: [1, 2, 3, 4, 5, 6, 7, 8, 9],
		b: [1, 2, 3, 4, 5, 6, 7, 8, 9],
		c: [1, 2, 3, 4, 5, 6, 7, 8, 9]
	}));
	console.log(result);
	deepStrictEqual(result.length, 729);
});
