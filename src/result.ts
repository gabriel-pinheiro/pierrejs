import { State } from "./state";

export class Result<T> {
    constructor(
        public readonly state: State,
        public readonly error: string | null,
        public readonly value: T | null,
    ) { }

    static fail(state: State, message: string): Result<null> {
        return new Result(state, message, null);
    }

    static ok<T>(state: State, value: T): Result<T> {
        return new Result(state, null, value);
    }

    public resolve(): T {
        if(this.error) {
            throw this.buildError();
        }

        return this.value as T;
    }

    private buildError(): Error {
        const [line, column] = this.getLineAndColumn();
        return new Error(`Error at line ${line}, column ${column}: ${this.error}`);
    }

    // Returns line and column from position and text
    private getLineAndColumn(): [line: number, column: number] {
        let line = 1;
        let column = 1;

        for(let i = 0; i < this.state.index; i++) {
            if(this.state.code[i] === "\n") {
                line++;
                column = 1;
            } else {
                column++;
            }
        }

        return [line, column];
    }

}
