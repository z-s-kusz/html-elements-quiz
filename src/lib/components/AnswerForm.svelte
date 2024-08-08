<script lang="ts">
    interface Props {
        processAnswer: Function;
    }

    let answer = $state('');
    let { processAnswer }: Props = $props();

    const submit = (event: SubmitEvent) => {
        event.preventDefault();

        if (!answer) return;
        processAnswer(answer);
        answer = '';
    };
</script>

<form onsubmit={submit}>
    <!-- TODO fix type possibly null error -->
    <label for="answer">Element</label>
    <input name="answer" value={answer} oninput={(e) => answer = e.target.value} autocomplete="off" />
</form>

<style>
    form {
        padding: 2rem;
    }
</style>
