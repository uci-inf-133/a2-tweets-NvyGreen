function parseTweets(runkeeper_tweets) {
	//Do not proceed if no tweets loaded
	if(runkeeper_tweets === undefined) {
		window.alert('No tweets returned');
		return;
	}

	tweet_array = runkeeper_tweets.map(function(tweet) {
		return new Tweet(tweet.text, tweet.created_at);
	});
	
	//This line modifies the DOM, searching for the tag with the numberTweets ID and updating the text.
	//It works correctly, your task is to update the text of the other tags in the HTML file!
	document.getElementById('numberTweets').innerText = tweet_array.length;
	
	// Get categories
	let completed = 0;
	let live = 0;
	let achievement = 0;
	let misc = 0;
	for (let tweet of tweet_array) {
		if (tweet.source == 'completed_event') {
			++completed;
		} else if (tweet.source == 'achievement') {
			++achievement;
		} else if (tweet.source == 'live_event') {
			++live;
		} else {
			++misc;
		}
	}

	let completeNum = document.getElementsByClassName('completedEvents');
	for (let el of completeNum) {
		el.innerText = completed;
	}

	let completePct = document.getElementsByClassName('completedEventsPct');
	let completePer = (completed / tweet_array.length) * 100;
	completePer = completePer.toFixed(2);
	for (let el of completePct) {
		el.innerText = completePer + '%';
	}

	let achieveNum = document.getElementsByClassName('achievements');
	for (let el of achieveNum) {
		el.innerText = achievement;
	}

	let achievePct = document.getElementsByClassName('achievementsPct');
	let achievePer = (achievement / tweet_array.length) * 100;
	achievePer = achievePer.toFixed(2);
	for (let el of achievePct) {
		el.innerText = achievePer + '%';
	}

	let liveNum = document.getElementsByClassName('liveEvents');
	for (let el of liveNum) {
		el.innerText = live;
	}

	let livePct = document.getElementsByClassName('liveEventsPct');
	let livePer = (live /tweet_array.length) * 100;
	livePer = livePer.toFixed(2);
	for (let el of livePct) {
		el.innerText = livePer + '%';
	}

	let miscNum = document.getElementsByClassName('miscellaneous');
	for (let el of miscNum) {
		el.innerText = misc;
	}

	let miscPct = document.getElementsByClassName('miscellaneousPct');
	let miscPer = (misc / tweet_array.length) * 100;
	miscPer = miscPer.toFixed(2);
	for (let el of miscPct) {
		el.innerText = miscPer + '%';
	}
	
	// Get written
	let written = 0;
	for (let tweet of tweet_array) {
		if (tweet.written) {
			++written;
		}
	}

	let writtenNum = document.getElementsByClassName('written');
	for (let el of writtenNum) {
		el.innerText = written;
	}

	let writtenPct = document.getElementsByClassName('writtenPct');
	let writtenPer = (written / completed) * 100;
	writtenPer = writtenPer.toFixed(2);
	for (let el of writtenPct) {
		el.innerText = writtenPer + '%';
	}
}

//Wait for the DOM to load
document.addEventListener('DOMContentLoaded', function (event) {
	loadSavedRunkeeperTweets().then(parseTweets);
});