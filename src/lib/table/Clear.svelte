<script>
    import Dialog from "$lib/dialog/DIalog.svelte";

    let {
        session=$bindable()
    } = $props()

    let dlg = $state.raw()
</script>

<button
    onclick={evt => dlg.showModal()}
>Clear</button>

<Dialog
    bind:handle={dlg}
>
    Clear all workout data?

    <div class=ctrls>
        <button
            onclick={evt => {
                session = []
                dlg.close()
            }}
        >Yes</button>
        <button
            onclick={evt => dlg.close()}
        >No</button>
    </div>
</Dialog>

<style>
    .ctrls {
        display: flex;
        flex-direction: row;
        justify-content: flex-end;
        gap: .5rem;
    }
</style>