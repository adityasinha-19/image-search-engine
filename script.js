const access_key = "EnL9IxKMREq4YhxC53eUpiL2psN3rgYCCS2G6KaSwDs";
const searchForm = document.getElementById("search-form");
const searchBox = document.getElementById("search-box");
const searchResult = document.getElementById("search-result");
const showMoreBtn = document.getElementById("show-more-btn");

let keyword = "";
let pageNo = 1;

async function searchImages() {
  keyword = searchBox.value;
  const url = `https://api.unsplash.com/search/photos?page=${pageNo}&query=${keyword}&client_id=${access_key}&per_page=12`;
  
  const response = await fetch(url);
  const data = await response.json();
  console.log(data);
  
  if (pageNo === 1) {
    searchResult.innerHTML = "";
  }

  const results = data.results;

  results.map((result) => {
    const image = document.createElement("img");
    image.src = result.urls.small;
    const imageLink = document.createElement("a");
    imageLink.href = result.links.html;
    imageLink.target = "_blank";

    imageLink.appendChild(image);
    searchResult.appendChild(imageLink);
  });

  showMoreBtn.style.display = "block";
}

searchForm.addEventListener("submit", (e) => {
  e.preventDefault();
  pageNo = 1;
  searchImages();
});

showMoreBtn.addEventListener("click", () => {
  pageNo++;
  searchImages();
});
