<script lang="ts">
	import AnswerForm from "$lib/components/AnswerForm.svelte";
	import CategoryList from "$lib/components/CategoryList.svelte";

    let { data } = $props();
    console.log('data?', data);
</script>

<h1>hello there</h1>
<AnswerForm />
<CategoryList />
<CategoryList />
