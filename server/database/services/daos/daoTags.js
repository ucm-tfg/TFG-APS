const knex = require("../../config");

//READ ALL TAGS THAN START WITH THE TEXT------------------------------------------------------------------------------------------------
function readByStartWithWord(text) { 
    return knex("tags")
    .where('nombre', 'like', `${text}%`)
    .select("*")
    .then((tags) => {
        return tags;
    });
   
}

module.exports = {
    readByStartWithWord
};
