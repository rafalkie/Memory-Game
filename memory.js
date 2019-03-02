let photos = ['1.png','2.png','3.png','4.png',
             '5.png','6.png','7.png','8.png',
             '1.png','2.png','3.png','4.png',
             '5.png','6.png','7.png','8.png',
            ];
let tabClick = [];
let attempt = 0;
let hit = 0;
let blocked = true;


shuffle(photos);


addClickCart();

function add(nr,photo){
    if(blocked == true){
        let url =`url(img/${photo})`;
        $('#c'+nr).css('background-image',url);
        tabClick.push([nr,photo]);
    }
    check(); 
}
//Sprawdzenie czy kliknieto 2 elementy i wyswietlenie zapisanie wynikow jesli tak
function check(){
    if(tabClick.length == 2){
        blocked = false;
        getAttempt();

        if(tabClick[0][1] == tabClick[1][1]){
            message('dobrze');
            getHit();
            $('#c'+tabClick[0][0]).off('click');
            $('#c'+tabClick[1][0]).off('click');

            $('#c'+tabClick[0][0]).css('visibility','hidden');
            $('#c'+tabClick[1][0]).css('visibility','hidden');

            tabClick = [];
            setTimeout(function() { 
                blocked = true;
            }, 500);
            setTimeout(function() { 
                win();
            }, 900);
         
        }
        else{
            setTimeout(function() { 
                for(let i =0;i<tabClick.length;i++){
                    $('#c'+tabClick[i][0]).css('background-image',"url('img/card.png')");
                }
                tabClick = [];
                blocked = true;
            },500);
        }
    }
}
//Wyświetla wiadomość czy trafiono w obrazek
function message(message =''){
    $('#message').html(message);
    $('#message').css('display',"block");
    setTimeout(function() { 
        $('#message').css('display',"none");
    }, 800);
}
//wyświetla liczbe prob
function getAttempt(){
    attempt++;
    $('#attempt').html(`Attempt: ${attempt}`);
}
//wyświetla liczbe trafionych
function getHit(){
    hit++;
    $('#hit').html(`Hit: ${hit}`);
}
///wyświetla zakończenie
function win(){
    if(hit == photos.length/2){
        $('#message').css('display',"block");
        $('#message').html("Brawo udało Co się dopasować wszystkie obrazki");
        $('#win').css('display',"block");
        $('.board').css('visibility','hidden');
        $('#win').on("click", function(){
            location.reload();

        });
        console.log(tabClick);

    }
}
function addClickCart(){
    for(let i =0;i<photos.length;i++){
        $('#c'+i).on("click", function(){
            add(i,photos[i]);
        });
    }
}
function shuffle(a) {
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}
