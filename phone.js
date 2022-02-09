var phone_before_seventh = true;
document.getElementById("WAVideo").volume = 0.3;
function change_phone(){
    let show = document.getElementById(phone_before_seventh? "phone_before_7_year" : "phone_before_6_year");
    let hide = document.getElementById(!phone_before_seventh? "phone_before_7_year" : "phone_before_6_year");
    show.style.display = "block";
    hide.style.display = "none";
    phone_before_seventh = !phone_before_seventh;
}

                /* -- START OF FIRST PHONE STAGE! -- */
                var phone_stage = 0;
                const WA = document.getElementById("whatsapp");
                const WDSE = document.getElementById("water_drop_SE");
                WDSE.volume = 0.002;
                WA.onclick = () => {
                    let screen = document.getElementById("screen6");
                    screen.src = "מסודר/SH 001 f.png";
                    phone_stage = 1;
                    WA.style.display = "none";
                    let WASE = document.getElementById("whatsapp_message_SE");
                    WASE.volume = 0.2;
                    setTimeout(() => {
                        add_phone_text_bubble(document.getElementById("phone_before_6_year"),
                        "באתי לביקור אצל הדוד שלי. הוא מכין את השדה לשנת השמיטה."
                        , "6:0"
                        , "מסודר/SH 001 c.png");
                    }, 1000);
                    setTimeout(() => {
                        add_phone_text_bubble(document.getElementById("phone_before_6_year"),
                        "תראי איזה יופי!"
                        , "6:1"
                        , "מסודר/SH 001 d.png",
                        document.getElementById("text_bubble"),
                        70,
                        210,
                        0);
                        let new_text = document.getElementById("text_bubble");
                        let img = document.createElement("img");
                        img.src = "מסודר/SH 000 Reka C.png";
                        img.id = "mini_stage";
                        img.style.cursor = "pointer";
                        img.onclick = () => {
                            let phone = document.getElementById("phone_before_6_year");
                            phone.style.display = "none";
                            let FS = document.getElementById("sixth_year");
                            FS.style.display = "block";
                            document.getElementById("sixth_year_sign_arrow").className = "year_sign_arrow SYSAD";
                            setTimeout(() => {
                                FS.removeChild(document.getElementById("sixth_year_sign_arrow"));
                                //title_show();
                                setTimeout(() => {
                                    document.getElementById("inner_tv_white_noise6").src = "./מסודר/מסך טלוויזיה/white noise.gif";
                                }, 10000);
                            }, 5000);
                            mirror6_shown = true;
                            document.getElementById("title_img").src = "./מסודר/SH 028 a.png";
                            setTimeout(() => {
                                inter_water_drop = setInterval(() => {
                                    WDSE.currentTime = 0;
                                    WDSE.play();
                                }, 800);
                            }, 700);
                        }
                        new_text.appendChild(img);
                        //new_text.appendChild(span);
                        WASE.currentTime = 0;
                        WASE.play();
                    }, 2000);
                }
                                    /* -- END OF FIRST PHONE STAGE! -- */


