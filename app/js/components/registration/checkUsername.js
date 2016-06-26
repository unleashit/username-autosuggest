import axios from 'axios';
import _ from 'lodash';
import render from './render';
import SuggestUsernames from './suggestUsernames';

export default {
    // number of username checks to server
    serverCalls: 0,

    // store instantiation for sharing
    suggestUsernames: null,

    queryServer(username) {

        let suggestions = this.getInitSuggestions(username).join(',');
        let q = `${username},${suggestions}`;
        // query string should be naturally urlencoded

        axios.get(`http://chegg-tutors.appspot.com/coding-challenge/api/user/?username=${q}`)
            .then(resp => {
                //console.log(resp);
                this.serverCalls++;

                // check to see if chosen username absent from the response. If so, they are good to go.
                if (!_.find(resp.data, u => {
                    return u.username === username;
                })) {
                    //console.log('user available!');
                    return render.success(username);
                }

                let validSuggestions = suggestions.split(',');


                // filter unavailable usernames
                validSuggestions = _.filter(validSuggestions, u => {
                    return !_.find(resp.data, item => {
                        return item.username === u;
                    })
                });

                this.queryAgain(username, validSuggestions);
            })
            .catch(err => {
                console.error(err);
            })

    },
    queryAgain(username, validSuggestions) {
        //let newSuggestions = '';
        let newSuggestions = this.getNewSuggestions(username);
        this.checkSuggestions(newSuggestions)
            .then(resp => {

                newSuggestions = _.filter(newSuggestions, u => {
                    return !_.find(resp.data, item => {
                        return item.username === u;
                    })
                });
                validSuggestions = validSuggestions.concat(newSuggestions);

                // recursively call this func until we have 3+ valid suggestions
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
    checkSuggestions(suggestions) {
        return axios.get(`http://chegg-tutors.appspot.com/coding-challenge/api/user/?username=${suggestions}`);
    },
    getInitSuggestions(username) {

        // check to see if second server call (first call didn't require suggestions).
        // If so, instantiate SuggestUsernames class and return 3 suggestions
        // class should only be instantiated once
        this.suggestUsernames = new SuggestUsernames(username);
        return this.suggestUsernames.retrieveAll();
    },
    getNewSuggestions(username) {
        // I ended up hacking this. My original plan was to determine
        // which types of suggestions failed, and swap with the same type but I ran out of time.
        // this just tests 10 new rotating suggestions at a time, so user may see repeats of suggestion types.
        // BTW, I've noticed that this user DB is LARGE, so that's why I'm going with extra attempts to keep server calls to a minimum
        // In hindsight, I would have sent more than 3 suggestions on the first call, but I'm out of time.

        return [1,2,3,1,2,3,1,2,3,3].map(s => {
            return this.suggestUsernames.retrieveSingle(s);
        });
    }
};
