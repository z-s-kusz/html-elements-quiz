<script lang="ts">
    interface Props {
        processAnswer: Function;
        toggleCheckbox: Function;
        children: any;
    }

    let answer = $state('');
    let { processAnswer, children, toggleCheckbox }: Props = $props();

    const submit = (event: SubmitEvent) => {
        event.preventDefault();
        if (!answer) return;

        processAnswer(answer);
        answer = '';
    };
</script>

<form onsubmit={submit}>
    {@render children()}
    <!-- TODO fix type possibly null error -->
    <label for="answer">Element</label>
    <input name="answer" value={answer} oninput={(e) => answer = e.target.value} autocomplete="off" />
    <br />

    <label for="show-categories">Show Categories</label>
    <input name="show-categories" type="checkbox" value="false" oninput={() => toggleCheckbox('categories')} />
    <br />

    <label for="show-answers">Show Answers</label>
    <input name="show-answers" type="checkbox" value="false" oninput={() => toggleCheckbox('answers')} />
</form>

<style>
    form {
        grid-column-start: 2;
        grid-row-start: 2;
        grid-column-end: 4;
        padding: 2rem;
        position: sticky;
        top: 0;
        background-color: #fdfdfd;
    }
</style>
