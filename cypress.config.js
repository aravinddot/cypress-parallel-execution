const { defineConfig } = require("cypress");
const createBundler = require("@bahmutov/cypress-esbuild-preprocessor");
const addCucumberPreprocessorPlugin =
	require("@badeball/cypress-cucumber-preprocessor").addCucumberPreprocessorPlugin;
const createEsbuildPlugin =
	require("@badeball/cypress-cucumber-preprocessor/esbuild").createEsbuildPlugin;
module.exports = defineConfig({
	e2e: {
		async setupNodeEvents(on, config) {
			const bundler = createBundler({
				plugins: [createEsbuildPlugin(config)],
			});

			on("file:preprocessor", bundler);
			await addCucumberPreprocessorPlugin(on, config);

			return config;
		},
		baseUrl: 'https://automationexercise.com/',
		specPattern: 'src/feature/*.feature',
		fixturesFolder: 'src/fixtures',
		redirectionLimit: 50,
		chromeWebSecurity: true,
		defaultCommandTimeout: 60000,
		execTimeout: 60000,
		pageLoadTimeout: 60000,
		viewportHeight: 1080,
		viewportWidth: 1920,
	},
});
