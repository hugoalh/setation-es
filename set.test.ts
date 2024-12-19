import { assertEquals } from "STD/assert/equals";
import { assertThrows } from "STD/assert/throws";
import { combinationSet, permutationSet } from "./set.ts";
const set1 = ["a", "b", "c", "d", "e", "f"];
Deno.test("1 Combination AllowRepeat 3", { permissions: "none" }, () => {
	const result = Array.from(combinationSet(set1, 3, {
		allowRepeat: true
	}));
	console.log(result);
	assertEquals(result.length, 56);
});
Deno.test("1 Combination NoRepeat 3", { permissions: "none" }, () => {
	const result = Array.from(combinationSet(set1, 3));
	console.log(result);
	assertEquals(result.length, 20);
});
Deno.test("1 Combination NoRepeat 6", { permissions: "none" }, () => {
	const result = Array.from(combinationSet(set1, 6));
	console.log(result);
	assertEquals(result.length, 1);
});
Deno.test("1 Combination NoRepeat 3+6", { permissions: "none" }, () => {
	const result = Array.from(combinationSet(set1, [3, 6]));
	console.log(result);
	assertEquals(result.length, 21);
});
Deno.test("1 Permutation AllowRepeat 3", { permissions: "none" }, () => {
	const result = Array.from(permutationSet(set1, 3, {
		allowRepeat: true
	}));
	console.log(result);
	assertEquals(result.length, 216);
});
Deno.test("1 Permutation NoRepeat 3", { permissions: "none" }, () => {
	const result = Array.from(permutationSet(set1, 3));
	console.log(result);
	assertEquals(result.length, 120);
});
Deno.test("1 Permutation NoRepeat 6", { permissions: "none" }, () => {
	const result = Array.from(permutationSet(set1, 6));
	console.log(result);
	assertEquals(result.length, 720);
});
Deno.test("1 Permutation NoRepeat 3+6", { permissions: "none" }, () => {
	const result = Array.from(permutationSet(set1, [3, 6]));
	console.log(result);
	assertEquals(result.length, 840);
});
Deno.test("1 Permutation NoRepeat 9", { permissions: "none" }, () => {
	assertThrows(() => {
		Array.from(permutationSet(set1, 9));
	});
});
