started at 12/26 at 10:15pm
Tound a way to copy the DPS repo into one I created...and then read that I could just use fork which was way simpler than git clone, removing git and then adding it to my repo. 

12/27 6:18pm - 11pm
I spent 5 hours off and on attempting to figure out how to grap data using the external API.

12/28 11:00am-1:00pm 
Figured out how to get the beers and breweries to show up. Turns how I needed to do res.data.entries. Spent a long time reading about grabbing objects. Can't figure out how to grab images from the API. They are nested objects... 

10:00pm-midnight 
Working on pagination. Will attempt inifinite scroll if I have time. 
 
12/29 11:00am-noon 
Got images to show up with beers and breweries. Had to create a conditional because not all beers/breweries have images. Used a placeholder for those that don't. 

6:04pm - 8:50pm 
Still messing with infinite scroll... I created an infinite loop. Page 2 is loading over  and over again but nothing is rendering. The page number should update from /api/all_breweries?page=1&per_page=10 to /api/all_breweries?page=2&per_page=10 up to page 5 since I only want 50 breweries total. 

10:30pm-midnight
Built a single page view for a beer. Tried to cheat by creating a new route beer/:id but axios was still trying to grab data from beer/:name. Finally figured out how to use name to grab the details of the beer. As always I complicate things for myself...Now attempting to get data to show up. I know there's data for the beer because I can see it in the dev tools. But how do I grab data from: 
  beer: Array[1]
    0: {}
      description: 'a;ksdjfla' 
      name: 'asdl;kfjads' 
      etc: 'askl;dfja' 

12/30 10:30-11:30am 
Still attempting to get infinite scroll to work, but it's still stuck in a loop. Tried accessing a single beer using beer[0].name but recieved an error. 
      

Jan 2 11:00am - 6:00pm 
Infinite scroll is my nemesis! Worked on singleBeer pages and singleBrewery page. Attempted to get modals working, but couldn't figure out how to change it from presentational to a class so that I could make the modal render data dynamically. 
Did some styling, used cards instead of a table. 

10:00pm - midnight
Finally got infinite scrolling to work. Definitely ran into some lines of code I don't fully understand. Why does it work one way in one assignment and not the same in another? 

Tried to get dimmer to work on initial load, but not sure where to set loaded to true...
Cleaning up code 
some styling 
