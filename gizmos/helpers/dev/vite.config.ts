import { setupViteForNodeLibrary } from './lib/compilers/vite-lib-node';
import packageJson from './package.json' with { type: 'json' };

// https://vite.dev/config/
export default setupViteForNodeLibrary({
	entries: {
		index: './lib/index.ts',
	},
	peerDependencies: Object.keys(packageJson.peerDependencies),
});
