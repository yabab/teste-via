
import * as controlPanel from "./generalUtils_controlPanel";
import * as fileSystem from "fs";
import * as path from "path";
import * as sysControlPanel from "./system_controlPanel";

import { GenericStringMap } from "./customTypes_logic";
import { isNullOrUndefined } from "util";

const globalMemory = new GenericStringMap();
let environmentVars: GenericStringMap;

export function sortEnvVariables(
    processEnvironment: string[],
    startingLocation?: number
): void {
    let idxStart = 0;

    if (startingLocation !== undefined) {
        idxStart = startingLocation;
    }

    environmentVars = new GenericStringMap();

    for (
        let idx = idxStart;
        idx <= processEnvironment.length - 1;
        idx++
    ) {
        if (processEnvironment[idx].includes(sysControlPanel.equalsString)) {
            const valueArray = processEnvironment[idx].split(sysControlPanel.equalsString);
            let variableKey = valueArray[0];

            if (variableKey.includes(sysControlPanel.doubleDashString)) {
                variableKey = variableKey.replace(
                    controlPanel.doubleDashAtStartRegex,
                    sysControlPanel.emptyString
                );
            }

            if (variableKey.includes(sysControlPanel.tagsParameterName)) {
                variableKey = sysControlPanel.tagsParameterName;
            }

            const variableValue = valueArray[1];
            environmentVars[variableKey] = variableValue;
        } else {
            let parameter = processEnvironment[idx];

            if (parameter.includes(sysControlPanel.doubleDashString)) {
                parameter = parameter.replace(
                    controlPanel.doubleDashAtStartRegex,
                    sysControlPanel.emptyString
                );
            }

            environmentVars[parameter] = true;
        }
    }

    loadJsons(environmentVars[controlPanel.dataFolderString]);
}

export function getEnvVar(key: string): any {
    if (Object.keys(environmentVars).includes(key)) {
        return environmentVars[key];
    } else {
        return undefined;
    }
}

export function loadJsons(customTestFolder: string): void {
    let testFolder: string;

    if (customTestFolder === undefined) {
        testFolder = `./${controlPanel.defaultTestFolder}/`;
    } else {
        testFolder = `./${customTestFolder}/`;
    }

    const dataFileList = fileSystem.readFileSync(
        path.join(
            testFolder,
            controlPanel.dataFilePath
        )
    );

    const dataFileArray = JSON.parse(dataFileList.toString());

    for (const dataFile in dataFileArray) {
        if (dataFile !== undefined) {
            const jsonObject = fileSystem.readFileSync(
                path.join(
                    testFolder,
                    dataFileArray[dataFile].filePath
                )
            );

            const fileNameNoExtension = dataFileArray[dataFile].fileName;

            globalMemory[fileNameNoExtension] = JSON.parse(jsonObject.toString());
        }
    }
}

// Fisher-Yates array shuffling
export function shuffle(array: any[]): any[] {
    let m = array.length;
    let t;
    let i;

    // While there remain elements to shuffle…
    while (m) {
        // Pick a remaining element…
        i = Math.floor(Math.random() * m--);

        // And swap it with the current element.
        t = array[m];
        array[m] = array[i];
        array[i] = t;
    }

    return array;
}

export function getFromMemory(input: string): string {
    const referenceRegExp = controlPanel.memoryReferenceRegex;
    const match = input.match(referenceRegExp);

    if (match === null) {
        return input;
    } else if (match !== null) {
        match.forEach(
            function(
                value: string,
                index: number,
                originalArray: string[]
            ): void {
                const symbol = value.substring(
                    value.indexOf(sysControlPanel.hashString) + 1,
                    value.indexOf(sysControlPanel.dollarString)
                );

                input = input.replace(
                    value,
                    replaceSimpleQuotesIfPresent(dig(symbol))
                );
            }
        );

        return getFromMemory(input);
    } else {
        throw new Error(
            controlPanel.BuildUnknownMemoryFetchErrorMessage(input)
        );
    }
}

export function dig(stringIndex: string): any {
    let terms = new Array<string>();
    let translatedTerms = new Array<string>();

    terms = addStringTerm(
        terms,
        stringIndex,
        sysControlPanel.periodDotString
    );

    terms.forEach(
        function(
            entry: string,
            entryIndex: number,
            entryArray: string[]
        ): void {
            translatedTerms.push(entry);
        },
        this
    );

    let copy = globalMemory;
    let index = 0;

    while (index < translatedTerms.length) {
        copy = copy[translatedTerms[index]];
        index += 1;
    }

    return copy;
}

function addStringTerm(
    array: string[],
    stringToAdd: string,
    separator: string
): string[] {
    if (stringToAdd.includes(separator)) {
        array = stringToAdd.split(separator);
    } else {
        array.push(stringToAdd);
    }

    return array;
}

export function insert(
    index: string,
    value: any
): void {
    globalMemory[index] = value;
}

export function getFullMemory(): GenericStringMap {
    return globalMemory;
}

export function alterEntry(
    array: any[],
    elementToSearch: any,
    substituteElement: any,
    pushIfNotFound: boolean = false
): any[] {
    const loopIterationIndex = array.indexOf(elementToSearch);

    if (loopIterationIndex >= 0) {
        array.splice(
            loopIterationIndex,
            1,
            substituteElement
        )
    } else {
        if (pushIfNotFound) {
            array.push(substituteElement);
        }
    }

    return array;
}

export function replaceSimpleQuotesIfPresent(stringValue: string): string {
    const match = stringValue.match(controlPanel.simpleQuoteDetectionRegex);

    if (match === null) {
        return stringValue;
    } else {
        return stringValue.replace(controlPanel.simpleQuoteDetectionRegex, controlPanel.escapedDoubleQuotesString);
    }
}