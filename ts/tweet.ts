class Tweet {
	private text:string;
	time:Date;

	constructor(tweet_text:string, tweet_time:string) {
        this.text = tweet_text;
		this.time = new Date(tweet_time);//, "ddd MMM D HH:mm:ss Z YYYY"
	}

	//returns either 'live_event', 'achievement', 'completed_event', or 'miscellaneous'
    get source():string {
        //TODO: identify whether the source is a live event, an achievement, a completed event, or miscellaneous.
        if (this.text.includes('Just completed') || this.text.includes('Just posted') || this.text.includes('just completed') || this.text.includes('just posted')) {
            return 'completed_event';
        }

        if (this.text.startsWith('Achieved a')) {
            return 'achievement';
        }

        if (this.text.startsWith('Watch my')) {
            return 'live_event';
        }

        return 'miscellaneous';
    }

    //returns a boolean, whether the text includes any content written by the person tweeting.
    get written():boolean {
        //TODO: identify whether the tweet is written
        let comp_string = this.text;
        comp_string = comp_string.replace("#Runkeeper", "");
        let pattern = new RegExp('https://t.co/[A-Za-z0-9]+');
        comp_string = comp_string.replace(pattern, "");

        pattern = new RegExp('Just completed a (.+) with @Runkeeper. Check it out!');
        comp_string = comp_string.replace(pattern, "");
        pattern = new RegExp('Just posted a (.+) with @Runkeeper. Check it out!');
        comp_string = comp_string.replace(pattern, "");
        pattern = new RegExp('Just completed a (.+?) -');
        comp_string = comp_string.replace(pattern, "");
        pattern = new RegExp('Just posted a (.+?) -');
        comp_string = comp_string.replace(pattern, "");
        comp_string = comp_string.replace('TomTom MySports Watch', "");

        pattern = new RegExp('Achieved a new personal record with (.+)')
        comp_string = comp_string.replace('pattern', "");
        comp_string = comp_string.replace('#FitnessAlerts', "");

        pattern = new RegExp('Watch my (.+) right now with @Runkeeper Live');
        comp_string = comp_string.replace(pattern, "");
        comp_string = comp_string.replace('#RKLive', "");

        comp_string = comp_string.trim();


        return comp_string.length > 0;
    }

    get writtenText():string {
        if(!this.written) {
            return "";
        }
        //TODO: parse the written text from the tweet
        return "";
    }

    get activityType():string {
        if (this.source != 'completed_event') {
            return "unknown";
        }
        //TODO: parse the activity type from the text of the tweet
        return "";
    }

    get distance():number {
        if(this.source != 'completed_event') {
            return 0;
        }
        //TODO: prase the distance from the text of the tweet
        return 0;
    }

    getHTMLTableRow(rowNumber:number):string {
        //TODO: return a table row which summarizes the tweet with a clickable link to the RunKeeper activity
        return "<tr></tr>";
    }
}