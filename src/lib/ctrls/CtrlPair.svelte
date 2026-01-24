<script>
    
    let {
        value=$bindable(),
        type=$bindable(),
        ctrls
    } = $props()

    let Ctrl = $derived(ctrls[type].ctrl)
</script>

<div class=ctrl-pair>
    <select class=type-ctrl bind:value={type}>
        {#each Object.entries(ctrls) as [key, ctrl]}
            <option value={key}>{ctrl.label}</option>
        {/each}
    </select>
    <div class=value-ctrl>
        <Ctrl bind:value={value} />
    </div>
</div>

<style>
    .ctrl-pair {
        display: flex;
        flex-direction: column;
        align-items: stretch;
    }
    .value-ctrl {
        display: flex;
        flex-direction: row;
        gap: .5rem;
    }
    .type-ctrl {
        padding: .25rem 0;
    }
</style>
