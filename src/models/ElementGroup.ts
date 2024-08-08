import type Element from "./Element";

export default interface ElementGroup {
    name: string;
    elements: Element[];
    sortPosition: number;
}
