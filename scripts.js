const search = document.getElementById("search");
const container = document.getElementById("results");
const loader = document.querySelector(".circle");
// var value = search.value;
// const API_URl = ;
const clearResult = document.getElementById("clear");
var dictionary = [];
async function SearchWord(value) {
  try {
    let response = await fetch(
      `https://api.dictionaryapi.dev/api/v2/entries/en/${value}`
    );
    let data = await response.json();
    //   console.log(data[0].meanings);
    return data[0].meanings;
  } catch (error) {
    return null;
  }
}
function showLoader() {
  loader.classList.add("show");
  setTimeout(() => {
    loader.classList.remove("show");
  }, 200);
}
async function displayWords(e) {
  const result_element = document.createElement("div");
  if (e != null) {
    showLoader();

    let results = await SearchWord(e);
    if (results != null) {
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
    } else {
      container.innerHTML = `
      <div class='error'>
      ${e} returned no results
      </div>
      `;
    }
  }
}
console.log("Made by Awwal");

// SearchWord();
window.addEventListener("keydown", (e) => {
  word = e.target.value;
  if (e.keycode === 13 || e.key === "Enter") {
    displayWords(word);
  }
});

clearResult.addEventListener("click", (e) => {
  location.reload();
});
