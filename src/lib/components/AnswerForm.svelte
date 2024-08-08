<script lang="ts">
    interface Props {
        processAnswer: Function;
        children: any;
    }

    let answer = $state('');
    let { processAnswer, children }: Props = $props();

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
</form>

<style>
    form {
        grid-column-start: 2;
        grid-row-start: 2;
        grid-column-end: 4;
        padding: 2rem;
        position: sticky;
        top: 0;
        background-color: white;
    }
</style>
