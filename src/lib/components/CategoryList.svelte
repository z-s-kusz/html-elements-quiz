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
    const baseURL = 'https://developer.mozilla.org/docs/Web/HTML/Element/';
</script>

<section class="category-list">
    <div class="category-title">
        <p>{showCategoryName || showAllCategories ? elementGroup.name : '...'}</p>
        <p>{countDisplay}</p>
    </div>
    <ol>
        {#each elementGroup.elements as element }
            <li class={showAllAnswers && !element.revealed ? 'red' : ''}>
                <a href={element.urlOverride || baseURL + element.name} target="_blank">
                    {element.revealed || showAllAnswers ? element.name : ''}
                </a>
            </li>
        {/each}
    </ol>
</section>

<style>
    .category-list {
        background: rgb(142,233,187);
        background: linear-gradient(139deg, rgba(142,233,187,1) 0%, rgba(145,247,203,1) 66%);
        padding: 0.75rem;
        margin: 0.25rem;
    }
    .category-title {
        display: flex;
        justify-content: space-between;
    }

    a {
        text-decoration: none;
        color: black;
    }
    a:visited {
        color: black;
    }
    .red a, .red a:visited {
        color: rgb(187, 38, 38);
    }

    @media (max-width: 750px) {
        ol {
            margin: 0;
        }
    }
</style>
