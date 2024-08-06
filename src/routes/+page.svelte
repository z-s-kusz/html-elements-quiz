<script lang="ts">
	import AnswerForm from "$lib/components/AnswerForm.svelte";
	import CategoryList from "$lib/components/CategoryList.svelte";
	import type Element from "../models/Element.js";
	import type ElementGroup from "../models/ElementGroup.js";

    let groupedElements = $state<ElementGroup[]>([]);
    let { data } = $props();

    const mapGroups = (allElements: Element[]): ElementGroup[] => {
        return allElements.reduce((acc, nextElement) => {
            const matchingElementGroup = acc.find((group) => {
                return group.name === nextElement.category;
            });
            if (matchingElementGroup) {
                matchingElementGroup.elements.push(nextElement);
            } else {
                acc.push({
                    name: nextElement.category,
                    elements: [nextElement],
                });
            }
            return acc;
        }, [] as ElementGroup[]);
    };

    groupedElements = mapGroups(data.elements);
</script>

<header>
    <h1>HTML Elements Quiz</h1>
</header>
<main class="grid">
    <AnswerForm />
    {#each groupedElements as elementGroup}
        <CategoryList elementGroup={elementGroup} />
    {/each}
</main>

<style>
.grid {
    display: grid;
}
</style>
