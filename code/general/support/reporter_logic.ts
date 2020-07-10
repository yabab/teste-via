import * as controlPanel from "./reporter_controlPanel";
import * as fileSystem from "fs";
import * as mkdirp from "mkdirp";
import * as path from "path";
import * as reporter from "cucumber-html-reporter";
import * as sysControlPanel from "./system_controlPanel";

import { GenericStringMap } from "./customTypes_logic";

const jsonReports = path.join(
    process.cwd(),
    controlPanel.BuildReportsFolderPath(
        sysControlPanel.reportFilesFolder,
        sysControlPanel.reportJsonSubFolder
    )
);

const htmlReports = path.join(
    process.cwd(),
    controlPanel.BuildReportsFolderPath(
        sysControlPanel.reportFilesFolder,
        controlPanel.htmlReportsSubFolder
    )
);

let cucumberReporterOptions: GenericStringMap;

cucumberReporterOptions = {
    reportSuiteAsScenarios: controlPanel.suiteAsScenariosOption,
    theme: controlPanel.reporterThemeOption,
};

export class Reporter {
    public static createDirectory(dir: string): void {
        if (!fileSystem.existsSync(dir)) {
            mkdirp.sync(dir);
        }
    }

    public static createHTMLReport(
        testSignature: string,
        executionTime: string
    ): void {
        try {
            cucumberReporterOptions[controlPanel.jsonFileAttributeName] = controlPanel.BuildJsonReportName(
                jsonReports,
                testSignature,
                executionTime
            );

            cucumberReporterOptions[controlPanel.outputAttributeName] = controlPanel.BuildHtmlReportName(
                htmlReports,
                testSignature,
                executionTime
            );

            reporter.generate(cucumberReporterOptions);
        } catch (err) {
            if (err) {
                throw new Error(
                    controlPanel.BuildReportGenerationFailedErrorMessage(
                        cucumberReporterOptions[controlPanel.jsonFileAttributeName],
                        cucumberReporterOptions[controlPanel.outputAttributeName]
                    )
                );
            }
        }
    }
}
