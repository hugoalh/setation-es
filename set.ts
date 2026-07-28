import { compareNumericsAscending } from "https://raw.githubusercontent.com/hugoalh/sort-es/v0.4.0/compare.ts";
export interface SetationSetOptions {
	/**
	 * Whether to allow the elements repeat appear in the same subset.
	 * @default {false}
	 */
	allowRepeat?: boolean;
}
function* setationSetIterator<T>(ordered: boolean, set: readonly T[], sizes: readonly number[], options: Required<SetationSetOptions>): Generator<T[]> {
	const { allowRepeat = false }: Required<SetationSetOptions> = options;
	const setIndex: readonly number[] = set.map((_value: T, index: number): number => {
		return index;
	});
	function* setationSetIndexIterator(size: number, chain: number[] = [], item: readonly number[] = setIndex): Generator<number[]> {
		if (!(item.length > 0)) {
			yield chain;
			return;
		}
		for (const element of item) {
			const chainNew: number[] = [...chain, element];
			if (chainNew.length === size) {
				yield chainNew;
				continue;
			}
			const itemRest: readonly number[] = allowRepeat ? item : item.toSpliced(item.indexOf(element), 1);
			if (itemRest.length > 0) {
				yield* setationSetIndexIterator(size, chainNew, itemRest);
			} else {
				yield chainNew;
			}
		}
	}
	for (const size of sizes) {
		if (size === 0) {
			yield [];
			continue;
		}
		const tokens: Set<string> = new Set<string>();
		for (const indexes of setationSetIndexIterator(size)) {
			const indexesFmt: readonly number[] = ordered ? indexes : indexes.sort(compareNumericsAscending);
			const token: string = indexesFmt.join(",");
			if (tokens.has(token)) {
				continue;
			}
			tokens.add(token);
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
function setationSet<T>(ordered: boolean, set: readonly T[] | Set<T>, size: number | readonly number[] | SetationSetSizeRange, options: SetationSetOptions = {}): Generator<T[]> {
	const { allowRepeat = false }: SetationSetOptions = options;
	const setFmt: readonly T[] = Array.from((set instanceof Set) ? set.values() : set);
	const sizes: number[] = [];
	if (
		typeof size === "number" ||
		Array.isArray(size)
	) {
		Array.isArray(size) ? sizes.push(...size) : sizes.push(size);
		for (const size of sizes) {
			if (!(Number.isSafeInteger(size) && size >= 0)) {
				throw new TypeError(`\`${size}\` (parameter \`options.size\`) is not a number which is integer, positive, and safe!`);
			}
			if (!allowRepeat && !(size <= setFmt.length)) {
				throw new RangeError(`Size \`${size}\` is too large for the no elements repeat subset! Expect: <= ${setFmt.length}.`);
			}
		}
	} else {
		const {
			maximum,
			minimum
		}: SetationSetSizeRange = size as SetationSetSizeRange;
		if (!(Number.isSafeInteger(maximum) && maximum >= 0)) {
			throw new TypeError(`\`${maximum}\` (parameter \`size.maximum\`) is not a number which is integer, positive, and safe!`);
		}
		if (!allowRepeat && !(maximum <= setFmt.length)) {
			throw new RangeError(`Maximum size \`${maximum}\` is too large for the no elements repeat subset! Expect: <= ${setFmt.length}.`);
		}
		if (!(Number.isSafeInteger(minimum) && minimum >= 0)) {
			throw new TypeError(`\`${minimum}\` (parameter \`size.minimum\`) is not a number which is integer, positive, and safe!`);
		}
		if (!(minimum <= maximum)) {
			throw new RangeError(`Minimum size \`${minimum}\` is too large! Expect: <= ${maximum}.`);
		}
		for (let n: number = minimum; n <= maximum; n += 1) {
			sizes.push(n);
		}
	}
	return setationSetIterator(ordered, setFmt, sizes, { allowRepeat });
}
/**
 * List combinations from the set.
 * @template {unknown} T
 * @param {readonly T[] | Set<T>} set Set.
 * @param {number | readonly number[] | SetationSetSizeRange} size Size of the subset.
 * @param {SetationSetOptions} [options={}] Options.
 * @returns {Generator<T[]>} A combinations subset generator.
 */
export function combinationSet<T>(set: readonly T[] | Set<T>, size: number | readonly number[] | SetationSetSizeRange, options?: SetationSetOptions): Generator<T[]> {
	return setationSet<T>(false, set, size, options);
}
/**
 * List permutations from the set.
 * @template {unknown} T
 * @param {readonly T[] | Set<T>} set Set.
 * @param {number | readonly number[] | SetationSetSizeRange} size Size of the subset.
 * @param {SetationSetOptions} [options={}] Options.
 * @returns {Generator<T[]>} A permutations subset generator.
 */
export function permutationSet<T>(set: readonly T[] | Set<T>, size: number | readonly number[] | SetationSetSizeRange, options?: SetationSetOptions): Generator<T[]> {
	return setationSet<T>(true, set, size, options);
}
