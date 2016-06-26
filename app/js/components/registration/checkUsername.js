import axios from 'axios';
import _ from 'lodash';
import render from './render';
import SuggestUsernames from './suggestUsernames';

export default {
    
    // number of username checks to server
    serverCalls: 0,

    // store instantiation to enable sharing
    suggestUsernames: null,

    queryServer(username) {
    
    // this method does first calls the server to validate the user's choice plus 3 additional suggestions
    // if user's choice is taken and there aren't 3 valid suggestions,
    // query again (10 suggestions at a time), until there are at least 3

        // get initial 3 suggestions
        let suggestions = this.getInitSuggestions(username).join(',');
        // query string should be naturally urlencoded
        let q = `${username},${suggestions}`;

        // query server
        this.getJson(q)
            .then(resp => {

                this.serverCalls++;

                // check to see if chosen username is absent from the response.
                // If so, render sucesss they are good to go.
                // note: using lodash here as find is not polyfilled with Babel
                if (!_.find(resp.data, u => {
                    return u.username === username;
                })) {
                    //console.log('user available!');
                    return render.success(username);
                }

                // create array from suggestions
                let validSuggestions = suggestions.split(',');

                // filter unavailable usernames
                validSuggestions = _.filter(validSuggestions, u => {
                    return !_.find(resp.data, item => {
                        return item.username === u;
                    })
                });

                // if there are 3 valid suggestions, render. If not query again
                if (validSuggestions.length < 3) {
                    this.queryAgain(username, validSuggestions);
                } else {
                    render.suggestions(username, validSuggestions.slice(0, 3));
                }

            })
            .catch(err => {
                console.error(err);
            })

    },
    queryAgain(username, validSuggestions) {

        // retrieve 10 new suggestions
        let newSuggestions = this.getNewSuggestions(username);

        // call server to validate
        this.getJson(newSuggestions)
            .then(resp => {

                // same code as above, should be refactored
                newSuggestions = _.filter(newSuggestions, u => {
                    return !_.find(resp.data, item => {
                        return item.username === u;
                    })
                });

                // add new valid suggestions to valid array
                validSuggestions = validSuggestions.concat(newSuggestions);

                // recursively call this func until we have 3+ valid suggestions
                // once we do, render them
                if (validSuggestions.length < 3) {
                    this.queryAgain(username, validSuggestions);
                } else {
                    //console.log('valid suggestions: ' + validSuggestions);
                    render.suggestions(username, validSuggestions.slice(0, 3));
                }
            })
            .catch(err => {
                console.error(err);
            });
    },
    getJson(suggestions) {
        return axios.get(`http://chegg-tutors.appspot.com/coding-challenge/api/user/?username=${suggestions}`);
    },
    getInitSuggestions(username) {

    // Instantiate SuggestUsernames class and return 3 suggestions
        this.suggestUsernames = new SuggestUsernames(username);
        return this.suggestUsernames.retrieveAll();
    },
    getNewSuggestions(username) {
        // I ended up hacking this. My original plan was to determine
        // which types of suggestions failed, and swap with the same type but I ran out of time.
        // this just tests 10 new rotating suggestions at a time, so user may see repeats of suggestion types.
        // BTW, I've noticed that this "user DB" is LARGE, so that's why I'm going with 10 at a time to keep server calls to a minimum
        // In hindsight, I would have sent more than 3 suggestions on the first call, but I'm out of time.

        return [1,2,3,1,2,3,1,2,3,3].map(s => {
            return this.suggestUsernames.retrieveSingle(s);
        });
    }
};
