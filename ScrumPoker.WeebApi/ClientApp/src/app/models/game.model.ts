export class Game {
    id: string;
    name: string;
    votingSystem: number;
    owner: string;
    created: Date;
    modified: Date;
}

export class CreateGame {
    name: string;
    votingSystem: number;
    owner: string;
}

export enum VotingSystemTypes {
    Fibonacci = 0,
    TShirt = 1
}

export class OwnerSettingsType {
    key: string;
    value: any;
}
