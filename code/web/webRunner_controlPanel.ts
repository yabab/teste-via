// Constant Variables
export const protractorCommandTemplate: string = "node ./node_modules/protractor/bin/protractor";
export const protractorDisableChecksFlag: string = "--disableChecks";
export const remoteServerInternalParameter: string = "seleniumAddress";
export const seleniumServerHubEndpoint: string = "/wd/hub";
export const webArgumentIndexOffset: number = 2;
export const webCucumberTagsParameter: string = "cucumberOpts.tags";
export const webHeadlessParameterName: string = "headless";
export const webRemoteServerParameterName: string = "server";

export const webHeadlessCapabilitiesArray: string[] = [
    `--capabilities.chromeOptions.args="--headless"`,
    `--capabilities.chromeOptions.args="--disable-gpu"`,
    `--capabilities.chromeOptions.args="--window-size=800,600"`,
    `--capabilities.chromeOptions.args="--no-sandbox"`
]

// String Builders
export function BuildJavascriptWebConfigFilesPath(configurationFileName: string): string {
    return `javascript/web/configs/${configurationFileName}.js`;
}