"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.htmlReportsSubFolder = "/html";
exports.jsonFileAttributeName = "jsonFile";
exports.outputAttributeName = "output";
exports.reporterThemeOption = "bootstrap";
exports.suiteAsScenariosOption = true;
function BuildReportsFolderPath(generalReportsFolder, subFolderPath) {
    return `${generalReportsFolder}${subFolderPath}`;
}
exports.BuildReportsFolderPath = BuildReportsFolderPath;
function BuildJsonReportName(folderPath, testSignature, executionTime) {
    return `${folderPath}/report_${testSignature.toLocaleLowerCase()}_${executionTime.toLocaleLowerCase()}.json`;
}
exports.BuildJsonReportName = BuildJsonReportName;
function BuildHtmlReportName(folderPath, testSignature, executionTime) {
    return `${folderPath}/report_${testSignature.toLocaleLowerCase()}_${executionTime.toLocaleLowerCase()}.html`;
}
exports.BuildHtmlReportName = BuildHtmlReportName;
function BuildReportGenerationFailedErrorMessage(jsonFileName, htmlFileName) {
    return `Failed to save Cucumber test results. JSON file name: '${jsonFileName}'. HTML file name: '${htmlFileName}'.`;
}
exports.BuildReportGenerationFailedErrorMessage = BuildReportGenerationFailedErrorMessage;
//# sourceMappingURL=reporter_controlPanel.js.map