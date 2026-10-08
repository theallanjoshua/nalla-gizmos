import type { PluginOption, UserConfig } from 'vite';
import { cpSync } from 'node:fs';
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';
import tsconfigPaths from 'vite-tsconfig-paths';

type CopyDirsPluginProps = { src: string; dest: string }[];

function copyDirsPlugin(props: CopyDirsPluginProps): PluginOption {
	return props.map(({ src, dest }, index) => ({
		name: `copy-dirs-${String(index)}`,
		closeBundle() {
			cpSync(src, dest, { recursive: true });
		},
	}));
}

export interface SetupViteForLibraryProps {
	entries: Record<string, string>;
	peerDependencies?: string[];
	additionalPlugins?: PluginOption[];
	publicDir?: string;
	copyDirs?: CopyDirsPluginProps;
	isSSR?: boolean;
	devServerPort?: number;
}

export function setupViteForLibrary(props: SetupViteForLibraryProps) {
	const {
		entries,
		peerDependencies = [],
		additionalPlugins = [],
		publicDir,
		copyDirs = [],
		isSSR,
		devServerPort,
	} = props;

	const plugins: UserConfig['plugins'] = [
		tsconfigPaths(),
		dts(),
		publicDir
			? {
					name: 'watch-public-dir',
					buildStart() {
						this.addWatchFile(publicDir);
					},
				}
			: undefined,
		copyDirsPlugin(copyDirs),
		...additionalPlugins,
	];

	const rollupOptions = {
		// Need this condition to match peerDependencies key (@cloudscape-design/components) to import path (@cloudscape-design/components/box)
		external: (id: string) => peerDependencies.some((dep) => id.startsWith(dep)),
		output: {
			entryFileNames: '[name].js',
			chunkFileNames: 'chunks/[name].js',
			assetFileNames: 'assets/[name].[ext]',
		},
	};

	const build: UserConfig['build'] = {
		minify: true,
		ssr: isSSR,
		lib: {
			entry: entries,
			formats: ['es'],
		},
		rollupOptions,
	};

	const server = devServerPort && {
		port: devServerPort,
		strictPort: true, // Fail if port if unavailable
	};

	return defineConfig({
		plugins,
		publicDir,
		build,
		...server,
	});
}
