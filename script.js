
let searchInputEl = document.getElementById("searchInput");
let searchResultsEl = document.getElementById("searchResults");
let spinnerEl = document.getElementById("spinner");

searchInputEl.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {

        let searchValue = searchInputEl.value.trim();

        if (searchValue === "") {
            searchResultsEl.textContent = "Please enter a search keyword.";
            return;
        }

        searchResultsEl.innerHTML = "";
        spinnerEl.classList.remove("d-none");

        let url = "https://apis.ccbp.in/wiki-search?search=" + encodeURIComponent(searchValue);

        fetch(url)
            .then(function(response) {
                if (!response.ok) {
                    throw new Error("Network response was not successful");
                }
                return response.json();
            })
            .then(function(data) {

                spinnerEl.classList.add("d-none");

                let searchResults = data.search_results;

                for (let result of searchResults) {

                    let resultContainerEl = document.createElement("div");
                    resultContainerEl.classList.add("result-item");

                    let titleEl = document.createElement("a");
                    titleEl.textContent = result.title;
                    titleEl.href = result.link;
                    titleEl.target = "_blank";
                    titleEl.rel = "noopener noreferrer";
                    titleEl.classList.add("result-title");

                    let urlEl = document.createElement("a");
                    urlEl.href = result.link;
                    urlEl.textContent = result.link;
                    urlEl.target = "_blank";
                    urlEl.rel = "noopener noreferrer";
                    urlEl.classList.add("result-url");

                    let descriptionEl = document.createElement("p");
                    descriptionEl.textContent = result.description;
                    descriptionEl.classList.add("link-description");

                    resultContainerEl.appendChild(titleEl);
                    resultContainerEl.appendChild(document.createElement("br"));
                    resultContainerEl.appendChild(urlEl);
                    resultContainerEl.appendChild(descriptionEl);

                    searchResultsEl.appendChild(resultContainerEl);
                }
            })
            .catch(function(error) {
                spinnerEl.classList.add("d-none");
                searchResultsEl.textContent = "Something went wrong. Please try again.";
            });
    }
});
