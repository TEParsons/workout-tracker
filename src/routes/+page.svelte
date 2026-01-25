<script>
    import { ConfirmedButton } from "$lib/buttons"
    import { ctrls as intensityCtrls } from "$lib/ctrls/intensity";
    import { ctrls as quantityCtrls } from "$lib/ctrls/quantity";
    import ExerciseCtrl from "$lib/ctrls/ExerciseCtrl.svelte";
    import CtrlPair from "$lib/ctrls/CtrlPair.svelte";
    import Table from "$lib/table/Table.svelte";
    import ClearBtn from "$lib/ctrls/ClearBtn.svelte";
    import Export from "$lib/table/Export.svelte";
    import { onMount, setContext } from "svelte";

    let session = $state([]);

    let set = $state({
        exercise: "",
        intensity: {
            type: "intensity",
            value: undefined
        },
        quantity: {
            type: "time",
            value: undefined
        }
    })

    let view = $state.raw("add")

    onMount(() => {
        // load session from local data on reload, if possible
        if (localStorage["workout-tracker-session"]) {
            session = JSON.parse(localStorage["workout-tracker-session"])
        }

        $effect(() => {
            // once session has been setup
            localStorage.setItem("workout-tracker-session", JSON.stringify(session))
        })
    })
</script>

<header>
    <h1>Workout Tracker</h1>
</header>
<main>
    {#if view === "add"}
        <div class=ctrls>
            <ExerciseCtrl 
                bind:value={set.exercise}
                bind:intensity={set.intensity}
                bind:quantity={set.quantity}
            />
            <CtrlPair 
                bind:value={set.intensity.value}
                bind:type={set.intensity.type}
                ctrls={intensityCtrls}
            />
            <CtrlPair 
                bind:value={set.quantity.value}
                bind:type={set.quantity.type}
                ctrls={quantityCtrls}
            />
        </div>
        <div class=buttons>
            <ConfirmedButton
                onclick={evt => {
                    // add set
                    session.push($state.snapshot(set));
                    // clear fields
                    set.intensity.value = undefined
                    set.quantity.value = undefined
                }}
            >
                Add set
            </ConfirmedButton>
            <button
                onclick={evt => view = "view"}
            >
                View table
            </button>
        </div>
    {/if}
    {#if view === "view"}
        <Table 
            bind:session={session}
        />
        <div class=buttons>
            <button
                onclick={evt => view = "add"}
            >
                Back    
            </button>
            <ClearBtn
                bind:session={session}
            />
            <Export 
                bind:session={session}
            />
        </div>
    {/if}
</main>


<style>
    header {
        display: flex;
        justify-content: center;
    }

    main {
        position: relative;
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 100%;
        max-width: 30rem;
        gap: 1rem;
    }

    .ctrls {
        display: flex;
        flex-direction: column;
        align-items: stretch;
        width: 100%;
        gap: .5rem;
    }

    .buttons {
        display: flex;
        flex-direction: row;
        gap: .5rem;
        width: 100%;
        justify-content: flex-end;
    }
</style>