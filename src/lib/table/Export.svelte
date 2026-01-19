<script>
    import MenuButton from "$lib/buttons/MenuButton.svelte";

    let {
        session=$bindable()
    } = $props()

    let showMenu = $state.raw();

    async function exportCSV() {
        let byExercise = {}
        // iterate through sets...
        for (let set of session) {
            // make sure there is an entry for this exercise
            if (!byExercise[set.exercise]) {
                byExercise[set.exercise] = {
                    label: set.exercise,
                    intensity: [],
                    quantity: [],
                    sets: []
                }
            }
            // add any new intensity/quantity types
            if (!byExercise[set.exercise].intensity.includes(set.intensity.type)) {
                byExercise[set.exercise].intensity.push(set.intensity.type)
            }
            if (!byExercise[set.exercise].quantity.includes(set.quantity.type)) {
                byExercise[set.exercise].quantity.push(set.quantity.type)
            }
            // add set
            byExercise[set.exercise].sets.push(set)
        }

        // construct CSV string
        let csv = ""
        // iterate through exercises
        for (let [name, exercise] of Object.entries(byExercise)) {
            // intensity (with exercise name)
            csv += `${name},${exercise.intensity.join("/")},${exercise.sets.map(set => set.intensity.value).join(",")}\n`
            // quantity (without exercise name)
            csv += `,${exercise.quantity.join("/")},${exercise.sets.map(set => set.quantity.value).join(",")}\n`
        }
        
        // get today's date in the format YYYY_MM_DD
        let now = new Date(Date.now());
        let date = `${now.getFullYear()}_${now.getMonth()+1}_${now.getDate()}`
        // save file
        let file
        try {
            file = await showSaveFilePicker({
                suggestedName: `${date}.csv`,
                types: [
                    {
                        description: "CSV Table",
                        accept: {
                            "text/csv": [".csv"]
                        }
                    }
                ]
            })
        } catch {
            console.log("ERROR")
            return
        }
        // get file object
        let writable = await file.createWritable();
        await writable.write(csv)
        writable.close()
    }
</script>


<MenuButton
    bind:showMenu={showMenu}
>
    {#snippet menu()}
        <button>PDF</button>
        <button
            onclick={exportCSV}
        >CSV</button>
    {/snippet}
    Export
</MenuButton>