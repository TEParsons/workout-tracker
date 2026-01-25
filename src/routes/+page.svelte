<script>
    import { ConfirmedButton } from "$lib/buttons"
    import { ctrls as intensityCtrls } from "$lib/ctrls/intensity";
    import { ctrls as quantityCtrls } from "$lib/ctrls/quantity";
    import ExerciseCtrl from "$lib/ctrls/ExerciseCtrl.svelte";
    import CtrlPair from "$lib/ctrls/CtrlPair.svelte";
    import Table from "$lib/table/Table.svelte";
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

    let tableDlg = $state.raw()

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
            onclick={evt => tableDlg.showModal()}
        >
            View table
        </button>
    </div>


    <Table 
        bind:handle={tableDlg}
        bind:session={session}
    />
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