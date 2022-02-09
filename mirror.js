
var mirror6_shown = false;
var mirror7_shown = false;

document.getElementById("mirror6").addEventListener("mirror_drag_start", mirror_start);
    
document.getElementById("mirror6").addEventListener("mirror_drag_move", mirror_drag);

document.getElementById("mirror6").addEventListener("mirror_drag_stop", mirror_stop);

document.getElementById("mirror7").addEventListener("mirror_drag_start", mirror_start);
    
document.getElementById("mirror7").addEventListener("mirror_drag_move", mirror_drag);

document.getElementById("mirror7").addEventListener("mirror_drag_stop", mirror_stop);

function mirror_start(e){
    if(!mirror6_shown && !mirror7_shown){
        return;
    }
    let elmnt_clone = document.getElementById(e.detail.moving.id + "MW");
    if(!elmnt_clone){
        elmnt_clone = e.detail.moving.cloneNode(true);
        if(elmnt_clone.className.includes("weight_in_")){
            elmnt_clone.className = "weight";
        }
        if(e.detail.moving.id === "sidur7"){
            let CN = elmnt_clone.childNodes;
            for(let i = 0; i < CN.length; i++){
                if(CN[i].nodeType === 1){
                    CN[i].src = "מסודר/SH 007 b.png";
                    CN[i].style.transform = "scale(3) rotateY(180deg)";
                    break;
                }
            }
        }
        elmnt_clone.id = e.detail.moving.id + "MW";
        elmnt_clone.classList.add("mirror_image");
    }
    elmnt_clone.style.top = +e.detail.moving.style.top.split("p")[0] - 259 + "px";
    elmnt_clone.style.left = +e.detail.moving.style.left.split("p")[0] - 457 + "px";
    let inner_mirror = mirror6_shown? "mirror_inner6" : "mirror_inner7";
    document.getElementById(inner_mirror).appendChild(elmnt_clone);
}

function mirror_drag(e){
    if(!mirror6_shown && !mirror7_shown){
        return;
    }
    let elmnt_clone = document.getElementById(e.detail.moving.id + "MW");
    elmnt_clone.style.top = +e.detail.moving.style.top.split("p")[0] - 259 + "px";
    elmnt_clone.style.left = +e.detail.moving.style.left.split("p")[0] - 457 + "px";
}

function mirror_stop(e){
    if(!mirror6_shown && !mirror7_shown){
        return;
    }
    let elmnt_clone = document.getElementById(e.detail.moving.id + "MW");
    let inner_mirror = mirror6_shown? "mirror_inner6" : "mirror_inner7";
    document.getElementById(inner_mirror).removeChild(elmnt_clone);
}