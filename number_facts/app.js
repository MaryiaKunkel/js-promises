let arr = [];
$(document).ready(function () {
  $("#number_form").submit(function (event) {
    event.preventDefault();

    let favoriteNumber = $("#number_input").val();
    if (favoriteNumber.indexOf(" ") === -1) {
      let url = `http://numbersapi.com/${favoriteNumber}?json`;
      axios
        .get(url)
        .then((res) => {
          $("#number_fact").empty();
          // $("#number_fact").text(res.data.text);
          return axios.get(res.data.text);
        })
        .catch((err) => console.log("REJECTED!!!", err));

      let fourFacts = [];

      for (let i = 0; i < 4; i++) {
        fourFacts.push(
          axios.get(`http://numbersapi.com/${favoriteNumber}?json`)
        );
      }

      Promise.all(fourFacts)
        .then((facts) => {
          for (let res of facts) {
            $("#number_fact").append(`<p>${res.data.text}</p>`);
          }
        })
        .catch((err) => console.log(err));
    } else {
      arr = favoriteNumber.split(" ");
      $("#number_fact").empty();
      for (let i = 0; i < arr.length; i++) {
        let url = `http://numbersapi.com/${arr}?json`;
        axios
          .get(url)
          .then((res) => {
            let val = parseInt(arr[i]);

            $("#number_fact").append(`<p>${res.data[val]}</p>`);
            return axios.get(res.data.text);
          })
          .catch((err) => console.log("REJECTED!!!", err));
      }
    }
  });
});
