<script lang="ts">
    import type ElementGroup from "../../models/ElementGroup.js";
    interface Props {
        elementGroup: ElementGroup;
        showAllCategories: boolean;
        showAllAnswers: boolean;
    }

    let { elementGroup, showAllCategories, showAllAnswers }: Props = $props();
    let showCategoryName = $derived.by(() => {
        let show = false;
        elementGroup.elements.forEach((element) => {
            if (element.revealed) show = true;
        });
        return show;
    });
    let countDisplay = $derived.by(() => {
        const count = elementGroup.elements.reduce((acc, nextElement) => {
            if (nextElement.revealed) acc++;
            return acc;
        }, 0);
        return `${count}/${elementGroup.elements.length}`;
    });
</script>

<section class="category-list">
    <div class="category-title">
        <p>{showCategoryName || showAllCategories ? elementGroup.name : '...'}</p>
        <p>{countDisplay}</p>
    </div>
    <ol>
        {#each elementGroup.elements as element }
            <li class={showAllAnswers && !element.revealed ? 'red' : ''}>
                {element.revealed || showAllAnswers ? element.name : ''}
            </li>
        {/each}
    </ol>
</section>

<style>
.category-list {
    background-color:rgb(195 247 203);
    padding: 0.75rem;
    margin: 0.25rem;
}
.category-title {
    display: flex;
    justify-content: space-between;
}
.red {
    color: rgb(187, 38, 38);
}
</style>
