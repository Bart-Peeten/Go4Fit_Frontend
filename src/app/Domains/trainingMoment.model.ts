export class TrainingMoment {
    private _trainingType: String;
    private _trainingsTime: String;
    private _numberOfParticipants: Number;


    constructor(trainingType: String, trainingsTime: String, numberOfParticipants: Number) {
        this._trainingType = trainingType;
        this._trainingsTime = trainingsTime;
        this._numberOfParticipants = numberOfParticipants;
    }

    get trainingType(): String {
        return this._trainingType;
    }

    get trainingsTime(): String {
        return this._trainingsTime;
    }

    get numberOfParticipants(): Number {
        return this._numberOfParticipants;
    }
}
