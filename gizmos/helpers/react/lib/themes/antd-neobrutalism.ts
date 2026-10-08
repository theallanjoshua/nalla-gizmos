import type { ThemeConfig } from 'antd';

export function getAntDNeobrutalismTheme(isDark: boolean) {
	const shared = {
		borderRadius: 14,
		lineWidth: 3,
		fontFamily: '"Lexend", system-ui, sans-serif',
	};

	if (isDark) {
		return {
			token: {
				...shared,
				colorBorder: '#FFFFFF',
				boxShadow: '5px 5px 0px 0px #FFFFFF',
				boxShadowSecondary: '5px 5px 0px 0px #FFFFFF',

				colorPrimary: '#A3E635', // Cyber Lime
				colorLink: '#A3E635', // ✨ Simplification trick: forces focus states to match primary
				colorBgContainer: '#1C1917',
				colorBgLayout: '#09090B',
				colorTextBase: '#FFFFFF',
			},
		} as const satisfies ThemeConfig;
	}

	return {
		token: {
			...shared,
			colorBorder: '#1C1917',
			boxShadow: '5px 5px 0px 0px #1C1917',
			boxShadowSecondary: '5px 5px 0px 0px #1C1917',

			colorPrimary: '#6366F1', // Pastel Indigo
			colorLink: '#6366F1', // ✨ Simplification trick
			colorBgContainer: '#FFFFFF',
			colorBgLayout: '#EEF2F6',
			colorTextBase: '#1C1917',
		},
	} as const satisfies ThemeConfig;
}
