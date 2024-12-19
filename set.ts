import { sortNumerics } from "https://raw.githubusercontent.com/hugoalh/sort-es/v0.1.1/numerics.ts";
function* setationSetIndexIterator(set: readonly number[], size: number, allowRepeat: boolean, chain: readonly number[] = []): Generator<readonly number[]> {
	for (const value of set) {
		const result: readonly number[] = [...chain, value];
		if (result.length === size) {
			yield result;
		} else {
			yield* setationSetIndexIterator(allowRepeat ? set : set.filter((index: number): boolean => {
				return (index !== value);
			}), size, allowRepeat, result);
		}
	}
}
export interface SetationSetOptions {
	/**
	 * Whether to allow the elements repeat appear in the same subset.
	 * @default {false}
	 */
	allowRepeat?: boolean;
}
function* setationSetIterator<T>(considerOrder: boolean, set: readonly T[], sizes: number[], options: Required<SetationSetOptions>): Generator<T[]> {
	const { allowRepeat }: Required<SetationSetOptions> = options;
	if (
		set.length === 0 ||
		sizes.length === 0
	) {
		yield [];
		return;
	}
	for (const size of sizes) {
		if (size === 0) {
			yield [];
			continue;
		}
		const subsetStorage: Set<string> = new Set<string>();
		for (const indexes of setationSetIndexIterator(set.map((_value: T, index: number): number => {
			return index;
		}), size, allowRepeat)) {
			const indexesFmt: readonly number[] = considerOrder ? indexes : sortNumerics(indexes);
			const token: string = indexesFmt.map((index: number): string => {
				return String(index);
			}).join(",");
			if (subsetStorage.has(token)) {
				continue;
			}
			subsetStorage.add(token);
			yield indexesFmt.map((index: number): T => {
				return set[index];
			});
		}
	}
}
export interface SetationSetSizeRange {
	/**
	 * Maximum size of the subset.
	 */
	maximum: number;
	/**
	 * Minimum size of the subset.
	 */
	minimum: number;
}
function setationSet<T>(considerOrder: boolean, set: readonly T[] | Set<T>, size: number | number[] | SetationSetSizeRange, options: SetationSetOptions = {}): Generator<T[]> {
	const { allowRepeat = false }: SetationSetOptions = options;
	const setFmt: readonly T[] = (set instanceof Set) ? Array.from(set.values()) : set;
	const sizesResolve: number[] = [];
	if (
		typeof size === "number" ||
		Array.isArray(size)
	) {
		for (const value of (Array.isArray(size) ? size : [size])) {
			if (!(Number.isSafeInteger(value) && value >= 0)) {
				throw new TypeError(`\`${value}\` (parameter \`options.size\`) is not a number which is integer, positive, and safe!`);
			}
			if (!allowRepeat && !(value <= setFmt.length)) {
				throw new RangeError(`Size \`${value}\` is too large for the no elements repeat subset! Expect: <= ${setFmt.length}.`);
			}
			sizesResolve.push(value);
		}
	} else {
		if (!(Number.isSafeInteger(size.maximum) && size.maximum >= 0)) {
			throw new TypeError(`\`${size.maximum}\` (parameter \`options.size.maximum\`) is not a number which is integer, positive, and safe!`);
		}
		if (!allowRepeat && !(size.maximum <= setFmt.length)) {
			throw new RangeError(`Maximum size \`${size.maximum}\` is too large for the no elements repeat subset! Expect: <= ${setFmt.length}.`);
		}
		if (!(Number.isSafeInteger(size.minimum) && size.minimum >= 0)) {
			throw new TypeError(`\`${size.minimum}\` (parameter \`options.size.minimum\`) is not a number which is integer, positive, and safe!`);
		}
		if (!(size.minimum <= size.maximum)) {
			throw new RangeError(`Minimum size \`${size.minimum}\` is too large for the no elements repeat subset! Expect: <= ${size.maximum}.`);
		}
		for (let index: number = size.minimum; index <= size.maximum; index += 1) {
			sizesResolve.push(index);
		}
	}
	return setationSetIterator(considerOrder, setFmt, sizesResolve, { allowRepeat });
}
/**
 * List combinations from the set.
 * @template {unknown} T
 * @param {readonly T[] | Set<T>} set Set.
 * @param {number | number[] | SetationSetSizeRange} size Size of the subset.
 * @param {SetationSetOptions} [options={}] Options.
 * @returns {Generator<T[]>} A combinations subset generator.
 */
export function combinationSet<T>(set: readonly T[] | Set<T>, size: number | number[] | SetationSetSizeRange, options?: SetationSetOptions): Generator<T[]> {
	return setationSet<T>(false, set, size, options);
}
/**
 * List permutations from the set.
 * @template {unknown} T
 * @param {readonly T[] | Set<T>} set Set.
 * @param {number | number[] | SetationSetSizeRange} size Size of the subset.
 * @param {SetationSetOptions} [options={}] Options.
 * @returns {Generator<T[]>} A permutations subset generator.
 */
export function permutationSet<T>(set: readonly T[] | Set<T>, size: number | number[] | SetationSetSizeRange, options?: SetationSetOptions): Generator<T[]> {
	return setationSet<T>(true, set, size, options);
}
