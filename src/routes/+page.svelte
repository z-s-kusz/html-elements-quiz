<script lang="ts">
	import AboutDialog from "$lib/components/AboutDialog.svelte";
    import AnswerForm from "$lib/components/AnswerForm.svelte";
	import CategoryList from "$lib/components/CategoryList.svelte";
	import type Element from "../models/Element.js";
	import type ElementGroup from "../models/ElementGroup.js";

    let groupedElements = $state<ElementGroup[]>([]);
    let showAllCategories = $state(false);
    let showAllAnswers = $state(false);
    let { data } = $props();
    let totalCount = $derived.by(() => {
        let count = 0;
        groupedElements.forEach((group) => {
            group.elements.forEach((element) => {
                if (element.revealed) count++;
            });
        });
        return `${count}/${data.elements?.length || 0}`;
    });

    const mapGroups = (allElements: Element[]): ElementGroup[] => {
        return allElements.reduce((acc, nextElement) => {
            const matchingElementGroup = acc.find((group) => {
                return group.name === nextElement.category;
            });
            if (matchingElementGroup) {
                matchingElementGroup.elements.push(nextElement);
            } else {
                let sortPosition = nextElement.sortPosition;
                if (!sortPosition) {
                    console.warn(`Category "${nextElement.category}" has no sort position - please update the DB.`);
                    sortPosition = 99; // send to end of list if no position given
                }
                acc.push({
                    name: nextElement.category,
                    elements: [nextElement],
                    sortPosition,
                });
            }
            return acc;
        }, [] as ElementGroup[]);
    };

    const sortGroups = (groups: ElementGroup[]): ElementGroup[] => {
        return groups.toSorted((a, b) => a.sortPosition - b.sortPosition);
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

    const toggleCheckbox = (name: string) => {
        if (name === 'categories') showAllCategories = !showAllCategories;
        if (name === 'answers') showAllAnswers = !showAllAnswers;
    };

    // js below this line should run once - like angular's ngOnInit
    // not sure if there is a more clear svelte-like way to do that
    groupedElements = sortGroups(mapGroups(data.elements));
</script>

<main class="grid">
    <AnswerForm processAnswer={processAnswer} toggleCheckbox={toggleCheckbox}>
        <!-- Doesn't make the most sense to pass this here but I got to learn about svelte 5 slots -->
        <header>
            <h1><u>HTML Elements Quiz</u> {totalCount}</h1>
            <AboutDialog count={data.elements.length} />
        </header>
    </AnswerForm>
    {#each groupedElements as elementGroup}
        <CategoryList elementGroup={elementGroup} showAllAnswers={showAllAnswers} showAllCategories={showAllCategories} />
    {/each}
</main>

<style>
    header {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    .grid {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        grid-auto-rows: auto;
        background: rgb(0,0,0);
        background: radial-gradient(circle, rgba(0,0,0,1) 0%, rgba(64,64,64,1) 80%);
        padding: 0.25rem;
    }

    @media (max-width: 750px) {
        .grid {
            grid-template-columns: 1fr;
        }
    }

    h1 {
        margin: 1rem 0;
    }
</style>
