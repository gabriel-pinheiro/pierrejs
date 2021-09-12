import { Result } from "./result";
import { State } from "./state";

export class Parser<T> {
    constructor(
        public readonly name: string,
        public readonly applyTo: (state: State) => Result<T>,
    ) { }

    public parse(code: string): T {
        const initialState = State.of(code)
        return this.applyTo(initialState).resolve();
    }
}
