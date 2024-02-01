/** Table visibility functions **/


function set_table_visibility(visibility) {
    // show/hide table
    document.getElementById("canvas").hidden = !visibility;
    // show/hide buttons
    document.getElementById("editor-buttons").hidden = visibility;
    document.getElementById("viewer-buttons").hidden = !visibility;
    // build table
    build_table()
}

function show_table() {
    set_table_visibility(true);
}

function hide_table() {
    set_table_visibility(false);
}


/** Table building functions **/

// array to represent workout
const workout = {};

function add_set() {
    // get relevant controls
    let exercise_ctrl = document.getElementById("exercise-ctrl");
    let weight_ctrl = document.getElementById("weight-ctrl");
    let reps_ctrl = document.getElementById("reps-ctrl");
    // get exercise
    let key = exercise_ctrl.value;
    // if new exercise, add to workout
    if (workout[key] === undefined) {
        workout[key] = [];
    }
    // add set
    workout[key].push({
        weight: weight_ctrl.value,
        reps: reps_ctrl.value,
    });
    // clear ctrls
    weight_ctrl.value = "";
    reps_ctrl.value = "";
}

function build_table() {
    // get elements
    let table_emt = document.getElementById("table");
    let exercise_lbl = document.getElementById("exercise-lbl");
    let weight_lbl = document.getElementById("weight-lbl");
    let reps_lbl = document.getElementById("reps-lbl");
    // clear table
    table_emt.innerHTML = "";
    // make heading row
    let head_row = document.createElement("tr");
    head_row.className = "grand-head"
    table_emt.appendChild(head_row);
    let exercise_head = document.createElement("th");
    exercise_head.textContent = exercise_lbl.textContent;
    head_row.appendChild(exercise_head);
    let w_r_head = document.createElement("th");
    head_row.appendChild(w_r_head);

    // variable for counting number of columns
    let cols = 1;
    // iterate through exercises...
    for (let key in workout) {
        // get sets for this exercise
        let sets = workout[key];
        // update max cols
        cols = Math.max(sets.length, cols)
        // create rows for this exercise
        let weight_row = document.createElement("tr");
        weight_row.className = "weight-row"
        table_emt.appendChild(weight_row);
        let reps_row = document.createElement("tr");
        reps_row.className = "reps-row"
        table_emt.appendChild(reps_row);
        // add exercise heading
        let exercise_th = document.createElement("th");
        exercise_th.textContent = key;
        exercise_th.rowSpan = 2;
        weight_row.appendChild(exercise_th);
        // add weight / reps headings
        let weight_th = document.createElement("th");
        weight_th.textContent = weight_lbl.textContent;
        weight_row.appendChild(weight_th);
        let reps_th = document.createElement("th");
        reps_th.textContent = reps_lbl.textContent;
        reps_row.appendChild(reps_th);
        // iterate through sets...
        for (let this_set of sets) {
            // add weight cell
            let weight_td = document.createElement("td");
            weight_td.textContent = this_set['weight'];
            weight_row.appendChild(weight_td);
            // add reps cell
            let reps_td = document.createElement("td");
            reps_td.textContent = this_set['reps'];
            reps_row.appendChild(reps_td);
        }
    }
    // add set headers
    for (let set_n of Array(cols).keys()) {
        let set_head = document.createElement("th");
        set_head.textContent = `Set ${set_n + 1}`
        head_row.appendChild(set_head);
    }
}

function export_workout() {
    print()
}
