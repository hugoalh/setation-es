function* setationCollectionIterator<K, V>(item: readonly (readonly [K, readonly V[]])[], chain: Map<K, V> = new Map<K, V>()): Generator<Map<K, V>> {
	if (!(item.length > 0)) {
		yield chain;
		return;
	}
	const [
		[
			key,
			values
		],
		...itemRest
	]: readonly (readonly [K, readonly V[]])[] = item;
	for (const value of values) {
		const chainNew = new Map<K, V>(chain);
		chainNew.set(key, value);
		if (itemRest.length > 0) {
			yield* setationCollectionIterator(itemRest, chainNew);
		} else {
			yield chainNew;
		}
	}
}
function* combinationCollectionRecord<K extends string, V>(item: Record<K, readonly V[]>): Generator<Record<K, V>> {
	for (const result of setationCollectionIterator(Object.entries(item) as [K, V[]][])) {
		yield Object.fromEntries(result.entries()) as Record<K, V>;
	}
}
/**
 * List combinations from the collection.
 * @template {unknown} K
 * @template {unknown} V
 * @param {Map<K, readonly V[]>} item Collection.
 * @returns {Generator<Map<K, V>>} A collection combinations subset generator.
 */
export function combinationCollection<K, V>(item: Map<K, readonly V[]>): Generator<Map<K, V>>;
/**
 * List combinations from the collection.
 * @template {string} K
 * @template {unknown} V
 * @param {Record<K, readonly V[]>} item Collection.
 * @returns {Generator<Record<K, V>>} A collection combinations subset generator.
 */
export function combinationCollection<K extends string, V>(item: Record<K, readonly V[]>): Generator<Record<K, V>>;
//@ts-ignore Overload.
export function combinationCollection<K, V>(item: Map<K, readonly V[]> | Record<K, readonly V[]>): Generator<Map<K, V> | Record<K, V>> {
	if (item instanceof Map) {
		return setationCollectionIterator(Array.from(item.entries()));
	}
	//@ts-ignore Overload.
	return combinationCollectionRecord(item);
}
