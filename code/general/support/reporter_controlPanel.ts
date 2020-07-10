// Constant Variables
export const htmlReportsSubFolder: string = "/html";
export const jsonFileAttributeName: string = "jsonFile";
export const outputAttributeName: string = "output";
export const reporterThemeOption: string = "bootstrap";
export const suiteAsScenariosOption: boolean = true;

// String Builders
export function BuildReportsFolderPath(generalReportsFolder: string, subFolderPath: string): string {
    return `${generalReportsFolder}${subFolderPath}`;
}

export function BuildJsonReportName(folderPath: string, testSignature: string, executionTime: string): string {
    return `${folderPath}/report_${testSignature.toLocaleLowerCase()}_${executionTime.toLocaleLowerCase()}.json`;
}

export function BuildHtmlReportName(folderPath: string, testSignature: string, executionTime: string): string {
    return `${folderPath}/report_${testSignature.toLocaleLowerCase()}_${executionTime.toLocaleLowerCase()}.html`;
}

export function BuildReportGenerationFailedErrorMessage(jsonFileName: string, htmlFileName: string): string {
    return `Failed to save Cucumber test results. JSON file name: '${jsonFileName}'. HTML file name: '${htmlFileName}'.`;
}