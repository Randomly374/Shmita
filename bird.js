const bird = document.getElementsByClassName("bird");
        let bird_flag = true;
        let outer_inter = setInterval(() => {
            let index = 0;
            let inner_inter = setInterval(() => {
                if(index++ >= 12){
                    for(let i = 0; i < bird.length; i++){
                    bird.src = "מסודר/SH 046 b.png";
                        bird[i].src = "מסודר/SH 046 b.png";
                        bird[i].style.transform = "scale(1)";
                    }
                    bird_flag = true;
                    clearInterval(inner_inter);
                }else{
                    flap();
                }
            }, 16.66);
        }, 2500);

        const FB = document.getElementById("full_bird");
        if(FB){
            dragElement(FB);
        }

function flap(){
    for(let i = 0; i < bird.length; i++){
        if(bird_flag){
            bird[i].src = "מסודר/SH 046 b.png";
            bird[i].style.transform = "scale(1)";
        }else{
            bird[i].src = "מסודר/SH 046 c.png";
            bird[i].style.transform = "scale(2, 1)";
        }
    }
    bird_flag = !bird_flag;
}