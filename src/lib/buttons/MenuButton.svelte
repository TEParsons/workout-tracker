<script>
    import { scale } from "svelte/transition";
    let {
        showMenu=$bindable(),
        menu,
        children
    } = $props()

    let handles = $state({
        button: undefined,
        menu: undefined
    });

</script>

<div class=menu-button>
    <button
        style:position=relative
        onclick={evt => showMenu = true}
        bind:this={handles.button}
    >
        {@render children?.()}
        ▾

        {#if showMenu}
            <div 
                class=menu
                bind:this={handles.menu}
                transition:scale
            >
                {@render menu?.()}
            </div>
        {/if}
    </button>
</div>

<svelte:window
    onclick={evt => {
        if (!handles.menu?.contains(evt.target) && evt.target != handles.button) {
            showMenu &= evt.target == handles.button || handles.menu?.contains(evt.target)
        }
    }}
/>

<style>
    .menu {
        display: flex;
        flex-direction: column;
        gap: .5rem;
        position: absolute;
        top: 0;
        left: 0;
        padding: 1rem;
        background-color: var(--base);
        border: 1px solid var(--overlay);
        border-radius: .5rem;
    }
</style>