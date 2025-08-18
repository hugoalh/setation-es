export interface SetationSetOptions {
	/**
	 * Whether to allow the elements repeat appear in the same subset.
	 * @default {false}
	 */
	allowRepeat?: boolean;
}
class SetationSetIndexIterator {
	#allowRepeat: boolean;
	#size: number;
	constructor(size: number, options: Required<SetationSetOptions>) {
		this.#allowRepeat = options.allowRepeat;
		this.#size = size;
	}
	*iterate(item: readonly number[], chain: number[] = []): Generator<number[]> {
		if (!(item.length > 0)) {
			yield chain;
			return;
		}
		for (const element of item) {
			const chainNew: number[] = [...chain, element];
			if (chainNew.length === this.#size) {
				yield chainNew;
				continue;
			}
			const itemRest: readonly number[] = this.#allowRepeat ? item : item.toSpliced(item.indexOf(element), 1);
			if (itemRest.length > 0) {
				yield* this.iterate(itemRest, chainNew);
			} else {
				yield chainNew;
			}
		}
	}
}
function* setationSetIterator<T>(order: boolean, set: readonly T[], sizes: readonly number[], options: Required<SetationSetOptions>): Generator<T[]> {
	for (const size of sizes) {
		if (size === 0) {
			yield [];
			continue;
		}
		// Use `bin` to prevent duplicate subset.
		const bin: Set<string> = new Set<string>();
		for (const indexes of new SetationSetIndexIterator(size, options).iterate(set.map((_value: T, index: number): number => {
			return index;
		}))) {
			const indexesFmt: readonly number[] = order ? indexes : indexes.sort((a: number, b: number): number => {
				return (a - b);
			});
			const token: string = indexesFmt.join(",");
			if (bin.has(token)) {
				continue;
			}
			bin.add(token);
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
function setationSet<T>(order: boolean, set: readonly T[] | Set<T>, size: number | readonly number[] | SetationSetSizeRange, options: SetationSetOptions = {}): Generator<T[]> {
	const { allowRepeat = false }: SetationSetOptions = options;
	const setFmt: readonly T[] = (set instanceof Set) ? Array.from(set.values()) : set;
	let sizesResolve: number[];
	if (
		typeof size === "number" ||
		Array.isArray(size)
	) {
		sizesResolve = Array.isArray(size) ? size : [size];
		sizesResolve.forEach((value: number): void => {
			if (!(Number.isSafeInteger(value) && value >= 0)) {
				throw new TypeError(`\`${value}\` (parameter \`options.size\`) is not a number which is integer, positive, and safe!`);
			}
			if (!allowRepeat && !(value <= setFmt.length)) {
				throw new RangeError(`Size \`${value}\` is too large for the no elements repeat subset! Expect: <= ${setFmt.length}.`);
			}
		});
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
			throw new RangeError(`Minimum size \`${minimum}\` is too large for the no elements repeat subset! Expect: <= ${maximum}.`);
		}
		sizesResolve = [];
		for (let index: number = minimum; index <= maximum; index += 1) {
			sizesResolve.push(index);
		}
	}
	return setationSetIterator(order, setFmt, sizesResolve, { allowRepeat });
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
