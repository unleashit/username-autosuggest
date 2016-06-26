import similarWords from './similarWords';
import simpleDict from './data/dictionary';

export default class SuggestUsernames {
    constructor(input) {
        this.suggestions = [];
        this.input = input;
        this.tries = 0;
        this.sep = this._findSeperator();
        this._sugg1();
        this._sugg2();
        this._sugg3();
    }
    retrieveAll() {
        return this.suggestions;
    }
    retrieveSingle(type) {
        this['_sugg' + type]();
        return this.suggestions[this.suggestions.length - 1];
    }
    _findSeperator() {
    // if the user has a seperator return it, else an empty string
        if (/_/.test(this.input)) return '_';
        if (/-/.test(this.input)) return '-';
        if (/\./.test(this.input)) return '.';
        return '';
    }
    _sugg1() {
    // add language simularity
        let pieces = this.sep ? this.input.split(this.sep) : 0;

    // if user has seperators, split the word parts and find the longest
        if (pieces.length > 1 ) {

            // Get longest word part. Use the Array spread operator to create new array so we don't mutate pieces
            let longest = [...pieces].sort((a, b) => {
                return b.length - a.length;
            })[0];

            // find a substitute word for longest word part
            // increment this.tries forces new word if username was found in database
            let similar = similarWords(longest, simpleDict)[this.tries++].word;

            // replace substitute word in original array at the right index
            pieces[pieces.indexOf(longest)] = similar;

            // join the array with the original seperator and push suggestion
            this.suggestions.push(
                pieces.join(this.sep)
            );

        } else {
        // no seperator found so just use the full input to find related word
            this.suggestions.push(
                similarWords(this.input, simpleDict)[this.tries++].word
            );
        }
    }
    _sugg2() {
        // add number suffix
        let suffix = Math.ceil(Math.random()*9999);
        this.suggestions.push(this.input + this.sep + suffix);
    }
    _sugg3() {
        // add random superlative suffix
        // was having a bit of fun with the choice of names... in a real professional situation, we'd be a bit more selective  ;-)
        this.sep = (this.sep !=='') ? this.sep : '_'; // enforce a sep here
        let names = ['the great', 'numero uno', 'the first', 'the magnificent', 'the conquerer', 'awesome', 'amazing', 'the worthy'];
        let rand = Math.floor(Math.random()*names.length);
        this.suggestions.push(this.input +
            this.sep +
            names[rand]
                .replace(/[\s]/g, this.sep)
        );
    }
}
