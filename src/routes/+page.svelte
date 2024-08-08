<script lang="ts">
	import AnswerForm from "$lib/components/AnswerForm.svelte";
	import CategoryList from "$lib/components/CategoryList.svelte";
	import type Element from "../models/Element.js";
	import type ElementGroup from "../models/ElementGroup.js";

    let groupedElements = $state<ElementGroup[]>([]);
    let { data } = $props();
    let totalCount = $derived.by(() => {
        let count = 0;
        groupedElements.forEach((group) => {
            group.elements.forEach((element) => {
                if (element.revealed) count++;
            });
        });
        return `${count} / ${data.elements.length}`;
    });

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

    const processAnswer = (answer: string): void => {
        groupedElements.find((group) => {
            const matchingElement = group.elements.find((element) => {
                if (element.name === answer.toLowerCase()) {
                    element.revealed = true;
                    return true;
                }
                return false;
            });
            return matchingElement;
        });
    };

    // js below this line should run once - like angular's ngOnInit
    // not sure if there is a more clear svelte-like way to do that
    groupedElements = mapGroups(data.elements);
</script>

<header>
    <h1>HTML Elements Quiz: {totalCount}</h1>
</header>
<main class="grid">
    <AnswerForm processAnswer={processAnswer} />
    {#each groupedElements as elementGroup}
        <CategoryList elementGroup={elementGroup} />
    {/each}
</main>

<style>
    :root {
        font-family: "IBM Plex Mono", monospace;
        font-weight: 400;
        font-style: normal;
    }

    .grid {
        display: grid;
    }
</style>
