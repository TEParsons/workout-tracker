<script>
	let { children } = $props();
</script>

<svelte:head>
	<title>Workout Tracker</title>
	<link rel="stylesheet" href="/style.css" />
</svelte:head>

{@render children()}
