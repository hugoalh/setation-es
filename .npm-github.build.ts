import {
	readManifest,
	transform
} from "DNT";
const manifest = await readManifest("jsr.jsonc");
await transform({
	copyEntries: [
		"LICENSE.md",
		"README.md"
	],
	//@ts-ignore Lazy type.
	entrypointsScript: manifest.exports,
	generateDeclarationMap: true,
	mappings: {
		"https://raw.githubusercontent.com/hugoalh/sort-es/v0.4.0/compare.ts": {
			name: "@hugoalh/sort",
			version: "^0.4.0",
			subPath: "compare"
		}
	},
	metadata: {
		//@ts-ignore Lazy type.
		name: manifest.name,
		//@ts-ignore Lazy type.
		version: manifest.version,
		description: "A module to list permutations or combinations from the collection or set.",
		keywords: [
			"combination",
			"permutation",
			"set",
			"setation"
		],
		homepage: "https://github.com/hugoalh/setation-es#readme",
		bugs: {
			url: "https://github.com/hugoalh/setation-es/issues"
		},
		license: "MIT",
		author: "hugoalh",
		repository: {
			type: "git",
			url: "git+https://github.com/hugoalh/setation-es.git"
		},
		private: false,
		publishConfig: {
			access: "public"
		}
	},
	outputDirectory: "dist/npm-github",
	outputDirectoryPreEmpty: true
});
