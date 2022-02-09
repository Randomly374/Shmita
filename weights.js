var WI = 0;

var left_side_weights = [];
var right_side_weights = [38];
var scales_tipped = "right";

const weight_values = [
    1,
    10,
    7,
    6,
    50
];


function add_weight_button(){
    if(WI < 5){
        add_weight(WI++);
    }
    if(WI === 4){
        document.getElementById("degreesI7").src = "מסודר/SH 012 d.png";
        add_text_bubble({text: "צריך לצאת מפה מהר, המקור שלי קופא.", id: "BB2", class: "bird", kind: 2, img: "מסודר/SH 030 b.png"}, document.getElementById("seventh_year"));
        setTimeout(() => {
            add_text_bubble({text: "מזל שיש לי מחילה.", id: "MB1", class: "mouse", kind: 1, img: "מסודר/SH 030 a.png"}, document.getElementById("seventh_year"));
        }, "צריך לצאת מפה מהר, המקור שלי קופא.".length * 60);
        setTimeout(() => {
            remove_text_bubble({id: "BB2"}, document.getElementById("seventh_year"));
            remove_text_bubble({id: "MB1"}, document.getElementById("seventh_year"));
        }, 5000);
    }else if(WI === 2){
        document.getElementById("degreesI7").src = "מסודר/SH 012 c.png";
        add_text_bubble({text: "בררר, מ-ממש ק-ק-ק-קר פה.", id: "BB3", class: "bird", kind: 3, img: "מסודר/SH 030 c.png"}, document.getElementById("seventh_year"));
        setTimeout(() => {
            remove_text_bubble({id: "BB3"}, document.getElementById("seventh_year"));
        }, 5000);
    }
}

function weight_drag_and_goal(elmnt, elmnt_SIZE_Y, elmnt_SIZE_X, L_T, R_B, win_event){
    let trigger = new Event("stopped_moving");
    WeightDragElement(elmnt, trigger);
    elmnt.addEventListener("stopped_moving", () => {
        if(check_if_in(elmnt, elmnt_SIZE_Y, elmnt_SIZE_X, L_T, R_B)){
            elmnt.dispatchEvent(win_event);
        }
    });
}

function WeightDragElement(elmnt, trigger = null) {
    let mir_shown = document.getElementById("mirror7");
    let zIndex = elmnt.style.zIndex ? elmnt.style.zIndex : 4;
    let first_move = true;
    var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
    if (document.getElementById(elmnt.id)) {
    // if present, the header is where you move the DIV from:
        document.getElementById(elmnt.id).onmousedown = WeightdragMouseDown;
    } else {
        // otherwise, move the DIV from anywhere inside the DIV:
        elmnt.onmousedown = WeightdragMouseDown;
    }

    function WeightdragMouseDown(e) {
        if(mir_shown && (mirror6_shown || mirror7_shown)){
            mir_shown.dispatchEvent(new CustomEvent("mirror_drag_start", {detail: {moving: elmnt}}));
        }
        elmnt.style.zIndex = 5;
        if(first_move){
            first_move = false;
            elmnt.dispatchEvent(new Event("moved"));
        }
        focused_img = elmnt;
        e = e || window.event;
        e.preventDefault();
        // get the mouse cursor position at startup:
        pos3 = e.clientX;
        pos4 = e.clientY;
        document.onmouseup = closeWeightDragElement;
        // call a function whenever the cursor moves:
        document.onmousemove = weightElementDrag;
    }

    function weightElementDrag(e) {
        if(mir_shown && (mirror6_shown || mirror7_shown)){
            mir_shown.dispatchEvent(new CustomEvent("mirror_drag_move", {detail: {moving: elmnt}}));
        }
        e = e || window.event;
        e.preventDefault();
        // calculate the new cursor position:
        pos1 = pos3 - e.clientX;
        pos2 = pos4 - e.clientY;
        pos3 = e.clientX;
        pos4 = e.clientY;
        // set the element's new position:
        let top = (elmnt.offsetTop - pos2);
        let left = (elmnt.offsetLeft - pos1);
        elmnt.style.top = top.toString() + "px";
        elmnt.style.left = left.toString() + "px";
    }

    function closeWeightDragElement() {
        
        if(mir_shown && (mirror6_shown || mirror7_shown)){
            mir_shown.dispatchEvent(new CustomEvent("mirror_drag_stop", {detail: {moving: elmnt}}));
        }
        
        if(trigger){
            elmnt.dispatchEvent(trigger);
        }
        elmnt.style.zIndex = zIndex;
        document.onmouseup = null;
        document.onmousemove = null;
        first_move = true;
    }
} 


