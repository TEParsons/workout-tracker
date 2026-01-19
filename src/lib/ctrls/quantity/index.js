import PosesCtrl from "./PosesCtrl.svelte";
import RepsCtrl from "./RepsCtrl.svelte";
import TimeCtrl from "./TimeCtrl.svelte";

export const ctrls = {
    poses: {
        label: "Poses",
        ctrl: PosesCtrl
    },
    reps: {
        label: "Reps",
        ctrl: RepsCtrl
    },
    time: {
        label: "Time",
        ctrl: TimeCtrl
    }
}
