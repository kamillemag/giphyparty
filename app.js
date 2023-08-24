// console.log("Let's get this party started!");

// const form = document.querySelector('#gifSearch');
// const button = document.querySelector('#searchButton');
// const input = document.querySelector('#search');
// const gif = document.querySelector('#gif');
// const post = document.querySelector('#gifsPostArea');


//  form.addEventListener('submit', function(evt){
//     evt.preventDefault();
//     let searchTerm = input.value 

//     input.value = "";

//     const res =   axios.get("http://api.giphy.com/v1/gifs/search", {
//         params: {
//             q: searchTerm,
//             api_key: "mCJOl25C5mQMCGXq3EjCZ0a4A3ZHBmyJ"
//         }
//     });
//     addGif(res.data);
// })

// function addGif(res){
//     let results = res.data.length;
//     if(results){
//         let random = Math.floor(Math.random() * results);
//         gif.src = res.data[random].images.original.url
//     }

// }

const $gifArea = $("#gif-area");
const $searchInput = $("#search");

/* use ajax result to add a gif */

function addGif(res) {
  let numResults = res.data.length;
  if (numResults) {
    let randomIdx = Math.floor(Math.random() * numResults);
    let $newCol = $("<div>", { class: "col-md-4 col-12 mb-4" });
    let $newGif = $("<img>", {
      src: res.data[randomIdx].images.original.url,
      class: "w-100"
    });
    $newCol.append($newGif);
    $gifArea.append($newCol);
  }
}

/* handle form submission: clear search box & make ajax call */

$("form").on("submit", async function(evt) {
  evt.preventDefault();

  let searchTerm = $searchInput.val();
  $searchInput.val("");

  const response = await axios.get("http://api.giphy.com/v1/gifs/search", {
    params: {
      q: searchTerm,
      api_key: "mCJOl25C5mQMCGXq3EjCZ0a4A3ZHBmyJ"
    }
  });
  addGif(response.data);
});

/* remove gif */

$("#remove").on("click", function() {
  $gifArea.empty();
});