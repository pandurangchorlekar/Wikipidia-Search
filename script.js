let searchInputEl = document.getElementById("searchInput");
let searchResultsEl = document.getElementById("searchResults");
let spinnerEl = document.getElementById("spinner");

searchInputEl.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {

        searchResultsEl.innerHTML = "";

        spinnerEl.classList.remove("d-none");

        let searchValue = searchInputEl.value;

        let url = "https://apis.ccbp.in/wiki-search?search=" + searchValue;

        fetch(url)
            .then(function(response) {
                return response.json();
            })
            .then(function(data) {

                spinnerEl.classList.add("d-none");

                let searchResults = data.search_results;

                for (let result of searchResults) {

                    let resultContainerEl = document.createElement("div");
                    resultContainerEl.classList.add("result-item");

                    // Title
                    let titleEl = document.createElement("a");
                    titleEl.textContent = result.title;
                    titleEl.href = result.link;
                    titleEl.target = "_blank";
                    titleEl.classList.add("result-title");

                    // URL
                    let urlEl = document.createElement("a");
                    urlEl.href = result.link;
                    urlEl.textContent = result.link;
                    urlEl.target = "_blank";
                    urlEl.classList.add("result-url");

                    // Description
                    let descriptionEl = document.createElement("p");
                    descriptionEl.textContent = result.description;
                    descriptionEl.classList.add("link-description");

                    // Append elements
                    resultContainerEl.appendChild(titleEl);
                    resultContainerEl.appendChild(document.createElement("br"));
                    resultContainerEl.appendChild(urlEl);
                    resultContainerEl.appendChild(descriptionEl);

                    searchResultsEl.appendChild(resultContainerEl);
                }
            })
            .catch(function(error) {
                spinnerEl.classList.add("d-none");
                searchResultsEl.textContent = "Something went wrong!";
            });
    }
});