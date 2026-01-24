<script>
    let {
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
<div class=container>
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
</div>

<style>
    .container {
        overflow-x: auto;
        max-width: 100%;
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
        border: 2px solid var(--crust);
    }
    th {
        border: 2px solid var(--crust);
        background-color: var(--crust);
    }

    tr.quantity + tr.intensity {
        border-top: .5rem solid var(--crust);
    }
</style>