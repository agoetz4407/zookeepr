const express = require('express');
const app = express();
const PORT = process.env.PORT || 3001
const {animals} = require('./data/animals.json')

app.listen(PORT, () => {
    console.log(`API server listening at ${PORT}`)
})

function filterByQuery(query, animalsArray) {
    let personalityTraitsArr = []
    let filteredResults = animalsArray

    if (query.personalityTraits) {
        if (typeof query.personalityTraits === 'string') {
            personalityTraitsArr = [query.personalityTraits]
        }
        else {
            personalityTraitsArr = query.personalityTraits
        }
        personalityTraitsArr.forEach(trait => {
            filteredResults = filteredResults.filter(
                animal => animal.personalityTraits.indexOf(trait) !== -1
            )
        })
    }
    if (query.diet) {
        filteredResults = filteredResults.filter(animal => animal.diet === query.diet)
    }
    if (query.species) {
        filteredResults = filteredResults.filter(animal => animal.species === query.species)
    }
    if (query.name) {
        filteredResults = filteredResults.filter(animal => animal.name === query.name)
    }
    return filteredResults;
}

app.get('/api/animals', (req, res) => {
    let results = animals;
    if (req.query) {results = filterByQuery(req.query, results)}
    res.json(results)
})