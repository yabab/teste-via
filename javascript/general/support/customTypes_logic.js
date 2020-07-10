"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const controlPanel = __importStar(require("./customTypes_controlPanel"));
class SimpleStringMap {
}
exports.SimpleStringMap = SimpleStringMap;
class GenericStringMap {
}
exports.GenericStringMap = GenericStringMap;
class Coordinate2D {
    constructor(xValue = 0, yValue = 0) {
        this.x = xValue;
        this.y = yValue;
    }
}
exports.Coordinate2D = Coordinate2D;
class ScreenMotionCoordinates {
    constructor(startCoordinate = new Coordinate2D(), endCoordinate = new Coordinate2D()) {
        this.start = startCoordinate;
        this.end = endCoordinate;
    }
}
ScreenMotionCoordinates.UP = new ScreenMotionCoordinates(new Coordinate2D(controlPanel.midPointCoordinateValue, controlPanel.highCoordinateValue), new Coordinate2D(controlPanel.midPointCoordinateValue, controlPanel.lowCoordinateValue));
ScreenMotionCoordinates.DOWN = new ScreenMotionCoordinates(new Coordinate2D(controlPanel.midPointCoordinateValue, controlPanel.lowCoordinateValue), new Coordinate2D(controlPanel.midPointCoordinateValue, controlPanel.highCoordinateValue));
ScreenMotionCoordinates.RIGHT = new ScreenMotionCoordinates(new Coordinate2D(controlPanel.lowCoordinateValue, controlPanel.midPointCoordinateValue), new Coordinate2D(controlPanel.highCoordinateValue, controlPanel.midPointCoordinateValue));
ScreenMotionCoordinates.LEFT = new ScreenMotionCoordinates(new Coordinate2D(controlPanel.highCoordinateValue, controlPanel.midPointCoordinateValue), new Coordinate2D(controlPanel.lowCoordinateValue, controlPanel.midPointCoordinateValue));
exports.ScreenMotionCoordinates = ScreenMotionCoordinates;
//# sourceMappingURL=customTypes_logic.js.map