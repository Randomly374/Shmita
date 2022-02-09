
var israel_game_shown = false;
const IGAnswers = [

];

function israel_game_click(){
    let GD = document.getElementById("games_div");
    let IG = document.getElementById("israel_game");
    document.getElementById("IGVideo").pause();
    let class_add;
    if(!israel_game_shown){
        class_add = "blow_up";
        GD.style.display = "block";
        IG.style.display = "block";
    }else{
        class_add = "blow_down";
        setTimeout(() => {
            IG.style.display = "none";
            GD.style.display = "none";
        }, 970);
    }
    GD.className = "games_div israel_" + class_add;
    setTimeout(() => {
        GD.className = "games_div";
    }, 1000);
    israel_game_shown = !israel_game_shown;
}

document.getElementById("IGVideo").volume = 0.3;
let israel_inter = null;
document.getElementById("IGVideo").onplaying = () => {
    israel_inter = setInterval(() => {
        if(document.getElementById("IGVideo").currentTime > 30){
            document.getElementById("IGVideo").className = "minimize";
            clearInterval(israel_inter);
        }
    }, 1000);
};
document.getElementById("IGVideo").onpause = () => {
    if(israel_inter){
        clearInterval(israel_inter);
    }
}
document.getElementById("IGVideo").onended = () => {
    document.getElementById("IGVideo").className += " DISAPPEAR";
    setTimeout(() => {
        document.getElementById("IGVideo").style.display = "none";
    }, 900);
}

const Icollumns = [
    {x: 140, y: 535},
    {x: 285, y: 535},
    {x: 430, y: 535},
    {x: 595, y: 535},
    {x: 740, y: 535},
    {x: 875, y: 535}
];
const answer_coords = [
    391,
    171,
    367,
    207,
    189,
    387
];
const answer_number = [
    70,
    180,
    82,
    900,
    950,
    400
];
var I_to_win = 6;
for(let i = 0; i < 6; i++){
    let collumn = document.createElement("div");
    collumn.id = "ICollumn" + i;
    collumn.className = "ICollumn";
    collumn.style.left = Icollumns[i].x + "px";
    collumn.style.top = Icollumns[i].y + "px";
    document.getElementById("israel_game").appendChild(collumn);
    let bar = document.createElement("div");
    bar.id = "IBar" + i;
    bar.className = "IBar pick_me";
    let h3 = document.createElement("h3");
    h3.id = "Ih3" + i;
    h3.className = "Ih3";
    collumn.appendChild(h3);
    collumn.appendChild(bar);
    Israel_drag_and_goal(bar, 
        10, 
        30, 
        {x: Icollumns[i].x - 7.5, y: answer_coords[i] - 3},
        {x: Icollumns[i].x + 22.5, y: answer_coords[i] + 10},
        new Event("good_placement")
        );
    bar.addEventListener("good_placement", () => {
        collumn.style.top = answer_coords[i] + 3;
        collumn.style.height = 535 - answer_coords[i];
        collumn.style.backgroundColor = "green";
        h3.innerText = "-" + answer_number[i] + "-";
        bar.onmousedown = null;
        if(--I_to_win === 0){
            setTimeout(() => {
                israel_game_shown = true;
                is_balanced_first_time = true;
                israel_game_click();
            }, 2000);
            document.dispatchEvent(new Event("Israel_end"));
        }
    });
}

function Israel_drag_and_goal(elmnt, elmnt_SIZE_Y, elmnt_SIZE_X, L_T, R_B, win_event){
    let trigger = new Event("stopped_moving");
    IsraelDragElement(elmnt, trigger);
    elmnt.addEventListener("stopped_moving", () => {
        let collumn = document.getElementById("ICollumn" + elmnt.id.split("r")[1]);
        if(check_if_in(collumn, elmnt_SIZE_Y, elmnt_SIZE_X, L_T, R_B)){
            elmnt.dispatchEvent(win_event);
        }
    });
}

