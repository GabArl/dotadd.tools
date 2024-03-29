import { ContainerType } from "./ADCFormat";
import { ParseResults, ConverterOptions } from './Converter';
export default class AmbidecodeFormat {
    static getName(): string;
    static getDescription(): string;
    static container_type(): ContainerType;
    static test(obj: Object): Boolean;
    static parse(obj: Object, filename: string, carry: ParseResults, opts: ConverterOptions): void;
}
