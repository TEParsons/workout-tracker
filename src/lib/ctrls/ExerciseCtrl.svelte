<script>
    import exercises from "$lib/exercises.json";

    let {
        value=$bindable(),
        intensity=$bindable(),
        quantity=$bindable()
    } = $props()

    $effect(() => {
        if (value in exercises) {
            intensity.type = exercises[value].intensity
            quantity.type = exercises[value].quantity
        } 
    } 
    )
</script>

<div class=exercise-ctrl>
    <datalist
        id=exercises
    >
        {#each Object.keys(exercises) as exercise}
            <option value={exercise}></option>
        {/each}
    </datalist>
    <input
        type=text
        list=exercises
        name=exercise
        bind:value={value}
    />
    
</div>

<style>
    .exercise-ctrl {
        display: flex;
        flex-direction: row;
        gap: .5rem;
    }
</style>