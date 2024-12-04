# rankly.

_Created by Vicky Carmichael for my CS50 final project_

## Video demo
Link coming soon…

## Description

### What is rankly.?

rankly. is a simple web app for ranking a list of between 2 and 10 items, by having the user select their preference from every possible combination of pairs. Users can enter their own list of items, or select one of several sets of sample data at random. The app uses a simple scoring algorithm to determine the final ranking, which is displayed to the user at the end.

This project is built using HTML, CSS, vanilla JavaScript, and JSON for loading sample data files. 

I also use [Bootstrap](https://getbootstrap.com/), [Google Fonts](https://fonts.google.com/), and [Font Awesome](https://fontawesome.com/) for icons, and [Magic Pattern](https://www.magicpattern.design/tools/css-backgrounds) to generate the subtle background pattern.

As a JavaScript novice, completing this project involved me asking [ChatGPT](https://chatgpt.com/) a _lot_ of questions about DOM manipulation, event handling, data structures, randomisation, string manipulation, and writing functions!

### Project files

#### `index.html`

The project contains a single HTML file. As well as a static header and footer, this file contains three sections displayed dynamically with JavaScript depending on the current stage of the ranking process: 

- `input-section`: Contains a textarea where users can enter their list of items, as well as a button to load sample data, and a button to submit the data to initiate the ranking process. An error message is also included but hidden by default, and displayed if the user tries to submit without inputting enough data.
- `ranking-section`: Contains two buttons, each representing an item from the list. Clicking a button indicates that the user prefers that item, and points will be awarded accordingly. There may be up to 45 pair combinations shown, depending on the number of items in the list.
- `result-section`: Displays an ordered list of items from highest to lowest score, based on the selections the user made in the previous section, as well as an explanation for how the rankings were calculated, and a button to reveal a modal with a breakdown of the choices made in each round.

#### `styles.css`

Contains my custom styles for the app, including some tweaks to the default Bootstrap classes (used for buttons and a modal), such as subtle button transitions on hover. 

#### `script.js`

All the interactivity in this project is implemented with JavaScript. This ranges from the subtle, such as dynamically updating the year in the footer or the text on a button when clicked, to the fundamental — i.e. the entirety of the ranking functionality of the app. 

Let's look at the latter in detail, as it comprises five functions:

- `startRanking`: Listens for a button click, initialises variables for items, pairs, scores, and the current index, checks for any input errors, and transitions from the input section to the ranking section upon successful validation.
- `generatePairs`: Iterates through the list of items to generate all possible unique combinations, adds them to the pairs array using the `push()` method, and randomises the order in which pairs are presented.
- `showNextPair`: Displays the next pair from the list and sets up click handlers to call the `handleChoice` function, which awards points based on the user’s selection.
- `handleChoice`: Awards 7 points to the chosen item and 3 points to the non-chosen item, adding a small random decimal value to each to minimise tied scores (further details on this design choice below). The chosen item in each pair is also recorded to an array so a breakdown of the user's choices can be displayed at the end. 
- `displayResults`: Switches from the ranking section to the results section, presenting a sorted list of items based on their scores, plus a breakdown of all the choices made (viewable in a Bootstrap modal).

#### `[sample].json`

For a better user experience — and to save me inputting a list of items every time I tested the app — I included a few JSON files of sample data (Friends characters, ways to eat potatoes, etc.). These are stored in the `data` directory, and randomised and fetched on button click, via an event listener in `script.js`.

## Design decisions

My main concern was how to calculate the rankings. I dislike knock-out methods, as a strong option can be eliminated by an unlucky pairing. So I chose pairwise comparison to ensure every option is judged against others, though its quadratic nature meant limiting user input to 10 items to avoid an overwhelming number of comparisons.

Scoring was another challenge. Humans don't always show transitive preferences (e.g., liking A over B and B over C doesn’t guarantee preferring A over C). As this project is for fun and I’m new to JavaScript, I prioritised simplicity over precision, assigning 7 points to the chosen item and 3 to the other, with a small random variance to avoid ties. This felt like a good balance of simplicity and nuance to produce a result list that feels accurate enough to the user.

I debated displaying the points awarded in the breakdown modal, e.g.

```
You chose ${chosen} (+${points[chosen].toFixed(2)} points) over ${other} (+${points[other].toFixed(2)} points).;
```

Ultimately though, I decided this was a bit visually confusing and didn't add much value for the user.

## Development tools used

- Sublime Text as my code editor
- `http-server` for browser testing
- GitHub for version control and automatic deploys: https://github.com/quovixi/rankly
- Netlify for hosting: https://rankly.netlify.app.