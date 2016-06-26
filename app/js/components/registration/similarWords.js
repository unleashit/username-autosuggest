function _getWordScore(a, b) {

// calculates the Levenshtein distance between two words

    if (a.length === 0) return b.length;
    if (b.length === 0) return a.length;

    var matrix = [];

    // increment along the first column of each row
    var i;
    for (i = 0; i <= b.length; i++) {
        matrix[i] = [i];
    }

    // increment each column in the first row
    var j;
    for (j = 0; j <= a.length; j++) {
        matrix[0][j] = j;
    }

    // Fill in the rest of the matrix
    for (i = 1; i <= b.length; i++) {
        for (j = 1; j <= a.length; j++) {
            if (b.charAt(i-1) == a.charAt(j-1)) {
                matrix[i][j] = matrix[i-1][j-1];
            } else {
                matrix[i][j] = Math.min(matrix[i-1][j-1] + 1, // substitution
                    Math.min(matrix[i][j-1] + 1, // insertion
                        matrix[i-1][j] + 1)); // deletion
            }
        }
    }

    return matrix[b.length][a.length];
}

export default (input, list) => {

// takes two arguments, word and list of words to compare

    var score;

    // return array of objects from the dictionary
    // containing two props: word and its Levenshtein score based on the input word
    return list.map(function(word) {
        score = _getWordScore(input, word);

        return {
            word: word,
            score: score === 0 ? list.length : score
        };
    })
        // sort in ascending order (top matches first)
        .sort(function(a,b) {
            return a.score - b.score;
        })
        // return the top 50
        // need a limited number of fallbacks in case the suggestions don't validate
        // with a smaller DB, this number can be lower
        .slice(0, 50);
}