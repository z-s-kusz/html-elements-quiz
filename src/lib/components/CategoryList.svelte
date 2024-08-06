<script lang="ts">
    import type ElementGroup from "../../models/ElementGroup.js";
    interface Props {
        elementGroup: ElementGroup
    }

    let { elementGroup }: Props = $props();
</script>

<section class="category-list">
    <h1>{elementGroup.name}</h1>
    <ol>
        {#each elementGroup.elements as element }
            <li>{element.name}</li>
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
