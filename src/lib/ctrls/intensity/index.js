import BreathsCtrl from "./BreathsCtrl.svelte";
import IntensityCtrl from "./IntensityCtrl.svelte";
import WeightCtrl from "./WeightCtrl.svelte";

export const ctrls = {
    breaths: {
        label: "Breaths",
        ctrl: BreathsCtrl
    },
    intensity: {
        label: "Intensity",
        ctrl: IntensityCtrl
    },
    weight: {
        label: "Weight",
        ctrl: WeightCtrl
    }
}

