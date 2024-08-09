<script lang="ts">
	import AboutDialog from "./AboutDialog.svelte";

    interface Props {
        processAnswer: Function;
        toggleCheckbox: Function;
        count: number;
        children: any;
    }

    let answer = $state('');
    let { processAnswer, children, toggleCheckbox, count }: Props = $props();

    const submit = (event: SubmitEvent) => {
        event.preventDefault();
        if (!answer) return;

        processAnswer(answer);
        answer = '';
    };
</script>

<form onsubmit={submit}>
    {@render children()}

    <div class="flex-between">
        <div>
            <label for="answer">Element</label>
            <input id="answer" value={answer} oninput={(e) => answer = e.target.value} autocomplete="off" />
            <button type="submit">Submit</button>
            <br />

            <label for="show-categories" class="hover-pointer">Show Categories</label>
            <input id="show-categories" type="checkbox" value="false" oninput={() => toggleCheckbox('categories')} />
            <br />

            <label for="show-answers" class="hover-pointer">Show Answers</label>
            <input id="show-answers" type="checkbox" value="false" oninput={() => toggleCheckbox('answers')} />
        </div>
        <AboutDialog count={count}/>
    </div>
</form>

<style>
    form {
        grid-column-start: 2;
        grid-row-start: 2;
        grid-column-end: 4;
        padding: 1.25rem;
        margin: 0.25rem;
        position: sticky;
        top: 0;
        background: rgb(139,235,234);
        background: linear-gradient(139deg, rgba(139,235,234,1) 0%, rgba(168,253,253,1) 50%);
    }

    @media (max-width: 750px) {
        form {
            grid-column-start: 1;
            grid-row-start: 1;
            grid-column-end: 2;
        }
    }

    .flex-between {
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
    }
</style>
