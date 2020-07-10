import { pickle } from "cucumber";
import { StdioOptions } from "child_process";

// Constant Variables
export const oneSecondInMilliseconds: number = 1000;
export const parseIntDecimalRadix: number = 10;
export const defaultInteractionWait: number = 10 * oneSecondInMilliseconds;

export const pollFrequencyDivisionFactor = 0.25;
export const defaultPollFrequency: number = oneSecondInMilliseconds * pollFrequencyDivisionFactor;
export const defaultMaxInterations: number = oneSecondInMilliseconds / defaultPollFrequency * 30;

export const loopLimitMinimumThreshold: number = 1;
export const loopTimeoutMinimumThreshold: number = 10;

export const webElementValueAttributeName: string = "value";
export const tagsParameterName: string = "tags";

export const mobileEnvironmentVariablesScanOffset: number = 2;
export const childProcessStdIoOption: StdioOptions = ["ignore", "inherit", "inherit"];

export const webChromeExecutionName: string = "chrome";
export const webFirefoxExecutionName: string = "firefox";
export const androidAppExecutionName: string = "android-app";
export const androidWebExecutionName: string = "android-web";

export const emptyString: string = "";
export const periodDotString: string = ".";
export const zeroString: string = "0";
export const newLineString: string = "\n";
export const hashString: string = "#";
export const dollarString: string = "$";
export const equalsString: string = "=";
export const evaluationSuccessfulString: string = "success";
export const evaluationFailedString: string = "failure";
export const unknownString: string = "unknown";
export const doubleDashString: string = "--";
export const existenceStepsAppearanceString: string = "apareça";
export const existenceStepsDisappearanceString: string = "desapareça";
export const existenceStepsExistsString: string = "exista";
export const existenceStepsNonExistsString: string = "não exista";

export const imeiVariableName: string = "imei";
export const clientCodeVariableName: string = "codigo_cliente";
export const environmentVariableName: string = "environment";
export const dbPasswordVariableName: string = "passDB";
export const dbUserVariableName: string = "userDB";
export const allImagesVariableName: string = "allImages";
export const loopFlagVariableName: string = "loopingTest";
export const loopIterationVariableName: string = "loopIteration";
export const loopTimeoutVariableName: string = "loopTimeout";
export const loopLimitVariableName: string = "loopLimit";

export const databaseJsonUser: string = "db2_user";
export const databaseQueryTableCteTelCel: string = "CTE_TEL_CEL";

export const reportFilesFolder: string = "/reports";
export const reportJsonSubFolder: string = "/json";
export const screenshotEncodingString: string = "image/png";

export const standardInputEncodingOption: string = "utf8";
export const standardInputDataEventName: string = "data";
export const asciiStringCtrlC: string = "\u0003";
export const childProcessExitEventName: string = "exit";
export const childProcessLoopExitKey: string = "q";

// String Builders
export function BuildDbConnectionString(dbHostName: string, dbPortNumber: string, dbDriverName: string, dataBaseName: string, databaseUser: string, databaseUserPassword: string): string {
    return `HOSTNAME=${dbHostName};port=${dbPortNumber};DRIVER=${dbDriverName};DATABASE=${dataBaseName};UID=${databaseUser};PWD=${databaseUserPassword}`;
}

export function BuildJsonSelectQuery(column: string, schema: string, table: string, conditions: string): string {
    return `select ${column} FROM ${schema}${table} where ${conditions}`
}

export function BuildTestCaseConsoleHeader(cucumberPickle: pickle.Pickle): string {
    return `${newLineString}${newLineString}Funcionalidade: ${cucumberPickle.tags[0].name}${newLineString}Cenário: ${cucumberPickle.name}`;
}

export function BuildTestSignatureName(platformString: string, environmentString: string, loopingTest: boolean = false, loopIteration: number = 0): string {
    if (environmentString === emptyString || environmentString === undefined || environmentString === null) {
        environmentString = unknownString;
    }

    if (loopingTest !== undefined && loopingTest) {
        if (loopIteration === undefined) {
            loopIteration = 0;
        }

        return `loop${loopIteration}_${environmentString}_${platformString}`;
    } else {
        return `${environmentString}_${platformString}`;
    }
}

export function BuildMemoryString(text: string): string {
    return `${hashString}${text}${dollarString}`;
}

