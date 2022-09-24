const cards = document.querySelectorAll(".card");
let matchedCard = 0;
let cardOne;
let cardTwo;
let disableDeck = false;

function flipCard(event) {
    let clickedCard = event.target;
    if (clickedCard !== cardOne && !disableDeck) {
        clickedCard.classList.add("flip");
        if (!cardOne) {
            return cardOne = clickedCard;
        }
        cardTwo = clickedCard;
        disableDeck = true;
        let cardOneImg = cardOne.querySelector("img").src;
        let cardTwoImg = cardTwo.querySelector("img").src;
        matchCards(cardOneImg, cardTwoImg);
    }
};

function matchCards(img1, img2) {
    if(img1 === img2){
        matchedCard++;
        if(matchedCard === 8) {
            setTimeout(() => {
                shuffleCard();
            }, 1000);
        }
        cardOne.removeEventListener("click", flipCard);
        cardTwo.removeEventListener("click", flipCard);
        cardOne = null;
        cardTwo = null;
        disableDeck = false;
        return;
    }

    setTimeout(() => {
        cardOne.classList.add("shake");
        cardTwo.classList.add("shake");
    }, 400);

    setTimeout(() => {
        cardOne.classList.remove("shake", "flip");
        cardTwo.classList.remove("shake", "flip");
        cardOne = null;
        cardTwo = null;
        disableDeck = false;
    }, 1200);
}

function shuffleCard(){
    matchedCard = 0;
    cardOne = null;
    cardTwo = null;
    disableDeck = false;
    let arr = [1, 2, 3, 4, 5, 6, 7, 8, 1, 2, 3, 4, 5, 6, 7, 8];
    arr.sort(() => Math.random() > 0.5 ? 1 : -1);

    cards.forEach((card, index) => {
        card.classList.remove("flip");
        let imgTag = card.querySelector("img");
        imgTag.src=`images/img-${arr[index]}.png`;
        card.addEventListener("click", flipCard);
    });
}


shuffleCard();

cards.forEach(card => {
    card.addEventListener("click", flipCard);
});
