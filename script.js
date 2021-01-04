window.addEventListener('load', function() {
        
    const quoteContainer = document.getElementById('quote-container');
    const quote = document.getElementById('quote');
    const author = document.getElementById('author');
    const twitterButton = document.getElementById('twitterButton');
    const newQuoteButton = document.getElementById('new-quote-button');
    const quoteTextContainer = document.getElementById('quote-text-container')
    const errorTextContainer = document.getElementById('error-text-container')
    const buttonContainer = document.getElementById('button-container')
    const loader = document.getElementById('loader');


    function resetQuoteContainerToDefault()
    {
        quoteTextContainer.hidden = false;
        errorTextContainer.hidden = true
        twitterButton.hidden = false;
        buttonContainer.classList.remove('single-button-layout')
        newQuoteButton.innerText = 'Try New Quote'
    }

    function showLoadingSpinner() {
        loader.hidden = false;
        quoteContainer.hidden = true;
    }

    function removeLoadingSpinner() {
        if (!loader.hidden) {
            quoteContainer.hidden = false;
            loader.hidden = true;
        }
    }

    function showErrorMessage() {
        quoteTextContainer.hidden = true;
        errorTextContainer.hidden = false;
        twitterButton.hidden = true;
        buttonContainer.classList.add('single-button-layout')
        newQuoteButton.innerText = 'Try Again'
    }


    async function getQuoteFromAPI() {

        showLoadingSpinner();

        resetQuoteContainerToDefault();
        
        const proxyURL = 'https://cors-anywhere.herokuapp.com/';
        const apiURL = 'http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json';

        try {
            
            const response = await fetch(proxyURL + apiURL);
            const data = await response.json();

            // If author is blank set text as 'Unknown'
            data.quoteAuthor === '' ? author.innerText = 'Unknown' : author.innerText = data.quoteAuthor;
            
            // Reduce font size for long quotes
            data.quoteText.length > 50 ? quote.classList.add('long-quote') : quote.classList.remove('long-cuote');

            // Set quote text
            quote.innerText = data.quoteText;

            console.log(data);

            removeLoadingSpinner();

        } catch (error) {

            removeLoadingSpinner();

            showErrorMessage();
        
        }

    } // end of getQuote method


    // Tweet Quote
    function tweetQuote() {
        const quote = document.getElementById('quote').innerText;
        const author = document.getElementById('author').innerText;

        const twitterURL = `https://twitter.com/intent/tweet?text=${quote} - ${author}`;

        window.open(twitterURL, '_blank');

    } // end of tweetQuote method


    // Event Listeners
    newQuoteButton.addEventListener('click', getQuoteFromAPI);

    twitterButton.addEventListener('click', tweetQuote);


    // On Load
    getQuoteFromAPI();


});
