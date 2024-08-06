<script lang="ts">
    import type ElementGroup from "../../models/ElementGroup.js";
    interface Props {
        groupedElements: ElementGroup[];
    }

    let answer = $state('');
    let { groupedElements }: Props = $props();

    const processAnswer = (answer: string): void => {
        groupedElements.find((group) => {
            const matchingElement = group.elements.find((element) => {
                if (element.name === answer.toLowerCase()) {
                    element.revealed = true;
                    return true;
                }
                return false;
            });
            return matchingElement;
        });
    };

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
    <input name="answer" value={answer} oninput={(e) => answer = e.target.value} />
</form>

<style>
    form {
        padding: 2rem;
    }
</style>
