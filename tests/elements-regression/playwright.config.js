import { config as _config } from 'dotenv';
import { resolve } from 'path';

_config( {
	path: resolve( __dirname, './.env' ),
} );

/** @type {import('@playwright/test').PlaywrightTestConfig} */
export default {
	testDir: './tests/',

	timeout: 2 * 60 * 1000,
	globalSetup: resolve( __dirname, './src/global-setup.js' ),
	expect: {
		timeout: 5000,
	},

	forbidOnly: !! process.env.CI,
	retries: process.env.CI ? 1 : 0,
	workers: process.env.CI ? 5 : 1,
	fullyParallel: true,
	reporter: process.env.CI ? 'github' : 'list',
	use: {
		headless: true,
		actionTimeout: 8000,
		navigationTimeout: 8000,
		trace: 'on-first-retry',
		video: process.env.CI ? 'retain-on-failure' : 'off',
		viewport: { width: 1920, height: 1080 },
		baseURL: process.env.ELEMENTS_REGRESSION_BASE_URL || 'http://localhost:8888',
		storageState: resolve( __dirname, 'storage-state.json' ),
		// @ts-ignore
		validateAllPreviousCasesChecked: process.env.ELEMENTS_REGRESSION_VALIDATE_ALL_PREVIOUS_TEST_CASES || ( process.env.CI ? 'on' : 'off' ),
		user: {
			username: process.env.ELEMENTS_REGRESSION_WP_USERNAME || 'admin',
			password: process.env.ELEMENTS_REGRESSION_WP_PASSWORD || 'password',
		},
	},
};