function IsraelDragElement(elmnt, trigger = null) {
    //let mir_shown = document.getElementById("mirror7");
    let zIndex = elmnt.style.zIndex ? elmnt.style.zIndex : 1;
    let elmnt_Index = +elmnt.id.split("r")[1];
    let first_move = true;
    var pos2 = 0, pos4 = 0;
    if (document.getElementById(elmnt.id)) {
    // if present, the header is where you move the DIV from:
        document.getElementById(elmnt.id).onmousedown = IsraeldragMouseDown;
    } else {
        // otherwise, move the DIV from anywhere inside the DIV:
        elmnt.onmousedown = IsraeldragMouseDown;
    }

    function IsraeldragMouseDown(e) {
        // if(mir_shown && (mirror6_shown || mirror7_shown)){
        //     mir_shown.dispatchEvent(new CustomEvent("mirror_drag_start", {detail: {moving: elmnt}}));
        // }
        elmnt.style.zIndex = 3;
        elmnt.className = "IBar";
        if(first_move){
            first_move = false;
        }
        focused_img = elmnt;
        e = e || window.event;
        e.preventDefault();
        // get the mouse cursor position at startup:
        pos4 = e.clientY;
        document.onmouseup = closeIsraelDragElement;
        // call a function whenever the cursor moves:
        document.onmousemove = IsraelElementDrag;
    }

    function IsraelElementDrag(e) {
        // if(mir_shown && (mirror6_shown || mirror7_shown)){
        //     mir_shown.dispatchEvent(new CustomEvent("mirror_drag_move", {detail: {moving: elmnt}}));
        // }
        e = e || window.event;
        e.preventDefault();
        // calculate the new cursor position:
        pos2 = pos4 - e.clientY;
        pos4 = e.clientY;
        // set the element's new position:
        let collumn = document.getElementById("ICollumn" + elmnt_Index);
        let h3 = document.getElementById("Ih3" + elmnt_Index);
        let top = Math.max((collumn.offsetTop - pos2), 174);
        top = Math.min(top, 535);
        collumn.style.top = top.toString() + "px";
        let tot = 535 - 174;
        let top_score = (elmnt_Index < 3 ? 180 : 1000);
        let height = (535 - top + 3);
        collumn.style.height = height + "px";
        collumn.style.backgroundColor = `rgb(${((height / tot)) * 255}, 0, 255)`;
        h3.innerText = "-" + Math.floor(top_score * (height / tot)) + "-";
    }

    function closeIsraelDragElement() {
    // if(mir_shown && (mirror6_shown || mirror7_shown)){
        //     mir_shown.dispatchEvent(new CustomEvent("mirror_drag_stop", {detail: {moving: elmnt}}));
        // }
        
        if(trigger){
            elmnt.dispatchEvent(trigger);
        }
        elmnt.style.zIndex = zIndex;
        document.onmouseup = null;
        document.onmousemove = null;
        first_move = true;
    }
}

document.getElementById("magnify_glass").onmousedown = (e) => {
            e = e || window.event;
            let circle = document.createElement("div");
            circle.id = "circle7";
            circle.className = "israel_circle";
            document.getElementById("games_div").style.opacity = 0.01;
            document.getElementById("games_div").style.transition = "opacity 1s";
            document.getElementById("seventh_year").style.display = "block";
            document.getElementById("darkness").style.display = "none";
            document.getElementById("seventh_year").style.filter = "brightness(0.1)";
            document.getElementById("full_screen").appendChild(circle);
            let img = document.createElement("img");
            img.id = "inside_magnify";
            img.src = "מסודר/SH 000 reka E.png";
            circle.appendChild(img);
            e.preventDefault();
            var pos1, pos2, pos3, pos4;
            // get the mouse cursor position at startup:
            pos3 = e.clientX;
            pos4 = e.clientY;
            circle.style.left = (pos3 - 50).toString() + "px";
            circle.style.top = (pos4 - 50).toString() + "px";
            document.onmouseup = closeDragElement;
            // call a function whenever the cursor moves:
            document.onmousemove = elementDrag;
            function elementDrag(e) {
                e = e || window.event;
                e.preventDefault();
                // calculate the new cursor position:
                pos1 = pos3;
                pos2 = pos4;
                // console.log(pos1, pos2, pos3, pos4, e.ClientX, e.ClientY);
                //console.log(produce.offsetTop, produce.offsetLeft);
                pos3 = e.clientX;
                pos4 = e.clientY;
                // set the element's new position:
                let top = (pos2 - 72.5);
                let left = (pos1 - 72.5);
                circle.style.top = top.toString() + "px";
                circle.style.left = left.toString() + "px";
                img.style.top = -1.05 * (top) + "px";
                img.style.left = -1.05 * (left) + "px";
                
            }

            function closeDragElement() {  
                document.getElementById("full_screen").removeChild(circle);
                document.getElementById("games_div").style.opacity = 1;
                document.getElementById("seventh_year").style.filter = "";
                document.onmouseup = null;
                document.onmousemove = null;
            }
};