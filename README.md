# Setation (ES)

[**⚖️** MIT](./LICENSE.md)

[![GitHub: hugoalh/setation-es](https://img.shields.io/github/v/release/hugoalh/setation-es?label=hugoalh/setation-es&labelColor=181717&logo=github&logoColor=ffffff&sort=semver&style=flat "GitHub: hugoalh/setation-es")](https://github.com/hugoalh/setation-es)
[![JSR: @hugoalh/setation](https://img.shields.io/jsr/v/@hugoalh/setation?label=@hugoalh/setation&labelColor=F7DF1E&logo=jsr&logoColor=000000&style=flat "JSR: @hugoalh/setation")](https://jsr.io/@hugoalh/setation)
[![NPM: @hugoalh/setation](https://img.shields.io/npm/v/@hugoalh/setation?label=@hugoalh/setation&labelColor=CB3837&logo=npm&logoColor=ffffff&style=flat "NPM: @hugoalh/setation")](https://www.npmjs.com/package/@hugoalh/setation)

An ECMAScript (JavaScript & TypeScript) module to list permutations or combinations from the collection or set.

## 🔰 Begin

### 🎯 Targets

| **Targets** | **Remote** | **JSR** | **NPM** |
|:--|:-:|:-:|:-:|
| **[Bun](https://bun.sh/)** >= v1.1.0 | ❌ | ✔️ | ✔️ |
| **[Deno](https://deno.land/)** >= v2.1.0 | ✔️ | ✔️ | ✔️ |
| **[NodeJS](https://nodejs.org/)** >= v20.9.0 | ❌ | ✔️ | ✔️ |

> [!NOTE]
> - It is possible to use this module in other methods/ways which not listed in here, however those methods/ways are not officially supported, and should beware maybe cause security issues.

### #️⃣ Resources Identifier

- **Remote - GitHub Raw:**
  ```
  https://raw.githubusercontent.com/hugoalh/setation-es/{Tag}/mod.ts
  ```
- **JSR:**
  ```
  [jsr:]@hugoalh/setation[@{Tag}]
  ```
- **NPM:**
  ```
  [npm:]@hugoalh/setation[@{Tag}]
  ```

> [!NOTE]
> - For usage of remote resources, it is recommended to import the entire module with the main path `mod.ts`, however it is also able to import part of the module with sub path if available, but do not import if:
>
>   - it's path has an underscore prefix (e.g.: `_foo.ts`, `_util/bar.ts`), or
>   - it is a benchmark or test file (e.g.: `foo.bench.ts`, `foo.test.ts`), or
>   - it's symbol has an underscore prefix (e.g.: `_bar`, `_foo`).
>
>   These elements are not considered part of the public API, thus no stability is guaranteed for them.
> - For usage of JSR or NPM resources, it is recommended to import the entire module with the main entrypoint, however it is also able to import part of the module with sub entrypoint if available, please visit the [file `jsr.jsonc`](./jsr.jsonc) property `exports` for available sub entrypoints.
> - It is recommended to use this module with tag for immutability.

### 🛡️ Runtime Permissions

*This module does not request any runtime permission.*

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
>   - [Deno CLI `deno doc`](https://docs.deno.com/runtime/reference/cli/documentation_generator/)
>   - [JSR](https://jsr.io/@hugoalh/setation)

## ✍️ Examples

- ```js
  const item = ["a", "b", "c", "d", "e", "f"];

  Array.from(combinationSet(item, 3));
  /*=>
  [
    [ "a", "b", "c" ], [ "a", "b", "d" ],
    [ "a", "b", "e" ], [ "a", "b", "f" ],
    [ "a", "c", "d" ], [ "a", "c", "e" ],
    [ "a", "c", "f" ], [ "a", "d", "e" ],
    [ "a", "d", "f" ], [ "a", "e", "f" ],
    [ "b", "c", "d" ], [ "b", "c", "e" ],
    [ "b", "c", "f" ], [ "b", "d", "e" ],
    [ "b", "d", "f" ], [ "b", "e", "f" ],
    [ "c", "d", "e" ], [ "c", "d", "f" ],
    [ "c", "e", "f" ], [ "d", "e", "f" ]
  ]
  */

  Array.from(permutationSet(item, 3));
  /*=>
  [
    [ "a", "b", "c" ], [ "a", "b", "d" ],
    [ "a", "b", "e" ], [ "a", "b", "f" ],
    [ "a", "c", "b" ], [ "a", "c", "d" ],
    [ "a", "c", "e" ], [ "a", "c", "f" ],
    [ "a", "d", "b" ], [ "a", "d", "c" ],
    [ "a", "d", "e" ], [ "a", "d", "f" ],
    [ "a", "e", "b" ], [ "a", "e", "c" ],
    [ "a", "e", "d" ], [ "a", "e", "f" ],
    [ "a", "f", "b" ], [ "a", "f", "c" ],
    [ "a", "f", "d" ], [ "a", "f", "e" ],
    [ "b", "a", "c" ], [ "b", "a", "d" ],
    [ "b", "a", "e" ], [ "b", "a", "f" ],
    [ "b", "c", "a" ], [ "b", "c", "d" ],
    [ "b", "c", "e" ], [ "b", "c", "f" ],
    [ "b", "d", "a" ], [ "b", "d", "c" ],
    [ "b", "d", "e" ], [ "b", "d", "f" ],
    [ "b", "e", "a" ], [ "b", "e", "c" ],
    [ "b", "e", "d" ], [ "b", "e", "f" ],
    [ "b", "f", "a" ], [ "b", "f", "c" ],
    [ "b", "f", "d" ], [ "b", "f", "e" ],
    ... +80
  ]
  */
  ```
- ```js
  Array.from(combinationCollection({ foo: [1, 2, 3], bar: [4, 5, 6] }));
  /*=>
  [
    { foo: 1, bar: 4 }, { foo: 1, bar: 5 },
    { foo: 1, bar: 6 }, { foo: 2, bar: 4 },
    { foo: 2, bar: 5 }, { foo: 2, bar: 6 },
    { foo: 3, bar: 4 }, { foo: 3, bar: 5 },
    { foo: 3, bar: 6 }
  ]
  */
  ```
