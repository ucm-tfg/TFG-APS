let fs = require('fs');
const path = require("path");


String.prototype.removeStopWords = function () {

    var word, stop_word, regex_str, regex, string_clean = this.valueOf(), data, stop_words;
    data = fs.readFileSync(path.resolve(__dirname, "../../palabras.txt"), 'utf-8');
    stop_words = (data.split("\r\n"));

    // Divide todas las palabras individuales de la frase
    words = string_clean.match(/[^\s]+|\s+[^\s+]$/g)

    for (let v of words) {
        for (let w of stop_words) {

            word = v.replace(/\s+|[^a-z]+/ig, "");
            stop_word = w;

            if (word.toLowerCase() == stop_word) {

                regex_str = "^\\s*" + stop_word + "\\s*$";
                regex_str += "|^\\s*" + stop_word + "\\s+";
                regex_str += "|\\s+" + stop_word + "\\s*$";
                regex_str += "|\\s+" + stop_word + "\\s+";
                regex = new RegExp(regex_str, "ig");

                string_clean = string_clean.replace(regex, " ");
            }
        }
    }
    return string_clean.replace(/^\s+|\s+$/g, "");
}

function matchingPNLDescription(descriptionDemanda, descriptionOferta) {
    let arrayMatchWords = [];
    let keywordsDemanda = descriptionDemanda.removeStopWords();
    let keywordsOferta = descriptionOferta.removeStopWords();
    let arraykeywordsDemanda = keywordsDemanda.split(" ");
    let arraykeywordsOferta = keywordsOferta.split(" ");
    let count = 0;

    for (let i of arraykeywordsDemanda) {
        for (let j of arraykeywordsOferta) {
            if (i.toLowerCase() === j || j.toLowerCase() == i) {
                arrayMatchWords.push(i);
            }
        }
    }
    return arrayMatchWords.length;
}


module.exports = { matchingPNLDescription };