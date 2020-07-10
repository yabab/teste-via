"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.webEnvironmentVariablesScanOffset = 2;
exports.seleniumDefaultConnectionProtocol = "http";
exports.seleniumDefaultHostAddress = "127.0.0.1";
exports.seleniumDefaultPortNumber = "4444";
exports.protractorFrameworkOption = "custom";
exports.protractorCustomFrameworkName = "protractor-cucumber-framework";
exports.protractorChromeArgsList = ["--start-maximized"];
exports.protractorSpecLocationList = [`../../../features/*.feature`];
exports.protractorCodeLocationList = ["../../../javascript/{general,web}/{stepdefinitions,support}/*.js"];
function BuildWebReportFormatGlob(signature, testTime) {
    return `json:./reports/json/report_${signature}_${testTime}.json`;
}
exports.BuildWebReportFormatGlob = BuildWebReportFormatGlob;
function BuildSeleniumServerConnectionString(seleniumProtocol, seleniumHost, seleniumPort) {
    return `${seleniumProtocol}://${seleniumHost}:${seleniumPort}/wd/hub`;
}
exports.BuildSeleniumServerConnectionString = BuildSeleniumServerConnectionString;
//# sourceMappingURL=protractorConfig_controlPanel.js.map