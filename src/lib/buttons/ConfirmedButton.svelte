<script>
    import {
        fade
    } from 'svelte/transition';

    let {
        onclick = evt => {},
        children
    } = $props()

    let showConf = $state.raw(false)
</script>

<div class=container>
    {#if showConf}
        <div 
            class=confirmation
            out:fade={{ 
                direction: "out",
                duration: 1000
            }}
        >
            ✓ Added
        </div>
    {/if}
    <button
        onclick={evt => {
            // show confirmation
            showConf = true
            setTimeout(() => showConf = false, 500)
            // run onclick event
            onclick(evt)
        }}
    >
        {@render children()}
    </button>
</div>

<style>
    .container {
        display: flex;
        flex-direction: row;
        align-items: center;
        gap: .5rem;
    }
</style>
