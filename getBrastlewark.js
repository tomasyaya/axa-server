const axios = require("axios");

function chooseGender(name) {
    const [firstName, lastName] = name.split(" ");
    const lastLetter = firstName.charAt(firstName.length - 1);
    return ["e", "a"].includes(lastLetter) ? "female" : "male";
}

function normalizeData(data) {
    return {
        id: data.id,
        name: data.name,
        age: data.age,
        gender: chooseGender(data.name),
        image: data.thumbnail,
        professions: data.professions,
        friends: data.friends
    }
}

async function getData(input){
    try {
        const {pageSize, pageNumber} = JSON.parse(JSON.stringify(input))
        const { data } = await axios.get(
            "https://raw.githubusercontent.com/rrafols/mobile_test/master/data.json"
          );
        const {Brastlewark} = data;
        const results = Brastlewark.slice((pageNumber - 1) * pageSize, pageNumber * pageSize)
            .map(brastlewark => normalizeData(brastlewark))
        const hasNext = Brastlewark[(pageNumber * pageSize) + 1] ? true : false
        return {
            hasNext,
            results
        }
    } catch(e) {
        console.log(e)
    }
}

async function brastlewarkHandler(req, res) {
    try {
        const results = await getData(req.body);
        res.json(results)
    } catch(e) {
        res.json("error")
    }
}

module.exports = brastlewarkHandler;