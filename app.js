// add variables for the parameters that will be specified when using the search endpoint
const limit = 9; // number of obkects to return
const rating = "g"; //ratings for the gift uploaded to meet the needs of certain populations
const API_KEY = 'nOjzgnRK5wSxGHruvjd3HVSux7Zxk46H'


/**
 * QUERY SELECTORS VARIABLES GO HERE
 */
let gifForm = document.querySelector("form");
let inputButton = document.querySelector("#textInput");
let submitButtn = document.querySelector("#submitButton");
let resultGif = document.querySelector("#gifResults");
let buttonMore = document.querySelector("#show-more");

let currPage = 0;
let offset = 0; // keep track of the offset value when making a fetch call

// buttonMore.style.display = 'none';

gifForm.addEventListener("submit",handleSubmit);
buttonMore.addEventListener("click",showMore);


// submitButtn.addEventListener('click', (e) => {
//     getResults(evt.target.giphyparty.value);
//  })

function handleSubmit(evt) {
    evt.preventDefault();
    if (!buttonMore.classList.contains("hidden")) {
        buttonMore.classList.add("hidden");
    }
    
    getResults(evt);
    
    // gifForm.target.searchTerm.value = "";
}
// get results from the API
// this method should use the fetch method with your custom http request, then 
// convert the response to a JSOn
// Object and finally return the data of the response
async function getResults(evt) {
    

    let apiUrl = `http://api.giphy.com/v1/gifs/search?api_key=${API_KEY}&q=${evt.target.giphyparty.value}&limit=${limit}&rating=${rating}`
    let response = await fetch(apiUrl);
    let responseData = await response.json();
    
    // console.log("response data: ", responseData);
    displayResults(responseData.data);
}

function displayResults(responseData) {
    responseData.forEach((element) => {
        // inject a new img element where the src is equal to the url of the gif
        resultGif.innerHTML += `
        <img src="${element.images.original.url}" />
        `;
    });
    buttonMore.classList.remove("hidden");
}

// handle the show more button
// the function should call the getresults function with the same search term, then call displayResults &
// increment the page number as well
function showMore(evt) {

    currPage+=1;
    offset = limit * currPage;
    buttonMore.classList.add("hidden");
    // evt.preventDefault();

    getResults(evt);
}
