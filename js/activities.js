function parseTweets(runkeeper_tweets) {
	//Do not proceed if no tweets loaded
	if(runkeeper_tweets === undefined) {
		window.alert('No tweets returned');
		return;
	}
	
	tweet_array = runkeeper_tweets.map(function(tweet) {
		return new Tweet(tweet.text, tweet.created_at);
	});

	//TODO: create a new array or manipulate tweet_array to create a graph of the number of tweets containing each type of activity.
	let activity_array = [];
	for (let tweet of tweet_array) {
		if (tweet.activityType != "unknown") {
			let activity_obj = activity_array.find(item => item.activity == tweet.activityType);
			if (activity_obj) {
				activity_obj.tweets += 1;
				activity_obj.distance += tweet.distance;
			} else {
				activity_array.push(
					{
						"activity": tweet.activityType,
						"distance": tweet.distance,
						"tweets": 1
					}
				);
			}
		}
	}

	activity_vis_spec = {
	  "$schema": "https://vega.github.io/schema/vega-lite/v5.json",
	  "description": "A graph of the number of Tweets containing each type of activity.",
	  "data": {
	    "values": activity_array
	  },
	  //TODO: Add mark and encoding
	  "mark": "bar",
	  "encoding": {
		"x": {
			"field": "activity",
			"type": "nominal",
			"axis": {"title": "Activity"}
		},
		"y": {
			"field": "tweets",
			"type": "quantitative",
			"axis": {"title": "# of Tweets"}
		}
	  }
	};
	vegaEmbed('#activityVis', activity_vis_spec, {actions:false});

	// Filling in the HTML elements
	document.getElementById('numberActivities').innerText = activity_array.length;

	let top_three = activity_array
	.sort((a, b) => b.tweets - a.tweets)
	.slice(0, 3);
	
	document.getElementById('firstMost').innerHTML = top_three[0].activity;
	document.getElementById('secondMost').innerHTML = top_three[1].activity;
	document.getElementById('thirdMost').innerHTML = top_three[2].activity;

	//TODO: create the visualizations which group the three most-tweeted activities by the day of the week.
	//Use those visualizations to answer the questions about which activities tended to be longest and when.
	
	// Prepping array
	let days_array = [];
	let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
	let top_three_activities = [top_three[0].activity, top_three[1].activity, top_three[2].activity];
	for (let tweet of tweet_array) {
		if (top_three_activities.includes(tweet.activityType)) {
			days_array.push(
				{
					"activity": tweet.activityType,
					"distance": tweet.distance,
					"day": days[tweet.time.getDay()]
				}
			);
		}
	}

	// All activities
	all_activities_days = {
		"$schema": "https://vega.github.io/schema/vega-lite/v5.json",
		"description": "A graph of all the top 3 activites, grouped by day.",
		"data": {"values": days_array},
		"mark": "point",
		"encoding": {
			"x": {
				"field": "day",
				"type": "nominal",
				"axis": {"title": "Day"}
			},
			"y": {
				"field": "distance",
				"type": "quantitative",
				"axis": {"title": "Distance"}
			},
			"color": {
				"field": "activity",
				"type": "nominal"
			}
		}
	}
	vegaEmbed('#distanceVis', all_activities_days, {actions:false});

	// Mean activities
	mean_activities_days = {
		"$schema": "https://vega.github.io/schema/vega-lite/v5.json",
		"description": "A graph of all the top 3 activites, grouped by day.",
		"data": {"values": days_array},
		"mark": "point",
		"encoding": {
			"x": {
				"field": "day",
				"type": "nominal",
				"axis": {"title": "Day"}
			},
			"y": {
				"field": "distance",
				"type": "quantitative",
				"aggregate": "mean",
				"axis": {"title": "Distance"}
			},
			"color": {
				"field": "activity",
				"type": "nominal"
			}
		}
	}
	vegaEmbed('#distanceVisAggregated', mean_activities_days, {actions:false});

	document.getElementById('longestActivityType').innerHTML = 'bike';
	document.getElementById('shortestActivityType').innerHTML = 'walk';
	document.getElementById('weekdayOrWeekendLonger').innerHTML = 'weekends';
}

//Wait for the DOM to load
document.addEventListener('DOMContentLoaded', function (event) {
	loadSavedRunkeeperTweets().then(parseTweets);
	document.getElementById('distanceVisAggregated').style.display = 'none';

	let button = document.getElementById('aggregate');
	button.addEventListener('click', function() {
		let allDistance = document.getElementById('distanceVis');
		let meanDistance = document.getElementById('distanceVisAggregated');

		if (allDistance.style.display == 'none') {
			allDistance.style.display = 'inline-block';
			meanDistance.style.display = 'none';
			button.innerHTML = 'Show means';
		} else if (meanDistance.style.display == 'none') {
			allDistance.style.display = 'none';
			meanDistance.style.display = 'inline-block';
			button.innerHTML = 'Show all activities';
		}
	});
});