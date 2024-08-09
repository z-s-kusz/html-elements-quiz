<script lang="ts">
    let { count }: { count: number } = $props();
    let dialogRef: HTMLDialogElement;
</script>

<button type="button" onclick={() => dialogRef.showModal()}>About</button>

<dialog bind:this={dialogRef}>
    <h1>About</h1>
    <p>Enter the HTML elements you can recall.</p>
    <p>Mozilla lists {count} valid, not deprecated elements!</p>
    <p>Category names are revealed when you enter at least 1 element in that category.</p>
    <p>For a hint click 'Show Categories.'</p>
    <p>When you have entered everything you can think of click 'Show Answers.'</p>
    <p>Click any element name to see the Mozilla page describing the element.</p>
    <p>Study up then refresh the page and try to get all {count}!</p>
    <div class="controls">
        <button type="button" onclick={() => dialogRef.close()}>Close</button>
    </div>
</dialog>

<style>
    dialog {
        background: rgb(232,161,75);
        background: linear-gradient(0deg, rgba(232,161,75,1) 0%, rgba(253,204,111,1) 100%);
    }
    .controls {
        display: flex;
        justify-content: end;
    }
</style>
