import { deepStrictEqual } from "node:assert";
import { combinationCollection } from "./collection.ts";
Deno.test("0", { permissions: "none" }, () => {
	deepStrictEqual(Array.from(combinationCollection({})), [{}]);
});
Deno.test("3*3 1", { permissions: "none" }, () => {
	deepStrictEqual(Array.from(combinationCollection({
		foo: [1, 2, 3],
		bar: [4, 5, 6]
	})), [
		{
			foo: 1,
			bar: 4
		},
		{
			foo: 1,
			bar: 5
		},
		{
			foo: 1,
			bar: 6
		},
		{
			foo: 2,
			bar: 4
		},
		{
			foo: 2,
			bar: 5
		},
		{
			foo: 2,
			bar: 6
		},
		{
			foo: 3,
			bar: 4
		},
		{
			foo: 3,
			bar: 5
		},
		{
			foo: 3,
			bar: 6
		}
	]);
});
Deno.test("3*3 2", { permissions: "none" }, () => {
	deepStrictEqual(Array.from(combinationCollection({
		bar: [4, 5, 6],
		foo: [1, 2, 3]
	})), [
		{
			bar: 4,
			foo: 1
		},
		{
			bar: 4,
			foo: 2
		},
		{
			bar: 4,
			foo: 3
		},
		{
			bar: 5,
			foo: 1
		},
		{
			bar: 5,
			foo: 2
		},
		{
			bar: 5,
			foo: 3
		},
		{
			bar: 6,
			foo: 1
		},
		{
			bar: 6,
			foo: 2
		},
		{
			bar: 6,
			foo: 3
		}
	]);
});
Deno.test("9*9*9", { permissions: "none" }, () => {
	deepStrictEqual(Array.from(combinationCollection({
		a: [1, 2, 3, 4, 5, 6, 7, 8, 9],
		b: [1, 2, 3, 4, 5, 6, 7, 8, 9],
		c: [1, 2, 3, 4, 5, 6, 7, 8, 9]
	})).length, 729);
});
