import * as controlPanel from "./protractorConfig_controlPanel";
import * as generalUtils from "../../general/support/generalUtils_logic";
import * as path from "path";
import * as protractor from "protractor";
import * as rprtr from "../../general/support/reporter_logic";
import * as sysControlPanel from "../../general/support/system_controlPanel";

generalUtils.sortEnvVariables(
    process.argv,
    controlPanel.webEnvironmentVariablesScanOffset
);

const jsonReports = path.join(
    process.cwd(),
    sysControlPanel.reportFilesFolder,
    sysControlPanel.reportJsonSubFolder
);

const executionName = sysControlPanel.webChromeExecutionName;

const testSignature = sysControlPanel.BuildTestSignatureName(
    executionName,
    generalUtils.getEnvVar(sysControlPanel.environmentVariableName),
    generalUtils.getEnvVar(sysControlPanel.loopFlagVariableName),
    generalUtils.getEnvVar(sysControlPanel.loopIterationVariableName) as number
);

const testTimeString = sysControlPanel.BuildTestTimeString();

export const config: protractor.Config = {
    SELENIUM_PROMISE_MANAGER: false,

    seleniumAddress: controlPanel.BuildSeleniumServerConnectionString(
        controlPanel.seleniumDefaultConnectionProtocol,
        controlPanel.seleniumDefaultHostAddress,
        controlPanel.seleniumDefaultPortNumber
    ),

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
        format: controlPanel.BuildWebReportFormatGlob(
            testSignature,
            testTimeString
        ),

        require: controlPanel.protractorCodeLocationList,

        strict: true
    },

    onComplete: () => {
        rprtr.Reporter.createHTMLReport(
            testSignature,
            testTimeString
        );
    },
};
