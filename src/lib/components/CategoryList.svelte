<script lang="ts">
    import type ElementGroup from "../../models/ElementGroup.js";
    interface Props {
        elementGroup: ElementGroup
    }

    let { elementGroup }: Props = $props();
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
        return `${count} / ${elementGroup.elements.length}`;
    })
</script>

<section class="category-list">
    <h1>{showCategoryName ? elementGroup.name : '...'} {countDisplay}</h1>
    <ol>
        {#each elementGroup.elements as element }
            <li>{element.revealed ? element.name : ''}</li>
        {/each}
    </ol>
</section>

<style>
.category-list {
    background-color:rgb(172, 255, 183);
    border: 12px solid black;
    padding: 20px;
}
</style>
