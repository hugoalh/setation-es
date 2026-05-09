# Setation (ES)

[**⚖️** MIT](./LICENSE.md)

🔗
[GitHub](https://github.com/hugoalh/setation-es)
● [JSR](https://jsr.io/@hugoalh/setation)
● [NPM](https://www.npmjs.com/package/@hugoalh/setation)

An ECMAScript module to list permutations or combinations from the collection or set.

## 🎯 Targets

| **Runtime \\ Source** | **GitHub Raw** | **JSR** | **NPM** |
|:--|:-:|:-:|:-:|
| **[Bun](https://bun.sh/)** >= v1.1.0 | ❌ | ✔️ | ✔️ |
| **[Deno](https://deno.land/)** >= v2.1.0 | ✔️ | ✔️ | ✔️ |
| **[NodeJS](https://nodejs.org/)** >= v20.9.0 | ❌ | ✔️ | ✔️ |

## 🛡️ Runtime Permissions

This does not request any runtime permission.

## #️⃣ Sources

- GitHub Raw
  ```
  https://raw.githubusercontent.com/hugoalh/setation-es/{Tag}/mod.ts
  ```
- JSR
  ```
  jsr:@hugoalh/setation[@{Tag}]
  ```
- NPM
  ```
  npm:@hugoalh/setation[@{Tag}]
  ```

> [!NOTE]
> - It is recommended to include tag for immutability.
> - These are not part of the public APIs hence should not be used:
>   - Benchmark/Test file (e.g.: `example.bench.ts`, `example.test.ts`).
>   - Entrypoint name or path include any underscore prefix (e.g.: `_example.ts`, `foo/_example.ts`).
>   - Identifier/Namespace/Symbol include any underscore prefix (e.g.: `_example`, `Foo._example`).

## ⤵️ Entrypoints

| **Name** | **Path** | **Description** |
|:--|:--|:--|
| `.` | `./mod.ts` | Default. |
| `./collection` | `./collection.ts` | Collection. |
| `./set` | `./set.ts` | Set. |

## 🧩 APIs

- ```ts
  function combinationCollection<K, V>(item: Map<K, readonly V[]>): Generator<Map<K, V>>;
  function combinationCollection<K extends string, V>(item: Record<K, readonly V[]>): Generator<Record<K, V>>;
  ```
- ```ts
  function combinationSet<T>(set: readonly T[] | Set<T>, size: number | readonly number[] | SetationSetSizeRange, options?: SetationSetOptions): Generator<T[]>;
  ```
- ```ts
  function permutationSet<T>(set: readonly T[] | Set<T>, size: number | readonly number[] | SetationSetSizeRange, options?: SetationSetOptions): Generator<T[]>;
  ```

> [!NOTE]
> - For the full or prettier documentation, can visit via:
>   - [Deno CLI `deno doc`](https://docs.deno.com/runtime/reference/cli/doc/)
>   - [JSR](https://jsr.io/@hugoalh/setation)

## ✍️ Examples

- ```js
  const item = ["a", "b", "c", "d", "e", "f"];

  Array.from(combinationSet(item, 3));
  //=>
  //  [
  //    [ "a", "b", "c" ], [ "a", "b", "d" ],
  //    [ "a", "b", "e" ], [ "a", "b", "f" ],
  //    [ "a", "c", "d" ], [ "a", "c", "e" ],
  //    [ "a", "c", "f" ], [ "a", "d", "e" ],
  //    [ "a", "d", "f" ], [ "a", "e", "f" ],
  //    [ "b", "c", "d" ], [ "b", "c", "e" ],
  //    [ "b", "c", "f" ], [ "b", "d", "e" ],
  //    [ "b", "d", "f" ], [ "b", "e", "f" ],
  //    [ "c", "d", "e" ], [ "c", "d", "f" ],
  //    [ "c", "e", "f" ], [ "d", "e", "f" ]
  //  ]

  Array.from(permutationSet(item, 3));
  //=>
  //  [
  //    [ "a", "b", "c" ], [ "a", "b", "d" ],
  //    [ "a", "b", "e" ], [ "a", "b", "f" ],
  //    [ "a", "c", "b" ], [ "a", "c", "d" ],
  //    [ "a", "c", "e" ], [ "a", "c", "f" ],
  //    [ "a", "d", "b" ], [ "a", "d", "c" ],
  //    [ "a", "d", "e" ], [ "a", "d", "f" ],
  //    [ "a", "e", "b" ], [ "a", "e", "c" ],
  //    [ "a", "e", "d" ], [ "a", "e", "f" ],
  //    [ "a", "f", "b" ], [ "a", "f", "c" ],
  //    [ "a", "f", "d" ], [ "a", "f", "e" ],
  //    [ "b", "a", "c" ], [ "b", "a", "d" ],
  //    [ "b", "a", "e" ], [ "b", "a", "f" ],
  //    [ "b", "c", "a" ], [ "b", "c", "d" ],
  //    [ "b", "c", "e" ], [ "b", "c", "f" ],
  //    [ "b", "d", "a" ], [ "b", "d", "c" ],
  //    [ "b", "d", "e" ], [ "b", "d", "f" ],
  //    [ "b", "e", "a" ], [ "b", "e", "c" ],
  //    [ "b", "e", "d" ], [ "b", "e", "f" ],
  //    [ "b", "f", "a" ], [ "b", "f", "c" ],
  //    [ "b", "f", "d" ], [ "b", "f", "e" ],
  //    ... +80
  //  ]
  ```
- ```js
  Array.from(combinationCollection({ foo: [1, 2, 3], bar: [4, 5, 6] }));
  //=>
  //  [
  //    { foo: 1, bar: 4 }, { foo: 1, bar: 5 },
  //    { foo: 1, bar: 6 }, { foo: 2, bar: 4 },
  //    { foo: 2, bar: 5 }, { foo: 2, bar: 6 },
  //    { foo: 3, bar: 4 }, { foo: 3, bar: 5 },
  //    { foo: 3, bar: 6 }
  //  ]
  ```
