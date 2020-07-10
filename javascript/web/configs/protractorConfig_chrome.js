"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const controlPanel = __importStar(require("./protractorConfig_controlPanel"));
const generalUtils = __importStar(require("../../general/support/generalUtils_logic"));
const path = __importStar(require("path"));
const rprtr = __importStar(require("../../general/support/reporter_logic"));
const sysControlPanel = __importStar(require("../../general/support/system_controlPanel"));
generalUtils.sortEnvVariables(process.argv, controlPanel.webEnvironmentVariablesScanOffset);
const jsonReports = path.join(process.cwd(), sysControlPanel.reportFilesFolder, sysControlPanel.reportJsonSubFolder);
const executionName = sysControlPanel.webChromeExecutionName;
const testSignature = sysControlPanel.BuildTestSignatureName(executionName, generalUtils.getEnvVar(sysControlPanel.environmentVariableName), generalUtils.getEnvVar(sysControlPanel.loopFlagVariableName), generalUtils.getEnvVar(sysControlPanel.loopIterationVariableName));
const testTimeString = sysControlPanel.BuildTestTimeString();
exports.config = {
    SELENIUM_PROMISE_MANAGER: false,
    seleniumAddress: controlPanel.BuildSeleniumServerConnectionString(controlPanel.seleniumDefaultConnectionProtocol, controlPanel.seleniumDefaultHostAddress, controlPanel.seleniumDefaultPortNumber),
    capabilities: {
        browserName: executionName,
        chromeOptions: {
            args: controlPanel.protractorChromeArgsList,
        }
    },
    framework: controlPanel.protractorFrameworkOption,
    frameworkPath: require.resolve(controlPanel.protractorCustomFrameworkName),
    specs: controlPanel.protractorSpecLocationList,
    onPrepare: () => {
        rprtr.Reporter.createDirectory(jsonReports);
    },
    cucumberOpts: {
        format: controlPanel.BuildWebReportFormatGlob(testSignature, testTimeString),
        require: controlPanel.protractorCodeLocationList,
        strict: true
    },
    onComplete: () => {
        rprtr.Reporter.createHTMLReport(testSignature, testTimeString);
    },
};
//# sourceMappingURL=protractorConfig_chrome.js.map