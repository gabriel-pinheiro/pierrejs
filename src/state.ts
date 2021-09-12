export class State {
    constructor(
        public readonly code: string,
        public readonly index: number,
    ) { }

    update(index: number): State {
        return new State(this.code, index);
    }

    static of(code: string): State {
        return new State(code, 0);
    }
}
