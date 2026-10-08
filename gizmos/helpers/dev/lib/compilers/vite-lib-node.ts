import type { SetupViteForLibraryProps } from './vite-lib';
import { setupViteForLibrary } from './vite-lib';

export type SetupViteForNodeLibraryProps = Pick<
	SetupViteForLibraryProps,
	'entries'
	| 'peerDependencies'
	| 'copyDirs'
>;

export function setupViteForNodeLibrary(props: SetupViteForNodeLibraryProps) {
	return setupViteForLibrary({
		...props,
		isSSR: true,
	});
}
