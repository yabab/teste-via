"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const controlPanel = __importStar(require("./reporter_controlPanel"));
const fileSystem = __importStar(require("fs"));
const mkdirp = __importStar(require("mkdirp"));
const path = __importStar(require("path"));
const reporter = __importStar(require("cucumber-html-reporter"));
const sysControlPanel = __importStar(require("./system_controlPanel"));
const jsonReports = path.join(process.cwd(), controlPanel.BuildReportsFolderPath(sysControlPanel.reportFilesFolder, sysControlPanel.reportJsonSubFolder));
const htmlReports = path.join(process.cwd(), controlPanel.BuildReportsFolderPath(sysControlPanel.reportFilesFolder, controlPanel.htmlReportsSubFolder));
let cucumberReporterOptions;
cucumberReporterOptions = {
    reportSuiteAsScenarios: controlPanel.suiteAsScenariosOption,
    theme: controlPanel.reporterThemeOption,
};
class Reporter {
    static createDirectory(dir) {
        if (!fileSystem.existsSync(dir)) {
            mkdirp.sync(dir);
        }
    }
    static createHTMLReport(testSignature, executionTime) {
        try {
            cucumberReporterOptions[controlPanel.jsonFileAttributeName] = controlPanel.BuildJsonReportName(jsonReports, testSignature, executionTime);
            cucumberReporterOptions[controlPanel.outputAttributeName] = controlPanel.BuildHtmlReportName(htmlReports, testSignature, executionTime);
            reporter.generate(cucumberReporterOptions);
        }
        catch (err) {
            if (err) {
                throw new Error(controlPanel.BuildReportGenerationFailedErrorMessage(cucumberReporterOptions[controlPanel.jsonFileAttributeName], cucumberReporterOptions[controlPanel.outputAttributeName]));
            }
        }
    }
}
exports.Reporter = Reporter;
//# sourceMappingURL=reporter_logic.js.map