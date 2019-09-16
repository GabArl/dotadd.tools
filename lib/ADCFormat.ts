import { ParseResults, ConverterOptions } from './Converter'

export enum ContainerType {
    XML,
    JSON
}

/* class decorator */
export function _static_implements<T>() {
    return <U extends T>(constructor: U) => {constructor};
}

interface ADCFormatBase {
}

/**
 * Interface for a parsable Ambisonic Decoder Description Format
 */
export interface ADCFormat {
    
    new():ADCFormatBase;

    /**
     * @returns {string} the name of the format
     */
    getName(): string;

    /**
     * @returns {string} a string describing the format
     */
    getDescription(): string;

    /**
     * 
     */
    container_type() : ContainerType;

    /**
     * test if an object can be interpreted by this format
     * @param obj object to test
     */
    test(obj: Object): Boolean;

    /**
     * parse the format
     * @param obj object to parse
     * @param filename filename of the parsed object
     * @param carry carried from the last iteration if the parser needs/accepts more than one file
     * @param options converter options
     */
    parse(obj: Object, filename: string, carry: ParseResults, options: ConverterOptions): void;

};