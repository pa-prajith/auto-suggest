const search = document.querySelector("#search");
const searchSuggestion = document.querySelector(".search__suggestion");
const endpoint = "https://breakingbadapi.com/api/characters?name=";

function Loader(loading) {
  const inputBox = document.querySelector(".input__box");
  inputBox.classList.remove("loader");
  if (loading) {
    inputBox.classList.add("loader");
  }
}

function GetData() {
  const data = [];
  if (this.value.length) {
    Loader(true);
    fetch(`${endpoint}${this.value}`)
      .then((blob) => blob.json())
      .then((response) => {
        data.push(...response);
        DisplayData(data);
        Loader(false);
      })
      .catch((err) => {
        console.log(err);
        Loader(false);
      });
  } else {
    searchSuggestion.innerHTML = "";
  }
}

function DisplayData(data) {
  let htmlContent = "";
  if (data.length > 0) {
    htmlContent = data
      .map((item) => {
        return `
            <li>
            <span class="list-item">${item.name}</span>
          </li> 
            `;
      })
      .join(" ");
  } else {
    htmlContent = "<li class='center'>OOPs, no data</li>";
  }
  searchSuggestion.innerHTML = htmlContent;
}

function SetValue(e) {
  if (e.target.className === "list-item") {
    search.value = e.target.textContent;
    searchSuggestion.innerHTML = "";
  }
}

search.addEventListener("keyup", GetData);
searchSuggestion.addEventListener("click", SetValue);
