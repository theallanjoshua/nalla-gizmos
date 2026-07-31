import { setupViteForNodeLibrary } from '@nalla-gizmos/helpers-dev';

// https://vite.dev/config/
export default setupViteForNodeLibrary({
	entries: {
		index: './lib/index.ts',
	},
});
