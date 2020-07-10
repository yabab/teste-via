"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.oneSecondInMilliseconds = 1000;
exports.parseIntDecimalRadix = 10;
exports.defaultInteractionWait = 10 * exports.oneSecondInMilliseconds;
exports.pollFrequencyDivisionFactor = 0.25;
exports.defaultPollFrequency = exports.oneSecondInMilliseconds * exports.pollFrequencyDivisionFactor;
exports.defaultMaxInterations = exports.oneSecondInMilliseconds / exports.defaultPollFrequency * 30;
exports.loopLimitMinimumThreshold = 1;
exports.loopTimeoutMinimumThreshold = 10;
exports.webElementValueAttributeName = "value";
exports.tagsParameterName = "tags";
exports.mobileEnvironmentVariablesScanOffset = 2;
exports.childProcessStdIoOption = ["ignore", "inherit", "inherit"];
exports.webChromeExecutionName = "chrome";
exports.webFirefoxExecutionName = "firefox";
exports.androidAppExecutionName = "android-app";
exports.androidWebExecutionName = "android-web";
exports.emptyString = "";
exports.periodDotString = ".";
exports.zeroString = "0";
exports.newLineString = "\n";
exports.hashString = "#";
exports.dollarString = "$";
exports.equalsString = "=";
exports.evaluationSuccessfulString = "success";
exports.evaluationFailedString = "failure";
exports.unknownString = "unknown";
exports.doubleDashString = "--";
exports.existenceStepsAppearanceString = "apareça";
exports.existenceStepsDisappearanceString = "desapareça";
exports.existenceStepsExistsString = "exista";
exports.existenceStepsNonExistsString = "não exista";
exports.imeiVariableName = "imei";
exports.clientCodeVariableName = "codigo_cliente";
exports.environmentVariableName = "environment";
exports.dbPasswordVariableName = "passDB";
exports.dbUserVariableName = "userDB";
exports.allImagesVariableName = "allImages";
exports.loopFlagVariableName = "loopingTest";
exports.loopIterationVariableName = "loopIteration";
exports.loopTimeoutVariableName = "loopTimeout";
exports.loopLimitVariableName = "loopLimit";
exports.databaseJsonUser = "db2_user";
exports.databaseQueryTableCteTelCel = "CTE_TEL_CEL";
exports.reportFilesFolder = "/reports";
exports.reportJsonSubFolder = "/json";
exports.screenshotEncodingString = "image/png";
exports.standardInputEncodingOption = "utf8";
exports.standardInputDataEventName = "data";
exports.asciiStringCtrlC = "\u0003";
exports.childProcessExitEventName = "exit";
exports.childProcessLoopExitKey = "q";
function BuildDbConnectionString(dbHostName, dbPortNumber, dbDriverName, dataBaseName, databaseUser, databaseUserPassword) {
    return `HOSTNAME=${dbHostName};port=${dbPortNumber};DRIVER=${dbDriverName};DATABASE=${dataBaseName};UID=${databaseUser};PWD=${databaseUserPassword}`;
}
exports.BuildDbConnectionString = BuildDbConnectionString;
function BuildJsonSelectQuery(column, schema, table, conditions) {
    return `select ${column} FROM ${schema}${table} where ${conditions}`;
}
exports.BuildJsonSelectQuery = BuildJsonSelectQuery;
function BuildTestCaseConsoleHeader(cucumberPickle) {
    return `${exports.newLineString}${exports.newLineString}Funcionalidade: ${cucumberPickle.tags[0].name}${exports.newLineString}Cenário: ${cucumberPickle.name}`;
}
exports.BuildTestCaseConsoleHeader = BuildTestCaseConsoleHeader;
function BuildTestSignatureName(platformString, environmentString, loopingTest = false, loopIteration = 0) {
    if (environmentString === exports.emptyString || environmentString === undefined || environmentString === null) {
        environmentString = exports.unknownString;
    }
    if (loopingTest !== undefined && loopingTest) {
        if (loopIteration === undefined) {
            loopIteration = 0;
        }
        return `loop${loopIteration}_${environmentString}_${platformString}`;
    }
    else {
        return `${environmentString}_${platformString}`;
    }
}
exports.BuildTestSignatureName = BuildTestSignatureName;
function BuildMemoryString(text) {
    return `${exports.hashString}${text}${exports.dollarString}`;
}
exports.BuildMemoryString = BuildMemoryString;
function BuildQuantumSuperPositionErrorMessage(elementSelector) {
    return `Major conundrum: how was this element not absent AND not present? State superposition at its best for element '${elementSelector}'.`;
}
exports.BuildQuantumSuperPositionErrorMessage = BuildQuantumSuperPositionErrorMessage;
function BuildInconsistentAppeareanceErrorMessage(elementSelector) {
    return `Element '${elementSelector}' didn't appear consistently in the alloted time.`;
}
exports.BuildInconsistentAppeareanceErrorMessage = BuildInconsistentAppeareanceErrorMessage;
function BuildInconsistentDisappeareanceErrorMessage(elementSelector) {
    return `Element '${elementSelector}' didn't disappear consistently in the alloted time.`;
}
exports.BuildInconsistentDisappeareanceErrorMessage = BuildInconsistentDisappeareanceErrorMessage;
function BuildElementNeverAppearedInTimeErrorMessage(elementSelector, wait) {
    return `Element '${elementSelector}' didn't appear in '${wait}' seconds.`;
}
exports.BuildElementNeverAppearedInTimeErrorMessage = BuildElementNeverAppearedInTimeErrorMessage;
function BuildElementNeverDisappearedInTimeErrorMessage(elementSelector, wait) {
    return `Element '${elementSelector}' didn't disappear in '${wait}' seconds.`;
}
exports.BuildElementNeverDisappearedInTimeErrorMessage = BuildElementNeverDisappearedInTimeErrorMessage;
function BuildDateString(dateTime = new Date()) {
    return dateTime.getFullYear().toString() + "-" + (dateTime.getMonth() + 1).toString() + "-" + dateTime.getDate().toString();
}
exports.BuildDateString = BuildDateString;
function BuildTimeString(dateTime = new Date()) {
    return dateTime.getHours().toString() + "-" + dateTime.getMinutes().toString() + "-" + dateTime.getSeconds().toString() + "-" + dateTime.getMilliseconds().toString();
}
exports.BuildTimeString = BuildTimeString;
function BuildTestTimeString(dateTime = new Date()) {
    return BuildDateString(dateTime) + "_" + BuildTimeString(dateTime);
}
exports.BuildTestTimeString = BuildTestTimeString;
function BuildExecutionNameWithOldPrefix(executionName) {
    return `old-${executionName}`;
}
exports.BuildExecutionNameWithOldPrefix = BuildExecutionNameWithOldPrefix;
function BuildKeyValueParameter(key, value, addDashes = false) {
    if (addDashes) {
        return `--${key}="${value}"`;
    }
    else {
        return `${key}="${value}"`;
    }
}
exports.BuildKeyValueParameter = BuildKeyValueParameter;
function BuildKeywordParameter(keyword, addDashes = false) {
    if (addDashes) {
        return `--${keyword}`;
    }
    else {
        return `${keyword}`;
    }
}
exports.BuildKeywordParameter = BuildKeywordParameter;
function BuildNewIterationConsoleHeader(nextIterationNumber) {
    return `${exports.newLineString}${exports.newLineString}PARÂMETRO DE LOOP DETECTADO: INICIANDO LOOP #${nextIterationNumber} - PARA CANCELAR O PRÓXIMO LOOP, APERTE 'Q'${exports.newLineString}${exports.newLineString}`;
}
exports.BuildNewIterationConsoleHeader = BuildNewIterationConsoleHeader;
function BuildScenarioErrorConsoleHeader(errorObject) {
    return `${exports.newLineString}${exports.newLineString}${errorObject}${exports.newLineString}`;
}
exports.BuildScenarioErrorConsoleHeader = BuildScenarioErrorConsoleHeader;
function BuildLoopLimitUnderThresholdError(receivedLoopLimit) {
    return `O parâmetro de limite de loops deve ser maior do que ${exports.loopLimitMinimumThreshold}, recebido: ${receivedLoopLimit}. Lembre-se de que você pode omitir este parâmetro para que os testes rodem infinitamente!`;
}
exports.BuildLoopLimitUnderThresholdError = BuildLoopLimitUnderThresholdError;
function BuildLoopTimeoutUnderThresholdError(receivedLoopTimeout) {
    return `O parâmetro de timeout para os loops deve ser maior do que ${exports.loopTimeoutMinimumThreshold}, recebido: ${receivedLoopTimeout}. Lembre-se de que você pode omitir este parâmetro para que os testes rodem infinitamente!`;
}
exports.BuildLoopTimeoutUnderThresholdError = BuildLoopTimeoutUnderThresholdError;
function BuildNegativeMatchForStringsErrorMessage(value1, value2) {
    return `ERROR: '${value1}' is not equal to '${value2}'.`;
}
exports.BuildNegativeMatchForStringsErrorMessage = BuildNegativeMatchForStringsErrorMessage;
function BuildPositiveMatchForStringsErrorMessage(value1, value2) {
    return `ERROR: '${value1}' is not different from '${value2}'.`;
}
exports.BuildPositiveMatchForStringsErrorMessage = BuildPositiveMatchForStringsErrorMessage;
function BuildNegativePartialMatchForStringsErrorMessage(partialString, referenceString) {
    return `ERROR: '${referenceString}' does not contain '${partialString}'.`;
}
exports.BuildNegativePartialMatchForStringsErrorMessage = BuildNegativePartialMatchForStringsErrorMessage;
function BuildNumbersNotWithinMarginErrorMessage(firstValue, secondValue, margin) {
    return `ERROR: ${firstValue} is not within ${margin} of ${secondValue}.`;
}
exports.BuildNumbersNotWithinMarginErrorMessage = BuildNumbersNotWithinMarginErrorMessage;
function BuildNumbersWithinMarginErrorMessage(firstValue, secondValue, margin) {
    return `ERROR: ${firstValue} is within ${margin} of ${secondValue}.`;
}
exports.BuildNumbersWithinMarginErrorMessage = BuildNumbersWithinMarginErrorMessage;
function BuildNumberSmallerThanMarginErrorMessage(firstValue, secondValue, margin) {
    return `ERROR: ${firstValue} is not bigger than ${secondValue + margin}.`;
}
exports.BuildNumberSmallerThanMarginErrorMessage = BuildNumberSmallerThanMarginErrorMessage;
//# sourceMappingURL=system_controlPanel.js.map