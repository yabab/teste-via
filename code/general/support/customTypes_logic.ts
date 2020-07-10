import * as controlPanel from "./customTypes_controlPanel";

export class SimpleStringMap {
    [key: string]: string;
}

export class GenericStringMap {
    [key: string]: any;
}

export class Coordinate2D {
    public x: number;
    public y: number;

    constructor(
        xValue: number = 0,
        yValue: number = 0
    ) {
        this.x = xValue;
        this.y = yValue;
    }
}

export class ScreenMotionCoordinates {
    static UP = new ScreenMotionCoordinates(
        new Coordinate2D(
            controlPanel.midPointCoordinateValue,
            controlPanel.highCoordinateValue
        ),
        new Coordinate2D(
            controlPanel.midPointCoordinateValue,
            controlPanel.lowCoordinateValue
        )
    );

    static DOWN = new ScreenMotionCoordinates(
        new Coordinate2D(
            controlPanel.midPointCoordinateValue,
            controlPanel.lowCoordinateValue
        ),
        new Coordinate2D(
            controlPanel.midPointCoordinateValue,
            controlPanel.highCoordinateValue
        )
    );

    static RIGHT = new ScreenMotionCoordinates(
        new Coordinate2D(
            controlPanel.lowCoordinateValue,
            controlPanel.midPointCoordinateValue
        ),
        new Coordinate2D(
            controlPanel.highCoordinateValue,
            controlPanel.midPointCoordinateValue
        )
    );

    static LEFT = new ScreenMotionCoordinates(
        new Coordinate2D(
            controlPanel.highCoordinateValue,
            controlPanel.midPointCoordinateValue
        ),
        new Coordinate2D(
            controlPanel.lowCoordinateValue,
            controlPanel.midPointCoordinateValue
        )
    )

    public start: Coordinate2D;
    public end: Coordinate2D;

    constructor(
        startCoordinate: Coordinate2D = new Coordinate2D(),
        endCoordinate: Coordinate2D = new Coordinate2D()
    ) {
        this.start = startCoordinate;
        this.end = endCoordinate;
    }
}
