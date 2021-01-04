window.addEventListener('load', function() {
        
    const quoteContainer = document.getElementById('quote-container');
    const quote = document.getElementById('quote');
    const author = document.getElementById('author');
    const twitterButton = document.getElementById('twitterButton');
    const newQuoteButton = document.getElementById('new-quote-button');
    
    // Get quote from API
    async function getQuote() {
        const proxyURL = 'https://cors-anywhere.herokuapp.com/'
        const apiURL = 'http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json';
        try {
            
            const response = await fetch(proxyURL + apiURL);
            const data = await response.json();

            // If author is blank set text as 'Unknown'
            data.quoteAuthor === '' ? author.innerText = 'Unknown' : author.innerText = data.quoteQuthor;
            
            // Reduce font size for long quotes
            data.quoteText.length > 50 ? quote.classList.add('long-quote') : quote.classList.remove('long-cuote');

            // Set quote text
            quote.innerText = data.quoteText;

            console.log(data);

        } catch (error) {

            // getQuote();
        
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
    newQuoteButton.addEventListener('click', getQuote);

    twitterButton.addEventListener('click', tweetQuote);


    // On Load
    getQuote();



})
