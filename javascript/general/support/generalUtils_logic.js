"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const controlPanel = __importStar(require("./generalUtils_controlPanel"));
const fileSystem = __importStar(require("fs"));
const path = __importStar(require("path"));
const sysControlPanel = __importStar(require("./system_controlPanel"));
const customTypes_logic_1 = require("./customTypes_logic");
const globalMemory = new customTypes_logic_1.GenericStringMap();
let environmentVars;
function sortEnvVariables(processEnvironment, startingLocation) {
    let idxStart = 0;
    if (startingLocation !== undefined) {
        idxStart = startingLocation;
    }
    environmentVars = new customTypes_logic_1.GenericStringMap();
    for (let idx = idxStart; idx <= processEnvironment.length - 1; idx++) {
        if (processEnvironment[idx].includes(sysControlPanel.equalsString)) {
            const valueArray = processEnvironment[idx].split(sysControlPanel.equalsString);
            let variableKey = valueArray[0];
            if (variableKey.includes(sysControlPanel.doubleDashString)) {
                variableKey = variableKey.replace(controlPanel.doubleDashAtStartRegex, sysControlPanel.emptyString);
            }
            if (variableKey.includes(sysControlPanel.tagsParameterName)) {
                variableKey = sysControlPanel.tagsParameterName;
            }
            const variableValue = valueArray[1];
            environmentVars[variableKey] = variableValue;
        }
        else {
            let parameter = processEnvironment[idx];
            if (parameter.includes(sysControlPanel.doubleDashString)) {
                parameter = parameter.replace(controlPanel.doubleDashAtStartRegex, sysControlPanel.emptyString);
            }
            environmentVars[parameter] = true;
        }
    }
    loadJsons(environmentVars[controlPanel.dataFolderString]);
}
exports.sortEnvVariables = sortEnvVariables;
function getEnvVar(key) {
    if (Object.keys(environmentVars).includes(key)) {
        return environmentVars[key];
    }
    else {
        return undefined;
    }
}
exports.getEnvVar = getEnvVar;
function loadJsons(customTestFolder) {
    let testFolder;
    if (customTestFolder === undefined) {
        testFolder = `./${controlPanel.defaultTestFolder}/`;
    }
    else {
        testFolder = `./${customTestFolder}/`;
    }
    const dataFileList = fileSystem.readFileSync(path.join(testFolder, controlPanel.dataFilePath));
    const dataFileArray = JSON.parse(dataFileList.toString());
    for (const dataFile in dataFileArray) {
        if (dataFile !== undefined) {
            const jsonObject = fileSystem.readFileSync(path.join(testFolder, dataFileArray[dataFile].filePath));
            const fileNameNoExtension = dataFileArray[dataFile].fileName;
            globalMemory[fileNameNoExtension] = JSON.parse(jsonObject.toString());
        }
    }
}
exports.loadJsons = loadJsons;
function shuffle(array) {
    let m = array.length;
    let t;
    let i;
    while (m) {
        i = Math.floor(Math.random() * m--);
        t = array[m];
        array[m] = array[i];
        array[i] = t;
    }
    return array;
}
exports.shuffle = shuffle;
function getFromMemory(input) {
    const referenceRegExp = controlPanel.memoryReferenceRegex;
    const match = input.match(referenceRegExp);
    if (match === null) {
        return input;
    }
    else if (match !== null) {
        match.forEach(function (value, index, originalArray) {
            const symbol = value.substring(value.indexOf(sysControlPanel.hashString) + 1, value.indexOf(sysControlPanel.dollarString));
            input = input.replace(value, replaceSimpleQuotesIfPresent(dig(symbol)));
        });
        return getFromMemory(input);
    }
    else {
        throw new Error(controlPanel.BuildUnknownMemoryFetchErrorMessage(input));
    }
}
exports.getFromMemory = getFromMemory;
function dig(stringIndex) {
    let terms = new Array();
    let translatedTerms = new Array();
    terms = addStringTerm(terms, stringIndex, sysControlPanel.periodDotString);
    terms.forEach(function (entry, entryIndex, entryArray) {
        translatedTerms.push(entry);
    }, this);
    let copy = globalMemory;
    let index = 0;
    while (index < translatedTerms.length) {
        copy = copy[translatedTerms[index]];
        index += 1;
    }
    return copy;
}
exports.dig = dig;
function addStringTerm(array, stringToAdd, separator) {
    if (stringToAdd.includes(separator)) {
        array = stringToAdd.split(separator);
    }
    else {
        array.push(stringToAdd);
    }
    return array;
}
function insert(index, value) {
    globalMemory[index] = value;
}
exports.insert = insert;
function getFullMemory() {
    return globalMemory;
}
exports.getFullMemory = getFullMemory;
function alterEntry(array, elementToSearch, substituteElement, pushIfNotFound = false) {
    const loopIterationIndex = array.indexOf(elementToSearch);
    if (loopIterationIndex >= 0) {
        array.splice(loopIterationIndex, 1, substituteElement);
    }
    else {
        if (pushIfNotFound) {
            array.push(substituteElement);
        }
    }
    return array;
}
exports.alterEntry = alterEntry;
function replaceSimpleQuotesIfPresent(stringValue) {
    const match = stringValue.match(controlPanel.simpleQuoteDetectionRegex);
    if (match === null) {
        return stringValue;
    }
    else {
        return stringValue.replace(controlPanel.simpleQuoteDetectionRegex, controlPanel.escapedDoubleQuotesString);
    }
}
exports.replaceSimpleQuotesIfPresent = replaceSimpleQuotesIfPresent;
//# sourceMappingURL=generalUtils_logic.js.map