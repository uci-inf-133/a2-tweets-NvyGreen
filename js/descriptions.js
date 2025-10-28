function parseTweets(runkeeper_tweets) {
	//Do not proceed if no tweets loaded
	if(runkeeper_tweets === undefined) {
		window.alert('No tweets returned');
		return;
	}

	//TODO: Filter to just the written tweets
	tweet_array = [];
	for (let raw_tweet of runkeeper_tweets) {
		tweet = new Tweet(raw_tweet.text, raw_tweet.created_at);
		if (tweet.written) {
			tweet_array.push(tweet);
		}
	}

	return tweet_array
}

function addEventHandlerForSearch(tweet_array) {
	//TODO: Search the written tweets as text is entered into the search box, and add them to the table
	document.getElementById('searchText').innerText = '';
	document.getElementById('searchCount').innerText = 0;

	let search_bar = document.getElementById('textFilter');
	search_bar.addEventListener('input', function() {
		document.getElementById('searchText').innerText = this.value;

		let table_rows = "";
		let tweet_count = 0;

		if (this.value != '') {
			for (let tweet of tweet_array) {
				if (tweet.writtenText.includes(this.value)) {
					tweet_count += 1;
					table_rows += tweet.getHTMLTableRow(tweet_count);
				}
			}
		}

		document.getElementById('searchCount').innerText = tweet_count;
		document.getElementById('tweetTable').innerHTML = table_rows;
	});
}

//Wait for the DOM to load
document.addEventListener('DOMContentLoaded', function (event) {
	
	let tweet_array = loadSavedRunkeeperTweets().then(parseTweets);

	tweet_array.then(function(data) {
		addEventHandlerForSearch(data);
	});
});