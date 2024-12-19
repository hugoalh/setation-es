function deleteMapKey<K, V>(item: Map<K, V[]>, ...keys: K[]): Map<K, V[]> {
	const itemClone: Map<K, V[]> = new Map<K, V[]>(item);
	for (const key of keys) {
		itemClone.delete(key);
	}
	return itemClone;
}
function* setationCollectionIterator<K, V>(set: Map<K, V[]>, chain: Map<K, V> = new Map<K, V>()): Generator<Map<K, V>> {
	if (set.size === 0) {
		yield chain;
		return;
	}
	const [key, values]: [K, V[]] = Array.from(set.entries())[0];
	const rest: Map<K, V[]> = deleteMapKey(set, key);
	for (const value of values) {
		chain.set(key, value);
		if (rest.size === 0) {
			yield new Map<K, V>(chain);
		} else {
			yield* setationCollectionIterator(rest, chain);
		}
	}
}
/**
 * List combinations from the collection.
 * @template {unknown} V
 * @param {{ [x: string]: V[]; }} item Collection.
 * @returns {Generator<{ [x: string]: V; }>} A collection combinations subset generator.
 */
export function combinationCollection<V>(item: { [x: string]: V[]; }): Generator<{ [x: string]: V; }>;
/**
 * List combinations from the collection.
 * @template {unknown} K
 * @template {unknown} V
 * @param {Map<K, V[]>} item Collection.
 * @returns {Generator<Map<K, V>>} A collection combinations subset generator.
 */
export function combinationCollection<K, V>(item: Map<K, V[]>): Generator<Map<K, V>>;
/**
 * List combinations from the collection.
 * @template {unknown} V
 * @param {Record<string, V[]>} item Collection.
 * @returns {Generator<Record<string, V>>} A collection combinations subset generator.
 */
export function combinationCollection<V>(item: Record<string, V[]>): Generator<Record<string, V>>;
export function* combinationCollection<K, V>(set: { [x: string]: V[]; } | Map<K, V[]> | Record<string, V[]>): Generator<{ [x: string]: V; } | Map<K, V> | Record<string, V>> {
	if (set instanceof Map) {
		yield* setationCollectionIterator(new Map<K, V[]>(set));
		return;
	}
	for (const item of setationCollectionIterator(new Map<K, V[]>(Object.entries(set) as [K, V[]][]))) {
		yield Object.fromEntries(item.entries());
	}
}
