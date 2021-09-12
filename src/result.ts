import { State } from "./state";

export class Result<T> {
    constructor(
        public readonly state: State,
        public readonly error: Error | null,
        public readonly value: T | null,
    ) { }

    public resolve(): T {
        if(this.error) {
            throw this.error;
        }

        return this.value as T;
    }

    static fail(state: State, message: string): Result<null> {
        return new Result(state, new Error(message), null);
    }

    static ok<T>(state: State, value: T): Result<T> {
        return new Result(state, null, value);
    }
}
