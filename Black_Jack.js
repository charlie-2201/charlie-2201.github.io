let sum1 = 0, sum2 = 0, sum3 = 0, sum4 = 0,cnt=1;
let draw=0,pdraw=1;
let deckid,card_val;
let betp1name, betp2name, betp3name, betp4name, balp1name, balp2name, balp3name, balp4name;
let betp1, betp2, betp3, betp4, balp1, balp2, balp3, balp4;

betp1 = document.getElementById('bet1');
betp2 = document.getElementById('bet2');
betp3 = document.getElementById('bet3');
betp4 = document.getElementById('bet4');


balp1 = document.getElementById('bal1');
balp2 = document.getElementById('bal2');
balp3 = document.getElementById('bal3');
balp4 = document.getElementById('bal4');

betp1name = document.getElementById('bet1name');
betp2name = document.getElementById('bet2name');
betp3name = document.getElementById('bet3name');

balp1name = document.getElementById('bal1name');
balp2name = document.getElementById('bal2name');
balp3name = document.getElementById('bal3name');


let cards
function loadcardn(draw, pdraw) {
    if (draw == 1 && pdraw == 1) {
        axios.get(`https://deckofcardsapi.com/api/deck/new/draw/?count=1`, {
        })
            .then((response) => {
                cards = response.data.cards
                document.getElementById(`p${pdraw}image${draw}`).src = `${cards[0].image}`
                deckid = response.data.deck_id
                card_val = response.data.cards[0].value;
                card_val = get_cardvalue(card_val);
                sum1 += parseInt(card_val);
            })

    }
    else {

        axios.get(`https://deckofcardsapi.com/api/deck/${deckid}/draw/?count=1`, {})
            .then((response) => {
                let cards = response.data.cards
                card_val = response.data.cards[0].value;
                card_val = get_cardvalue(card_val);
                if (pdraw == 1) {
                    sum1 += parseInt(card_val);
                }
                else if (pdraw == 2) {
                    sum2 += parseInt(card_val);
                }
                else if (pdraw == 3) {
                    sum3 += parseInt(card_val);
                }
                else if (pdraw == 4) {
                    sum4 += parseInt(card_val);
                }
                document.getElementById(`p${pdraw}image${draw}`).src = `${cards[0].image}`
            })
    }
}



function get_cardvalue(a) {
    if (a == 'ACE')
        return 1;
    else if (a == 'QUEEN' || a == 'KING' || a == 'JACK')
        return 11;
    else
        return a;
}

function Savechanges() {
    let p1 = document.getElementById('Player1name').value;
    let p2 = document.getElementById('Player2name').value;
    let p3 = document.getElementById('Player3name').value;


    betp1name.innerText = p1;
    betp2name.innerText = p2;
    betp3name.innerText = p3;

    balp1name.innerText = p1;
    balp2name.innerText = p2;
    balp3name.innerText = p3;

    document.getElementById('p1onpage').innerText = p1.toUpperCase();
    document.getElementById('p2onpage').innerText = p2.toUpperCase();
    document.getElementById('p3onpage').innerText = p3.toUpperCase();
}


function person(a, b) {

    if (a == "add") {
        let balp = 0;
        let player = document.getElementById(`bet${cnt}`);
        balp = document.getElementById(`bal${cnt}`).innerText;
        if (parseInt(player.innerText) + b <= balp) { player.innerText = parseInt(player.innerText) + b; }
    }
    if (a == "sub") {
        let player = document.getElementById(`bet${cnt}`);
        if (parseInt(player.innerText) - b >= 0) {
            player.innerText = parseInt(player.innerText) - b;
        }
    }

}

function add100() {
    person("add", 100);
}
function add200() {
    person("add", 200);
}
function add500() {
    person("add", 500);
}
function add1000() {
    person("add", 1000);
}

function sub100() {
    person("sub", 100);
}
function sub200() {
    person("sub", 200);
}
function sub500() {
    person("sub", 500);
}
function sub1000() {
    person("sub", 1000);
}

function dn() {
    if (cnt == 3) {
        betp4.innerText = parseInt(betp1.innerText) + parseInt(betp2.innerText) + parseInt(betp3.innerText);
        hit()
    }
    cnt = cnt + 1;
    if (cnt == 5) {
        cnt = 1;
    }
}

function hit() {
    draw++;
    if (draw <= 4)
        deal()
    else {
        stand()
    }
}
function stand() {
    pdraw++;
    if (pdraw == 5) {
        compare();
        leaderboards();
    }
    draw = 0;
    if (pdraw != 1)
        hit()
}
function deal() {
    loadcardn(draw, pdraw)
}

function compare() {
    if (sum1 > 21)
        sum1 = 0;
    if (sum2 > 21)
        sum2 = 0;
    if (sum3 > 21)
        sum3 = 0;
    if (sum4 > 21)
        sum4 = 0;
    if (sum1 > sum4) {
        balp1.innerText = parseInt(balp1.innerText) + parseInt(betp1.innerText);
        betp1.innerText = 0;
    }
    else {
        balp1.innerText = parseInt(balp1.innerText) - parseInt(betp1.innerText);
        betp1.innerText = 0;
    }
    if (sum2 > sum4) {
        balp2.innerText = parseInt(balp2.innerText) + parseInt(betp2.innerText);
        betp2.innerText = 0;
    }
    else {
        balp2.innerText = parseInt(balp2.innerText) - parseInt(betp2.innerText);
        betp2.innerText = 0;
    }
    if (sum3 > sum4) {
        balp3.innerText = parseInt(balp3.innerText) + parseInt(betp3.innerText);
        betp3.innerText = 0;
    }
    else {
        balp3.innerText = parseInt(balp3.innerText) - parseInt(betp3.innerText);
        betp3.innerText = 0;
    }
    //Round complete, Initialize
    sum1=0,sum2=0,sum3=0,sum4=0
    betp4.innerText = 0;
    pdraw = 1;
    draw = 1;
    cnt = 1;
    for (i = 1; i <= 4; i++) {
        for (j = 1; j <= 4; j++) {
            document.getElementById(`p${i}image${j}`).src = `Card_Back.jpg`
        }
    }

}

function leaderboards() {
    arr = [[parseInt(balp1.innerText), balp1name.innerText], [parseInt(balp2.innerText), balp2name.innerText], [parseInt(balp3.innerText), balp3name.innerText]];
    arr.sort(function mycompare(a, b) {
        return b[0] - a[0]
    });
}
