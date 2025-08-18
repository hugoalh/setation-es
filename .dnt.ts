import {
	getMetadataFromConfig,
	invokeDenoNodeJSTransformer
} from "DNT";
const configJSR = await getMetadataFromConfig("jsr.jsonc");
await invokeDenoNodeJSTransformer({
	copyAssets: [
		"LICENSE.md",
		"README.md"
	],
	entrypoints: configJSR.getExports(),
	fixInjectedImports: true,
	generateDeclarationMap: true,
	metadata: {
		name: configJSR.getName(),
		version: configJSR.getVersion(),
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
		scripts: {
		},
		engines: {
		},
		private: false,
		publishConfig: {
			access: "public"
		}
	},
	outputDirectory: "dist/npm",
	outputDirectoryPreEmpty: true
});
