<script>
    let {
        value=$bindable()
    } = $props()
</script>

<input 
    type="number" 
    bind:value={value} 
/>

<style>
    input {
        flex-grow: 1;
    }
</style>