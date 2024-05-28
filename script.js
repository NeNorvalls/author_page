const authorContainer = document.getElementById("author-container");
const loadMoreBtn = document.getElementById("load-more-btn");

let startingIndex = 0;
let endingIndex = 8;
let authorDataArr = [];

fetch("https://cdn.freecodecamp.org/curriculum/news-author-page/authors.json")
  .then((res) => res.json())
  .then((data) => {
    authorDataArr = data;
    displayAuthors(authorDataArr.slice(startingIndex, endingIndex));
  })
  .catch((err) => {
    authorContainer.innerHTML =
      '<p class="error-msg">There was an error loading the authors</p>';
  });

const fetchMoreAuthors = () => {
  startingIndex += 8;
  endingIndex += 8;

  displayAuthors(authorDataArr.slice(startingIndex, endingIndex));
  if (authorDataArr.length <= endingIndex) {
    loadMoreBtn.disabled = true;

    loadMoreBtn.textContent = "No more data to load";
  }
};

const displayAuthors = (authors) => {
  authors.forEach(({ author, image, url, bio }, index) => {
    authorContainer.innerHTML += `
    <div id="${index}" class="user-card">
      <h2 class="author-name">${author}</h2>
      <img class="user-img" src="${image}" alt="${author} avatar">
      <div class="purple-divider"></div>
      <p class="bio">${bio.length > 50 ? bio.slice(0, 50) + "..." : bio}</p>
      <a class="author-link" href="${url}" target="_blank">${author} author page</a>
    </div>
  `;
  });
};

loadMoreBtn.addEventListener("click", fetchMoreAuthors);

// Coding Explanation:

// Author Container Element:
// Retrieves the HTML element with the id "author-container" to dynamically display author information.

// Load More Button Element:
// Retrieves the HTML button element with the id "load-more-btn" to trigger the loading of additional authors.

// Variables Initialization:
// Declares variables to store starting and ending indices for slicing author data, and an array to hold author data fetched from an external JSON file.

// Fetch Author Data:
// Fetches author data from an external JSON file using the fetch API.
// Converts the response to JSON format.
// Stores the author data in the "authorDataArr" array and displays the initial set of authors.

// Error Handling:
// Displays an error message if there is an error loading the authors.

// Fetch More Authors Function:
// Increases the starting and ending indices to load more authors.
// Displays the newly fetched authors and disables the "Load More" button if all authors have been loaded.

// Display Authors Function:
// Dynamically generates HTML elements to display author information.
// Iterates over the provided authors array and creates a user card for each author.

// Load More Button Event Listener:
// Listens for a click event on the "Load More" button and calls the fetchMoreAuthors function to load additional authors.


