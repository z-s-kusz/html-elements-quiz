<script lang="ts">
    let { count }: { count: number } = $props();
    let dialogRef: HTMLDialogElement;
</script>

<button type="button" onclick={() => dialogRef.showModal()}>About</button>

<dialog bind:this={dialogRef}>
    <h1>About</h1>
    <p>
        <b>Enter the HTML elements you can recall. Mozilla lists {count}<sup>*</sup> elements!</b>
    </p>
    <p>Category names are revealed when you enter at least one element in that category.</p>
    <p><b>'Show Categories'</b> reveals all category names<sup>**</sup>. Useful as a hint if you can't get any in a given category.</p>
    <p>When you've entered everything you can think of, click <b>'Show Answers.'</b></p>
    <p>
        <b>Click any element name</b> to see the Mozilla page describing the element.
    </p>
    <p>Study up then refresh the page and try to get all {count}!</p>

    <hr />

    <p>
        <!-- hardcoding + 2 since this is hopefully not a common issue with mozillas docs :) -->
        <sup>*</sup>: Mozilla actually lists <i>{count + 2}</i> on their
        <a href="https://developer.mozilla.org/en-US/docs/Web/HTML/Element" target="_blank">
            reference page
        </a>
        as of Sept. 2024 but two aren't available by default in any browser so I removed them.
    </p>
    <p>
        <sup>**</sup>: There's nothing 'official' about the categories,
        I just found them useful when trying to memorize the list.
        Categories were inspired by Mozilla's reference page but I condensed them and moved some items.
    </p>

    <div class="controls">
        <button type="button" onclick={() => dialogRef.close()}>Close</button>
    </div>
</dialog>

<style>
    dialog {
        background: rgb(232,161,75);
        background: linear-gradient(0deg, rgba(232,161,75,1) 0%, rgba(253,204,111,1) 100%);
        padding: 1.25rem;
        border: 0.5rem solid black;
    }
    p {
        max-width: 80ch;
    }
    hr {
        border-color: black;
    }
    .controls {
        display: flex;
        justify-content: end;
    }
</style>
