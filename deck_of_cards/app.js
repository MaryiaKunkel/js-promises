let drawCardUrl = `https://deckofcardsapi.com/api/deck/new/draw/?count=1`;
let shuffleCardsUrl = `https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1`;

axios
  .get(drawCardUrl)
  .then((res) => {
    console.log(
      `The first card is ${res.data.cards[0].value} of ${res.data.cards[0].suit}`
    );
  })
  .catch((err) => console.log("REJECTED!!!", err))
  .then(() => {
    return axios.get(shuffleCardsUrl);
  })
  .then((res) => {
    let cardId = res.data.deck_id;
    let drawCardWithIdUrl = `https://deckofcardsapi.com/api/deck/${cardId}/draw/?count=1`;
    return axios.get(drawCardWithIdUrl);
  })
  .then((res) => {
    console.log(
      `The second card is ${res.data.cards[0].value} of ${res.data.cards[0].suit}`
    );
  });


let newDeckUrl = "https://deckofcardsapi.com/api/deck/new/";
let cardUrl=''

function initializeDeck() {
  axios.get(newDeckUrl)
  .then((res) => {
    let deckId = res.data.deck_id
    cardUrl = `https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=1`
  })
}

function drawCard() {
  axios.get(cardUrl)
    .then(res => {
      let cardImg = res.data.cards[0].image;
      $("#deck_of_cards").append(`<img class="card_img" src="${cardImg}" style="width: 100px;"/>`);
    })
  }


$("#draw_card").submit(function (event) {
  event.preventDefault();
  drawCard()
})
initializeDeck()
