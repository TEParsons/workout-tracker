<script>
    import MenuButton from "$lib/buttons/MenuButton.svelte";
    import { exportCSV, exportJSON } from "$lib/export.js";

    let {
        session=$bindable()
    } = $props()

    let showMenu = $state.raw();
</script>


<MenuButton
    bind:showMenu={showMenu}
>
    {#snippet menu()}
        <button
            onclick={evt => exportCSV(session)}
        >CSV</button>
        <button
            onclick={evt => exportJSON(session)}
        >JSON</button>
    {/snippet}
    Export
</MenuButton>