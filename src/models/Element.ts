export default interface Element {
    name: string;
    description: string;
    category: string;
    revealed: boolean;
    class?: string;
    sortPosition?: number | null;
}
