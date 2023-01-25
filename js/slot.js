let reel1,reel2,reel3,reReel1,reReel2,reReel3,st,counter,result;

//通常時は0、確率変動時は1
let mode = 0;

const coin = 20 * 3;
const bigBonus = 2500;

const zugara = ["🤡","🍋","🍒","🍇","🍘","😀",
                "<spam style='color:red;font-weight:bold'>7</spam>"];

//キーボード周りの処理
//fで着火、rでリセット
document.addEventListener("keydown",function(event){
    if(event.key == "f"){
        fire();
    }else if(event.key == "r"){
        reset();
    }
});

//乱数発生関数
function getRnd( min, max ) {
    let random = Math.floor( Math.random() * (max + 1 - min) ) + min; 
    return random;
}

//メインの関数
//着火されるとまずこれが呼び出される
//mode変数が0か1かでモード先が変わる
function fire(){
    //回転させる際の挙動
    //1クレジット(20*3円)で回している
    result = document.getElementById("result");
    result.innerHTML = parseInt(result.innerHTML) - coin;

    //通常時
    if(mode == 0){
        reel1 = document.getElementById("reel1");
        reel2 = document.getElementById("reel2");
        reel3 = document.getElementById("reel3");
        reReel1 = getRnd(1,7);
        reReel2 = getRnd(1,7);
        reReel3 = getRnd(1,7);
        reel1.innerHTML = zugara[reReel1 - 1];
        reel2.innerHTML = zugara[reReel2 - 1];
        reel3.innerHTML = zugara[reReel3 - 1];

        //counterの挙動
        //1回転ごとに1増えて大当たりもしくはリセットで0に戻る
        counter = document.getElementById("counter");
        counter.innerHTML = parseInt(counter.innerHTML) + 1;

        if(reReel1 == reReel2 && reReel1 == reReel3){
            bonus();
            reset();
            //大当たり後確率変動するためmode=1にする
            //ST突入するのでstに10+1を代入
            mode = 1;
            st = 11;

            //確変突入するので確変時の背景色に変更
            bgColorSwitch(mode);
        }

    //確変時
    }else if(mode == 1){
        //確変スペック:1/7 ST10+1回転 継続率約82%
        let kakuhen = getRnd(1,7);
        
        counter = document.getElementById("counter");
        counter.innerHTML = parseInt(counter.innerHTML) + 1;

        //確変中大当たりした場合の挙動
        if(kakuhen == 1){
            //7揃え
            reel1.innerHTML = zugara[7 - 1];
            reel2.innerHTML = zugara[7 - 1];
            reel3.innerHTML = zugara[7 - 1];

            bonus();
            reset();

            //ST回復
            st = 11;

        //確変中外れた場合の挙動
        }else{
            //外れなので図柄は揃わないように調整
            reel1 = document.getElementById("reel1");
            reel2 = document.getElementById("reel2");
            reel3 = document.getElementById("reel3");
            reReel1 = getRnd(1,7);
            reReel2 = getRnd(1,7);
            reReel3 = getRnd(1,7);
            
            //外れなのに図柄揃いしそうになったら揃わなくなるまで乱数を回す
            while(reReel1 == reReel2 && reReel2 == reReel3){
                reel1 = document.getElementById("reel1");
                reel2 = document.getElementById("reel2");
                reel3 = document.getElementById("reel3");
                reReel1 = getRnd(1,7);
                reReel2 = getRnd(1,7);
                reReel3 = getRnd(1,7);
            }

            reel1.innerHTML = zugara[reReel1 - 1];
            reel2.innerHTML = zugara[reReel2 - 1];
            reel3.innerHTML = zugara[reReel3 - 1];
        }

        //stが0だったら確変終了なのでmode=0にし通常時に戻る
        //通常時に戻るので背景色も通常に戻る
        if(st == 0){
            mode = 0;
            bgColorSwitch(mode);
        }

        //ST回数減少
        st--;
    }
}

//大当たり関数
//alertで大当たりを告知しtextareaに大当たり時の回転数を書き込む
function bonus(){
    alert("big bonus");
    result.innerHTML = parseInt(result.innerHTML) + bigBonus;
    let hisList = document.getElementById("hisList");
    hisList.value = parseInt(counter.innerHTML) + "回転目\n" + hisList.value;
    
}

//リセット関数
//counterの表記をリセットして0に戻す
function reset(){
    counter = document.getElementById("counter");
    counter.innerHTML = 0;
}

//通常時、確変時で背景の色を変えるための関数
function bgColorSwitch(mode){
    let bg = document.getElementById("main");
    if(mode == 0){
        //通常時
        bg.style.backgroundColor = "#26C6DA";
    }else{
        //確変時
        bg.style.backgroundColor = "#FFAB00";
    }
}