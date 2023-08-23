const search = document.getElementById("search");
const container = document.getElementById("results");
// var value = search.value;
// const API_URl = ;
var dictionary = [];
async function SearchWord(value) {
  let response = await fetch(
    `https://api.dictionaryapi.dev/api/v2/entries/en/${value}`
  );
  let data = await response.json();
  //   console.log(data[0].meanings);
  return data[0].meanings;
}

async function displayWords(e) {
  const result_element = document.createElement("div");
  if (e != null) {
    let results = await SearchWord(e);
    for (let i in results) {
      const result_element = document.createElement("div");
      result_element.classList.add("result");
      results.forEach((meaning) => {
        result_element.innerHTML = `
        <p class="partOfSpeech">
            ${results[i].partOfSpeech}
        </p>
        <p class="meaning" id="meaning">
          ${results[i].definitions[0].definition}
        </p>
        `;
        container.appendChild(result_element);
      });
    }
  }
}
alert("Made by Awwal");

// SearchWord();
window.addEventListener("keydown", (e) => {
  word = e.target.value;
  if (e.keycode === 13 || e.key === "Enter") {
    displayWords(word);
  }
  if (word == "") {
    location.reload();
  }
});
