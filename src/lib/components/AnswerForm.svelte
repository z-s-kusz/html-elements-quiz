<script lang="ts">
    interface Props {
        processAnswer: Function;
        toggleCheckbox: Function;
        children: any;
    }

    let { processAnswer, children, toggleCheckbox }: Props = $props();
    let answer = $state('');

    // TODO find an easier better way to handle types here
    const onElementInput = (event: any) => {
        answer = (event.currentTarget as HTMLInputElement).value;
    };

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
            <input id="answer" value={answer} oninput={onElementInput} autocomplete="off" />
            <button type="submit">Submit</button>
            <br />

            <label for="show-categories" class="hover-pointer">Show Categories</label>
            <input id="show-categories" type="checkbox" value="false" oninput={() => toggleCheckbox('categories')} />
            <br />

            <label for="show-answers" class="hover-pointer">Show Answers</label>
            <input id="show-answers" type="checkbox" value="false" oninput={() => toggleCheckbox('answers')} />
        </div>
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
