<script>
    let {
        session=$bindable()
    } = $props()

    let dlg = $state.raw()
</script>

<button
    onclick={evt => dlg.showModal()}
>Clear</button>
<dialog 
    bind:this={dlg}
>
    <div class=content>
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
    </div>
</dialog>

<style>
    dialog {
        border: 1px solid var(--overlay);
        background-color: var(--base);
        color: var(--text);
        box-shadow: .05rem .05rem 1rem .25rem var(--crust);
    }
    .content {
        display: flex;
        flex-direction: column;
        gap: 1rem;
    }
    .ctrls {
        display: flex;
        flex-direction: row;
        justify-content: flex-end;
        gap: .5rem;
    }
</style>