export function BuildQuantumSuperPositionErrorMessage(elementSelector: string[]): string {
    return `Major conundrum: how was this element not absent AND not present? State superposition at its best for element '${elementSelector}'.`;
}

export function BuildInconsistentAppeareanceErrorMessage(elementSelector: string[]): string {
    return `Element '${elementSelector}' didn't appear consistently in the alloted time.`;
}

export function BuildInconsistentDisappeareanceErrorMessage(elementSelector: string[]): string {
    return `Element '${elementSelector}' didn't disappear consistently in the alloted time.`;
}

export function BuildElementNeverAppearedInTimeErrorMessage(elementSelector: string [], wait: number): string {
    return `Element '${elementSelector}' didn't appear in '${wait}' seconds.`;
}

export function BuildElementNeverDisappearedInTimeErrorMessage(elementSelector: string[], wait: number): string {
    return `Element '${elementSelector}' didn't disappear in '${wait}' seconds.`;
}

export function BuildDateString(dateTime: Date = new Date()): string {
    return dateTime.getFullYear().toString() + "-" + (dateTime.getMonth() + 1).toString() + "-" + dateTime.getDate().toString();
}

export function BuildTimeString(dateTime: Date = new Date()): string {
    return dateTime.getHours().toString() + "-" + dateTime.getMinutes().toString() + "-" + dateTime.getSeconds().toString() + "-" + dateTime.getMilliseconds().toString();
}

export function BuildTestTimeString(dateTime: Date = new Date()): string {
    return BuildDateString(dateTime) + "_" + BuildTimeString(dateTime);
}

export function BuildExecutionNameWithOldPrefix(executionName: string): string {
    return `old-${executionName}`;
}

export function BuildKeyValueParameter(key: string, value: string, addDashes: boolean = false): string {
    if (addDashes) {
        return `--${key}="${value}"`;
    } else {
        return `${key}="${value}"`;
    }
}

export function BuildKeywordParameter(keyword: string, addDashes: boolean = false): string {
    if (addDashes) {
        return `--${keyword}`;
    } else {
        return `${keyword}`;
    }
}

export function BuildNewIterationConsoleHeader(nextIterationNumber: number): string {
    return `${newLineString}${newLineString}PARÂMETRO DE LOOP DETECTADO: INICIANDO LOOP #${nextIterationNumber} - PARA CANCELAR O PRÓXIMO LOOP, APERTE 'Q'${newLineString}${newLineString}`;
}

export function BuildScenarioErrorConsoleHeader(errorObject: any): string {
    return `${newLineString}${newLineString}${errorObject}${newLineString}`;
}

export function BuildLoopLimitUnderThresholdError(receivedLoopLimit: number): string {
    return `O parâmetro de limite de loops deve ser maior do que ${loopLimitMinimumThreshold}, recebido: ${receivedLoopLimit}. Lembre-se de que você pode omitir este parâmetro para que os testes rodem infinitamente!`;
}

export function BuildLoopTimeoutUnderThresholdError(receivedLoopTimeout: number): string {
    return `O parâmetro de timeout para os loops deve ser maior do que ${loopTimeoutMinimumThreshold}, recebido: ${receivedLoopTimeout}. Lembre-se de que você pode omitir este parâmetro para que os testes rodem infinitamente!`;
}

export function BuildNegativeMatchForStringsErrorMessage(value1: string, value2: string): string {
    return `ERROR: '${value1}' is not equal to '${value2}'.`;
}

export function BuildPositiveMatchForStringsErrorMessage(value1: string, value2: string): string {
    return `ERROR: '${value1}' is not different from '${value2}'.`;
}

export function BuildNegativePartialMatchForStringsErrorMessage(partialString: string, referenceString: string): string {
    return `ERROR: '${referenceString}' does not contain '${partialString}'.`;
}

export function BuildNumbersNotWithinMarginErrorMessage(firstValue: number, secondValue: number, margin: number): string {
    return `ERROR: ${firstValue} is not within ${margin} of ${secondValue}.`;
}

export function BuildNumbersWithinMarginErrorMessage(firstValue: number, secondValue: number, margin: number): string {
    return `ERROR: ${firstValue} is within ${margin} of ${secondValue}.`;
}

export function BuildNumberSmallerThanMarginErrorMessage(firstValue: number, secondValue: number, margin: number): string {
    return `ERROR: ${firstValue} is not bigger than ${secondValue + margin}.`
}