function add_weight(index){
    let weight = document.createElement("img");
    weight.className = "weight";
    weight.id = "weight" + index;
    weight.src = "מסודר/SH 047 " + String.fromCharCode("a".charCodeAt(0) + index) + ".png";
    weight.style.top = 393 + (index % 2 !== 1 ? 0 : 7) + "px";
    weight.style.left = 322 - index * 13 + "px";
    weight.onmouseover = () => {
        document.getElementById("scales_sides").style.opacity = 0.3;
        weight.style.zIndex = 5;
    }
    weight.onmouseleave = () => {
        document.getElementById("scales_sides").style.opacity = 0;
        weight.style.zIndex = 4;
    }
    /**
     * div.scales{
            top: 375px;
            left: 338px;
            width: 110px;
            height: 53px;
        }
     */
    weight_drag_and_goal(weight, 32, 20, {x: 338, y: 375}, {x: 448, y: 428}, new Event("weighting"));
    weight.addEventListener("weighting", () => {
        if(+weight.style.left.split("p")[0] < 393){
            weight.style.left = "345px";
            weight.style.top = scales_tipped === "right" ? "351px" : scales_tipped === "left" ? "361px" : "356px";
            left_side_weights.push(weight_values[index]);
            weight.className = "weight weight_in_left";
        }else{
            weight.style.left = "413px";
            weight.style.top = scales_tipped === "left" ? "351px" : scales_tipped === "right" ? "361px" : "356px";
            right_side_weights.push(weight_values[index]);
            weight.className = "weight weight_in_right";
        }
        sum_scales();
    });
    weight.addEventListener("moved", () => {
        weight.className = "weight";
        for(let i = 0; i < left_side_weights.length; i++){
            if(weight_values[index] === left_side_weights[i]){
                left_side_weights.splice(i, 1);
            }
        }
        for(let i = 0; i < right_side_weights.length; i++){
            if(weight_values[index] === right_side_weights[i]){
                right_side_weights.splice(i, 1);
            }
        }
        sum_scales();
    });
    document.getElementById("seventh_year").appendChild(weight);
}
//              <img id="scalesI7" class="scalesI" src="מסודר/SH 014 a.png">
function sum_scales(){
    let sum = 0;
    let pre_num;
    let post_num;
    let balanced_flag = false;
    for(let i = 0; i < left_side_weights.length; i++){
        sum += left_side_weights[i];
    }
    for(let i = 0; i < right_side_weights.length; i++){
        sum -= right_side_weights[i];
    }
    if(sum < 0){
        scales_tipped = "right";
        pre_num = "--";
        post_num = "->";
        document.getElementById("scalesI7").src = "מסודר/SH 014 a.png";
    }else if(sum > 0){
        scales_tipped = "left";
        post_num = "--";
        pre_num = "<-";
        document.getElementById("scalesI7").src = "מסודר/SH 014 b.png";
    }else{
        scales_tipped = "centered";
        post_num = "--";
        pre_num = "--";
        document.getElementById("scalesI7").src = "מסודר/SH 014 c.png";
        balanced_flag = true;
    }
    setup_israel_game(balanced_flag);
    let sum_str = Math.abs(sum) + "";
    sum_str = sum_str.length === 1 ? "0" + sum_str : sum_str; 
    document.getElementById("scale_number").innerText = `${pre_num} ${sum_str} ${post_num}`;
    change_heights();
}

function change_heights(){
    let weights_right = document.getElementsByClassName("weight_in_right");
    let weights_left = document.getElementsByClassName("weight_in_left");
    for(let i = 0; i < weights_right.length; i++){
        weights_right[i].style.top = scales_tipped === "left" ? "351px" : scales_tipped === "right" ? "361px" : "356px";
        weights_right[i].style.left = 397 + 12 * (weights_right.length - 1 - i) + "px";
    }
    for(let i = 0; i < weights_left.length; i++){
        weights_left[i].style.top = scales_tipped === "right" ? "351px" : scales_tipped === "left" ? "361px" : "356px";
        weights_left[i].style.left = 329 + 12 * (weights_left.length - 1 - i) + "px";
    }
}
var is_balanced_first_time = false;
function setup_israel_game(show = false){
    if(show){
        document.getElementById("mirror_inner7").style.display = "none";
        document.getElementById("mirrorI7").src = "מסודר/SH 015 c.png";
        document.getElementById("mirror7").style.zIndex = 4;
        document.getElementById("dark_filter7").style.display = "block";
        if(!is_balanced_first_time){
            document.getElementById("mirror7").style.cursor = "pointer";
            document.getElementById("mirror7").onclick = () => {
                document.getElementById("dark_filter7").style.display = "none";
                document.getElementById("mirror7").style.zIndex = 0;
                let weights = document.getElementsByClassName("weight");
                for(let i = 0; i < weights.length; i++){
                    weights[i].style.zIndex = 1;
                }
                israel_game_click();
            };
        }
    }else{
        document.getElementById("dark_filter7").style.display = "none";
        document.getElementById("mirror_inner7").style.display = "block";
        document.getElementById("mirrorI7").src = "מסודר/SH 015 a.png";
        document.getElementById("mirror7").style.cursor = "auto";
        document.getElementById("mirror7").style.zIndex = 0;
        document.getElementById("mirror7").onclick = null;
    }
}