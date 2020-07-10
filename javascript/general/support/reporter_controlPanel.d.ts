export declare const htmlReportsSubFolder: string;
export declare const jsonFileAttributeName: string;
export declare const outputAttributeName: string;
export declare const reporterThemeOption: string;
export declare const suiteAsScenariosOption: boolean;
export declare function BuildReportsFolderPath(generalReportsFolder: string, subFolderPath: string): string;
export declare function BuildJsonReportName(folderPath: string, testSignature: string, executionTime: string): string;
export declare function BuildHtmlReportName(folderPath: string, testSignature: string, executionTime: string): string;
export declare function BuildReportGenerationFailedErrorMessage(jsonFileName: string, htmlFileName: string): string;
