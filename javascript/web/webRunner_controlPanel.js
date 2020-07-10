"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.protractorCommandTemplate = "node ./node_modules/protractor/bin/protractor";
exports.protractorDisableChecksFlag = "--disableChecks";
exports.remoteServerInternalParameter = "seleniumAddress";
exports.seleniumServerHubEndpoint = "/wd/hub";
exports.webArgumentIndexOffset = 2;
exports.webCucumberTagsParameter = "cucumberOpts.tags";
exports.webHeadlessParameterName = "headless";
exports.webRemoteServerParameterName = "server";
exports.webHeadlessCapabilitiesArray = [
    `--capabilities.chromeOptions.args="--headless"`,
    `--capabilities.chromeOptions.args="--disable-gpu"`,
    `--capabilities.chromeOptions.args="--window-size=800,600"`,
    `--capabilities.chromeOptions.args="--no-sandbox"`
];
function BuildJavascriptWebConfigFilesPath(configurationFileName) {
    return `javascript/web/configs/${configurationFileName}.js`;
}
exports.BuildJavascriptWebConfigFilesPath = BuildJavascriptWebConfigFilesPath;
//# sourceMappingURL=webRunner_controlPanel.js.map