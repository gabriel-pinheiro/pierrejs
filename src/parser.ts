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

    public map<K>(fn: (value: T) => K): Parser<K> {
        return new Parser(this.name, state => {
            const result = this.applyTo(state);
            if(result.error) {
                return result as Result<any>;
            }

            return Result.ok(result.state, fn(result.value));
        });
    }

    public withName(name: string): Parser<T> {
        return new Parser(name, this.applyTo);
    }
}
