import { setupViteForReactLibrary } from '@nalla-gizmos/helpers-dev';

// https://vite.dev/config/
export default setupViteForReactLibrary({
	entries: {
		index: './lib/index.ts',
	},
});
