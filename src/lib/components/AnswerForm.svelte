<script lang="ts">
    let answer = $state('');

    const submit = (event: SubmitEvent) => {
        event.preventDefault();
    };
</script>

<form onsubmit={submit}>
    <!-- TODO fix type possibly null error -->
    <input value={answer} oninput={(e) => answer = e.target.value} />
    <div>{ answer }</div>
</form>
