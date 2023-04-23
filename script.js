let resultsContainer = document.getElementsByClassName("container")[0];

const validateInput = (el) => {
  console.log(el); // input field
  console.log(el.value); // input field value
  if (!el.value) {
    resultsContainer.innerHTML =
      "<p>Type something in the above search input</p>";
    resultsContainer.style.color = "red";
  } else {
    generateResults(el.value, el);
  }
};

const generateResults = (searchValue, inputField) => {
  fetch(
    "https://en.wikipedia.org/w/api.php?action=query&list=search&prop=info&inprop=url&utf8=&format=json&origin=*&srlimit=20&srsearch=" +
      searchValue
  )
    .then((response) => response.json())
    .then((data) => {
      let results = data.query.search;
      console.log(results); // array of objects of results from the search in wikipedia
      let numberOfResults = data.query.search.length;
      console.log(numberOfResults);
      resultsContainer.innerHTML = "";
      for (let i = 0; i < numberOfResults; i++) {
        let result = document.createElement("div");
        result.classList.add("results");
        result.innerHTML = `
            <div>
                <h3>${results[i].title}</h3>
                <p>${results[i].snippet}</p>
            </div>
            <a href="https://en.wikipedia.org/?curid=${results[i].pageid}" target="_blank">Read More</a>
            `;
        resultsContainer.appendChild(result);
      }
      if (!inputField.value) {
        resultsContainer.innerHTML =
          "<p>Type something in the above search input</p>";
        resultsContainer.style.color = "red";
      }
    });
};

//using debounce function to limit the number of times the api is called
const debounceFunc = (func, delay = 500) => {
  let timer;
  return (...args) => {
    console.log(args);
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      func.apply(null, args);
    }, delay);
  };
};

const debounceValidateInput = debounceFunc(validateInput, 1000);
