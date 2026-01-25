<script>
    import Clear from "./Clear.svelte";
    import Export from "./Export.svelte";
    import Dialog from "$lib/dialog/Dialog.svelte";

    let {
        handle=$bindable(),
        session=$bindable()
    } = $props()

    let byExercise = $derived.by(() => {
        let output = {}
        // iterate through sets...
        for (let set of session) {
            // make sure there is an entry for this exercise
            if (!output[set.exercise]) {
                output[set.exercise] = {
                    label: set.exercise,
                    intensity: [],
                    quantity: [],
                    sets: []
                }
            }
            // add any new intensity/quantity types
            if (!output[set.exercise].intensity.includes(set.intensity.type)) {
                output[set.exercise].intensity.push(set.intensity.type)
            }
            if (!output[set.exercise].quantity.includes(set.quantity.type)) {
                output[set.exercise].quantity.push(set.quantity.type)
            }
            // add set
            output[set.exercise].sets.push(set)
        }
    
        return output
    })
</script>

<Dialog bind:handle={handle}>
    <div class=table>
        {#if session.length}
            <table class=workout-session>
                <tbody>
                    {#each Object.entries(byExercise) as [name, exercise]}
                        <tr class=intensity>
                            <th rowspan="2">{name}</th>
                            <th>{exercise.intensity.join("/")}</th>
                            {#each exercise.sets as set}
                                <td>{set.intensity.value}</td>
                            {/each}
                        </tr>
                        <tr class=quantity>
                            <th>{exercise.quantity.join("/")}</th>
                            {#each exercise.sets as set}
                                <td>{set.quantity.value}</td>
                            {/each}
                        </tr>
                    {/each}
                </tbody>
            </table>
        {:else}
            <div class=placeholder>
                No data
            </div>
        {/if}
    </div>
    <div class=ctrls>
        <Clear
            bind:session={session}
        />
        <Export 
            bind:session={session}
        />
    </div>
</Dialog>


<style>
    .container {
        display: flex;
        flex-direction: column;
        gap: 1rem;
    }
    .table {
        overflow: auto;
        min-height: 10rem;
        min-width: 10rem;
        max-width: 100%;
    }
    .placeholder {
        display: flex;
        align-items: center;
        justify-content: center;
    }
    table { 
        border-collapse: collapse;
        background-color: var(--base);
    }
    td, th {
        padding: .5rem 1rem;
    }
    td {
        font-family: var(--mono);
        border: 2px solid var(--overlay);
    }
    th {
        border: 2px solid var(--overlay);
        background-color: var(--overlay);
    }

    tr.quantity + tr.intensity {
        border-top: .5rem solid var(--overlay);
    }

    .ctrls {
        display: flex;
        flex-direction: row;
        gap: .5rem;
        width: 100%;
        justify-content: flex-end;
    }
</style>