document.getElementById("WAVideo").onended = () => {
    //console.log("FINISHED");
    let div7 = document.getElementById("phone_bubble_div_7");
    add_phone_text_bubble(document.getElementById("phone_before_7_year"),
    "אוי לא!! המזגן התקלקל פה!! <br /> <img id='emoji' class='emoji' src='מסודר/emoji.png'><img id='emoji' class='emoji' src='מסודר/emoji.png'><img id='emoji' class='emoji' src='מסודר/emoji.png'>",
    "7:0",
    "מסודר/SH 001 c.png",
    div7,
    180, 180, 0);
    setTimeout(() => {
        document.getElementById("phone_dying_SE").volume = 0.02;
        let dying_inter = setInterval(() => {
            document.getElementById("phone_dying_SE").currentTime = 0;
            document.getElementById("phone_dying_SE").play();
        }, 2000);
        bleep_battery();
        add_phone_text_bubble(document.getElementById("phone_before_7_year"),
            "אין לי סוללה מה הסיסמא לדלת?",
            "7:1",
            "מסודר/SH 001 c.png",
            div7,
            251, 251, 0);
        div7.style.overflow = "hidden";
        div7.focus();
        let first_drag = true;
        setTimeout(() => {
            add_phone_text_bubble(document.getElementById("phone_before_7_year"),
                "הצילו!! <img id='emoji' class='emoji' src='מסודר/emoji2.png'> <img id='emoji' class='emoji' src='מסודר/emoji2.png'> <img id='emoji' class='emoji' src='מסודר/emoji2.png'>",
                "7:2",
                "מסודר/SH 001 c.png",
                div7,
                +document.getElementById("phone_bubble_span7:1").style.top.split("p")[0] + 71, +document.getElementById("phone_bubble_span7:1").style.top.split("p")[0] +71, 0);
        }, 1600);
        div7.addEventListener("wheel", (e) => {
            let scroll = e.deltaY < 0 ? -5 : 5;
            if(+document.getElementById("phone_bubble_img_7").style.top.split("p")[0] >= 0){
                scroll = Math.max(scroll, 0);
            }
            if(+document.getElementById("phone_bubble_span7:1").style.top.split("p")[0] <= 100){
                scroll = Math.min(scroll, 0);
            }
                if(+document.getElementById("phone_bubble_span7:1").style.top.split("p")[0] <= 180){
                    if(first_drag){
                        first_drag = false;
                        let button = document.createElement("input");
                        button.id = "phone7_button";
                        button.className = "phone7_button";
                        button.type = "button";
                        document.getElementById("phone_before_7_year").appendChild(button);
                        button.onclick = () => {
                            clearInterval(dying_inter);
                            setTimeout(() => {
                                document.getElementById("phone_before_7_year").style.display = "none";
                                change_year();
                                setTimeout(() => {
                                    if(document.getElementById("bleep")){
                                        document.getElementById("phone_before_7_year").removeChild(document.getElementById("bleep"));
                                    }
                                }, 1000);
                            }, 1000);
                        }
                    }
                }
            for(let i = 0; i < div7.childNodes.length; i++){
                if(!div7.childNodes[i].style){
                    continue;
                }
                div7.childNodes[i].style.top = +div7.childNodes[i].style.top.split("p")[0] - scroll + "px";
            }
        })
    }, 800);
    document.getElementById("WAVideo").onended = null;
};

function add_phone_text_bubble(parent, text, id_number, img_src, has_text_bubble = null, img_top = 0, span_top = 0, span_right = 0){
    let WASE = document.getElementById("whatsapp_message_SE");
    WASE.volume = 0.2;
    let new_text;
    if(has_text_bubble != null){
        new_text = has_text_bubble;
    }else{
        new_text = document.createElement("div");
    }
    new_text.id = "text_bubble";
    let bubble_img = document.createElement("img");
    bubble_img.src = img_src;
    bubble_img.className = "phone_bubble_img";
    bubble_img.style.top = img_top + "px";
    new_text.className = "phone_bubble_div";
    new_text.appendChild(bubble_img);
    let span = document.createElement("span");
    span.id = "phone_bubble_span" + id_number;
    span.className = "phone_bubble_span";
    span.innerHTML = text;
    span.style.position = "absolute";
    span.style.top = span_top + "px";
    span.style.right = span_right + "px";
    if(span_top !== 0 || span_right !== 0){
    }
    new_text.appendChild(span);
    parent.appendChild(new_text);
    WASE.currentTime = 0;
    WASE.play();
}

function bleep_battery(){
    let battery = document.createElement("div");
    battery.id = "bleep";
    battery.className = "bleep";
    document.getElementById("phone_before_7_year").appendChild(battery);
}