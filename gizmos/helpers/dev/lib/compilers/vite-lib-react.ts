import react from '@vitejs/plugin-react';
import { libInjectCss } from 'vite-plugin-lib-inject-css';
import type { SetupViteForLibraryProps } from './vite-lib';
import { setupViteForLibrary } from './vite-lib';

export type SetupViteForReactLibraryProps = Pick<
	SetupViteForLibraryProps,
	'entries'
	| 'peerDependencies'
	| 'copyDirs'
	| 'additionalPlugins'
	| 'devServerPort'
>;

export function setupViteForReactLibrary(props: SetupViteForReactLibraryProps) {
	const { additionalPlugins = [], ...remainingProps } = props;

	return setupViteForLibrary({
		...remainingProps,
		additionalPlugins: [
			react({
				jsxRuntime: 'automatic', // explicitly tell Vite to use the modern runtime instead of injecting import { jsx as _jsx } from "react/jsx-runtime"
			}),
			libInjectCss(),
			...additionalPlugins,
		],
	});
}
