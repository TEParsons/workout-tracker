<script>
    let {
        handle=$bindable(),
        children
    } = $props()
</script>

<dialog
    bind:this={handle}
    closedby=any
>
    <div class=content>
        {@render children?.()}
    </div>
</dialog>

<style>
    dialog {
        border: 1px solid var(--overlay);
        background-color: var(--base);
        color: var(--text);
        box-shadow: .05rem .05rem 1rem .25rem var(--crust);
        max-width: calc(100% - 8rem);
        max-height: calc(100% - 8rem);
    }

    .content {
        display: flex;
        flex-direction: column;
        gap: 1rem;
        min-width: 20rem; 
        max-height: 100%;
    }
</style>