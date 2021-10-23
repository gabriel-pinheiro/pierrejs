import { Result } from "./result";
import { State } from "./state";


export type Location = {
    start: number;
    end: number;
};

export class Parser<T> {
    constructor(
        public readonly name: string,
        public readonly applyTo: (state: State) => Result<T>,
    ) { }

    public parse(code: string): T {
        const initialState = State.of(code)
        return this.applyTo(initialState).resolve();
    }

    public map<K>(fn: (value: T, loc: Location) => K): Parser<K> {
        return new Parser(this.name, state => {
            const result = this.applyTo(state);
            if(result.error) {
                return result as Result<any>;
            }

            return Result.ok(result.state, fn(result.value, {
                start: state.index,
                end: result.state.index,
            }));
        });
    }

    public pipe<K>(fn: (value: T) => Parser<K>): Parser<K> {
        return new Parser(this.name, state => {
            const result = this.applyTo(state);
            if(result.error) {
                return result as Result<any>;
            }

            return fn(result.value).applyTo(result.state);
        });
    }

    public withName(name: string): Parser<T> {
        return new Parser(name, this.applyTo);
    }
}
