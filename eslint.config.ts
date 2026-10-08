import { globSync } from 'node:fs';
import { resolve } from 'node:path';
import { setupESlint } from '@nalla-gizmos/helpers-dev';

const packageGlob = 'gizmos/*/*';

const pathToTSConfigs = globSync(`${packageGlob}/tsconfig.json`, {
	cwd: __dirname,
	exclude: ['**/node_modules/**', '**/dist/**'],
}).map((p) => resolve(__dirname, p));

export default setupESlint({
	pathToTSConfigs: [resolve(__dirname, './tsconfig.json'), ...pathToTSConfigs],
	internalImportsPathAliases: ['@nalla-gizmos', '~'],
	productionFilesGlobPattern: `${packageGlob}/{lib,src}/**/*.{ts,tsx}`,
	testsDirName: '__tests__',
	disallowedProductionImportsGlobPatterns: [
		'test/**/*',
		'!/**',
	],
});
