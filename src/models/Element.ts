export default interface Element {
    name: string;
    category: string;
    revealed: boolean;
    sortPosition?: number;
    urlOverride?: string
}
