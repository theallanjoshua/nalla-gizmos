import { resolve } from 'node:path';
import { setupESlint } from './gizmos/helpers/dev/lib/linters/eslint';
import tsconfig from './tsconfig.json' with { type: 'json' };

const pathToTSConfigs = tsconfig.references.map(({ path }) => resolve(__dirname, path, 'tsconfig.json'));

export default setupESlint({
	pathToTSConfigs: [resolve(__dirname, './tsconfig.dev.json'), ...pathToTSConfigs],
	internalImportsPathAliases: ['@nalla-gizmos', '~'],
	productionFilesGlobPattern: 'gizmos/*/*/{lib,src}/**/*.{ts,tsx}',
	testsDirName: '__tests__',
	disallowedProductionImportsGlobPatterns: [
		'test/**/*',
		'!/**',
	],
});
