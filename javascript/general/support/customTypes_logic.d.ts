export declare class SimpleStringMap {
    [key: string]: string;
}
export declare class GenericStringMap {
    [key: string]: any;
}
export declare class Coordinate2D {
    x: number;
    y: number;
    constructor(xValue?: number, yValue?: number);
}
export declare class ScreenMotionCoordinates {
    static UP: ScreenMotionCoordinates;
    static DOWN: ScreenMotionCoordinates;
    static RIGHT: ScreenMotionCoordinates;
    static LEFT: ScreenMotionCoordinates;
    start: Coordinate2D;
    end: Coordinate2D;
    constructor(startCoordinate?: Coordinate2D, endCoordinate?: Coordinate2D);
}
