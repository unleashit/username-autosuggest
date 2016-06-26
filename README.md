# username-autosuggest

Simple user registration form that validates user input, then queries a server to see if username is available. If it isn't, several suggestions are offered to the user. The suggestion algorithm creates three types of suggestions:

1. similar words
    - the users choice is compared in simularity with the a dictionary of common words
    - if the username had seperators (i.e. chalie_123), the largest word piece is replaced with the similar word
2. random 4 digit number appended
    - if the user used a seperator, that seperator is reused 
3. random phrase appended
    - if the user used a seperator, that seperator is reused 
    
Each batch of new suggestions is sent to the server to be validated. In order to work well with a large database, the batch function calls itself recursively until there are at least three valid suggestions.

To use in dev mode:

1. `npm install`
2. `npm run start` (runs webpack dev server)
3. navigate to localhost:8080

To build a production version:

1. `npm run production`
2. open `index.html` in `dist` folder

To see live, visit: http://challenge.jasongallagher.org


