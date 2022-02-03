let resultAreaDom = document.getElementById("resultArea");
let inputNumDom = document.getElementById("inputNum");
let goBtnDom = document.getElementById("goBtn");
let resetBtnDom = document.getElementById("resetBtn");
let lifeAreaDom = document.getElementById("lifeArea");
let ranNum = 0; //전역 변수로 하지 않으면 다른 함수가 못받음-pickRandomNum을 부모함수(?)로 바꾸면 될것같다만 코드가 간단해 충돌날 요소가 없어서 두었다.
let life = 5; //목숨 변수
let usedNum = []; //사용된 값 저장
let gameOver = false; //게임오버 판단

//클릭 이벤트(함수를 합칠순 있지만 연습이니까 분리해보았다)
goBtnDom.addEventListener("click" , playGame);
resetBtnDom.addEventListener("click" , resetGame);
inputNumDom.addEventListener("focus",()=>{inputNumDom.value=null});

function pickRandomNum(){
//1~100사이의 변수 획득
    ranNum = Math.floor(Math.random()*100)+1;
    console.log("정답은 : " , ranNum , "  현재 목숨은 : " , life);
}

function playGame(){
//input의 Value값을 변수로 저장
    let inputValue = inputNumDom.value;
//값의 유효성검사(범위)
    if(inputValue > 100 || inputValue < 1){
        resultAreaDom.textContent = "1~100사이의 값을 넣어주세요!!";
        return;
    }
//값의 유효성 저장(Used Number)
    if(usedNum.includes(inputValue)){
        resultAreaDom.textContent = "이미 입력한 값입니다";
        return;
    }
//게임 정상실행 로직
    life--;
    lifeAreaDom.textContent = `남은 목숨은 : ${life}`;

    if(inputValue < ranNum){
        resultAreaDom.textContent = "UP";
    }else if(inputValue > ranNum){
        resultAreaDom.textContent = "DOWN";
    }else if(inputValue == ranNum){
        resultAreaDom.textContent = "정답입니다";
        gameOver=true;
    }
//이미 사용된 값 저장
    usedNum.push(inputValue);
    console.log(usedNum);

//게임오버 처리
    if(life < 1){
        gameOver = true;
    }
    if(gameOver === true){
    goBtnDom.disabled=true;
    }

    console.log("정답은 : " , ranNum , "  현재 목숨은 : " , life);
}

function resetGame(){
//변수 초기화 / 게임 UI초기화
    gameOver = false;
    life = 5;
    resultAreaDom.textContent = "1~100중 정답은?";
    lifeAreaDom.textContent = `남은 목숨은 : ${life}`;
    inputNumDom.value = null;
    goBtnDom.disabled=false;
    usedNum = []
    pickRandomNum();
}

pickRandomNum();