import {
	deepStrictEqual,
	throws
} from "node:assert";
import {
	combinationSet,
	permutationSet
} from "./set.ts";
const set6 = ["a", "b", "c", "d", "e", "f"];
Deno.test("0 Setation", { permissions: "none" }, () => {
	deepStrictEqual(Array.from(combinationSet([], 0)), [[]]);
	deepStrictEqual(Array.from(permutationSet([], 0)), [[]]);
	deepStrictEqual(Array.from(combinationSet([], [])), []);
	deepStrictEqual(Array.from(permutationSet([], [])), []);
});
Deno.test("6 Combination AllowRepeat 3", { permissions: "none" }, () => {
	deepStrictEqual((Array.from(combinationSet(set6, 3, { allowRepeat: true }))).length, 56);
});
Deno.test("6 Combination NoRepeat 3", { permissions: "none" }, () => {
	deepStrictEqual(Array.from(combinationSet(set6, 3)), [
		["a", "b", "c"],
		["a", "b", "d"],
		["a", "b", "e"],
		["a", "b", "f"],
		["a", "c", "d"],
		["a", "c", "e"],
		["a", "c", "f"],
		["a", "d", "e"],
		["a", "d", "f"],
		["a", "e", "f"],
		["b", "c", "d"],
		["b", "c", "e"],
		["b", "c", "f"],
		["b", "d", "e"],
		["b", "d", "f"],
		["b", "e", "f"],
		["c", "d", "e"],
		["c", "d", "f"],
		["c", "e", "f"],
		["d", "e", "f"]
	]);
});
Deno.test("6 Combination NoRepeat 6", { permissions: "none" }, () => {
	deepStrictEqual((Array.from(combinationSet(set6, 6))).length, 1);
});
Deno.test("6 Combination NoRepeat 3,6", { permissions: "none" }, () => {
	deepStrictEqual((Array.from(combinationSet(set6, [3, 6]))).length, 21);
});
Deno.test("6 Permutation AllowRepeat 3", { permissions: "none" }, () => {
	deepStrictEqual((Array.from(permutationSet(set6, 3, { allowRepeat: true }))).length, 216);
});
Deno.test("6 Permutation NoRepeat 3", { permissions: "none" }, () => {
	deepStrictEqual((Array.from(permutationSet(set6, 3))).length, 120);
});
Deno.test("6 Permutation NoRepeat 6", { permissions: "none" }, () => {
	deepStrictEqual((Array.from(permutationSet(set6, 6))).length, 720);
});
Deno.test("6 Permutation NoRepeat 3,6", { permissions: "none" }, () => {
	deepStrictEqual((Array.from(permutationSet(set6, [3, 6]))).length, 840);
});
Deno.test("6 Permutation NoRepeat 9", { permissions: "none" }, () => {
	throws(() => {
		Array.from(permutationSet(set6, 9));
	});
});
