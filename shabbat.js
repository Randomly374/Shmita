

let shabbat_choices = [];
const SHABBAT_PIECES = 6;
var to_connect = (SHABBAT_PIECES / 2);
for(let i = 0; i < SHABBAT_PIECES; i++){
    let rand = Math.floor(Math.random() * SHABBAT_PIECES) % SHABBAT_PIECES;
    while(in_array(shabbat_choices, rand)){
        rand = Math.floor(Math.random() * SHABBAT_PIECES) % SHABBAT_PIECES;
    }
    shabbat_choices.push(rand);
    let div = document.createElement("div");
    div.id = "puzzle_piece:" + rand;
    let class_name = rand > 2 ? "inner" : "outer";
    div.className = "puzzle_piece_" + class_name;
    div.style.top = 200 + 100 * Math.floor(i / 2) + "px";
    div.style.left = 60 + 500 * (i % 2) + "px";
    document.getElementById("shabbat_game").appendChild(div);
    let img = document.createElement("img");
    img.id = "PPI" + rand;
    img.className = "PPI";
    let letter = (String.fromCharCode("c".charCodeAt(0) + rand));
    img.src = ("מסודר/SH 031 " + letter + ".png");
    div.appendChild(img);
    let connector = document.createElement("div");
    connector.id = "connector:" + rand;
    connector.className = "connector " + class_name;
    div.appendChild(connector);
    dragElement(div, new Event("stopped"));
    div.addEventListener("stopped", () => {
        let connector_position_L_T = {x: +div.style.left.split("p")[0] + (Math.floor(rand / (SHABBAT_PIECES / 2)) === 0 ? 383 : 0), y: +div.style.top.split("p")[0] + 33};
        let connector_position_R_B = {x: connector_position_L_T.x + 20, y: connector_position_L_T.y + 20};
        for(let j = 0; j < SHABBAT_PIECES; j++){
            if(Math.floor(j / (SHABBAT_PIECES / 2)) === Math.floor(rand / (SHABBAT_PIECES / 2))){
                continue;
            }
                let div2 = document.getElementById("puzzle_piece:" + j);
                if(!div2){
                    continue;
                }
                    let connector2_position_L_T = {x: +div2.style.left.split("p")[0] + (Math.floor(j / (SHABBAT_PIECES / 2)) === 0 ? 383 : 0), y: +div2.style.top.split("p")[0] + 33};
                    let connector2_position_R_B = {x: connector2_position_L_T.x + 20, y: connector2_position_L_T.y + 20};
                    if(connector_position_L_T.x > connector2_position_R_B.x || connector2_position_L_T.x > connector_position_R_B.x){
                        continue;
                    }
                    if(connector_position_L_T.y > connector2_position_R_B.y || connector2_position_L_T.y > connector_position_R_B.y){
                        continue;
                    }
                    let connected_div = document.createElement("div");
                    connected_div.id = `connected:${rand}:${j}`;
                    connected_div.className = "connected";
                    connected_div.style.top = div.style.top;
                    connected_div.style.left = (Math.floor(rand / (SHABBAT_PIECES / 2)) === 0 ? div.style.left : div2.style.left);
                    div.style.top = "0px";
                    div.style.left = (Math.floor(rand / (SHABBAT_PIECES / 2)) !== 0 ? 383 : 0) + "px";
                    div2.style.top = "0px";
                    div2.style.left = (Math.floor(j / (SHABBAT_PIECES / 2)) !== 0 ? 383 : 0) + "px";
                    div.onmousedown = null;
                    div2.onmousedown = null;
                    connected_div.appendChild(div);
                    connected_div.appendChild(div2);
                    document.getElementById("shabbat_game").appendChild(connected_div);
                    if(rand % (SHABBAT_PIECES / 2) === j % (SHABBAT_PIECES / 2)){
                        connected_div.style.border = "5px solid green";
                        if(--to_connect === 0){
                            document.getElementById("games_div").className = "games_div blow_down";
                            setTimeout(() => {
                                document.getElementById("shabbat_game").style.display = "none";
                                document.getElementById("games_div").style.display = "none";
                                mirror7_shown = true;
                                document.getElementById("games_div").className = "games_div";
                                add_weight_button();
                                document.dispatchEvent(new CustomEvent("show_title", {detail:{src: "מסודר/SH 049 e.png", className: "title_slide_down_calender", next_game_event: new Event("setup_babushka")}}));
                            }, 1000);
                        }
                    }else{
                        connected_div.style.border = "5px solid red";
                    }
                    dragElement(connected_div);
                    let undo_div = document.createElement("div");
                    undo_div.id = `undo:${rand}:${j}`;
                    undo_div.className = "undo";
                    undo_div.onclick = () => {
                        if(rand % (SHABBAT_PIECES / 2) === j % (SHABBAT_PIECES / 2)){
                            to_connect++;
                        }
                        document.getElementById("shabbat_game").appendChild(div);
                        div.style.top = connected_div.style.top;
                        div.style.left = +connected_div.style.left.split("p")[0] + (Math.floor(rand / (SHABBAT_PIECES / 2)) !== 0 ? 410 : -10) + "px";
                        div2.style.top = connected_div.style.top;
                        div2.style.left = +connected_div.style.left.split("p")[0] + (Math.floor(j / (SHABBAT_PIECES / 2)) !== 0 ? 410 : -10) + "px";
                        document.getElementById("shabbat_game").appendChild(div2);
                        document.getElementById("shabbat_game").removeChild(connected_div);
                        dragElement(div, new Event("stopped"));
                        dragElement(div2, new Event("stopped"));
                    }
                    connected_div.appendChild(undo_div);
                    return;
        }
    });
}

function in_array(arr, index){
    for(let i = 0; i < arr.length; i++){
        if(arr[i] === index){
            return true;
        }
    }
    return false;
}