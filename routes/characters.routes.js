const router = require("express").Router();
const axios = require("axios");
const { render } = require("ejs");

/* GET home page */



router.get("/characters", (req, res, next) => {
    axios.get("https://ih-crud-api.herokuapp.com/characters")
    .then(responseFromAPI => {
        // console.log(responseFromAPI)
        res.render("characters/list-characters", { characters: responseFromAPI.data });
    })
    .catch(err => console.error(err))
});

router.get("/characters/create", (req, res)=> {
    res.render("characters/create-character")
});



router.post("/characters/create", async (req, res)=> {
    try {
        const characterInfo = req.body;
        console.log(characterInfo)
    
        if (req.body.debt === 'on') {
            characterInfo.debt = true
        } else {
            characterInfo.debt = false
        }
        console.log('characterInfo modified: ', characterInfo)
    
        await axios.post(`https://ih-crud-api.herokuapp.com/characters`, characterInfo)
        res.redirect('/characters');
    }
    catch (err) {
        console.log(err)
    }
});

router.get("/characters/:id/edit", async (req,res)=> {
    const characterDetails = await axios.get(`https://ih-crud-api.herokuapp.com/characters/${req.params.id}`)
    //console.log("details: ", characterDetails.data.name)
    res.render("characters/edit-character", { character: characterDetails.data })
})
    
    
router.post("/characters/:id/edit", async(req,res)=> {
    //console.log("req.params",req.params)
    await axios.put(`https://ih-crud-api.herokuapp.com/characters/${req.params.id}`, {
        name: req.body.name,
        occupation: req.body.occupation,
        debt: req.body.debt,
        weapon: req.body.weapon,
    })
    console.log('req.params', req.params)
    res.redirect(`/characters/${req.params.id}`)

})


router.get("/characters/:id", (req, res, next) => {
    axios.get(`https://ih-crud-api.herokuapp.com/characters/${req.params.id}`)
    .then(responseFromAPI => {
        // console.log("details: ", responseFromAPI.data)
        res.render("characters/details-character", { character: responseFromAPI.data });
    })
    .catch(err => console.error(err))
});

router.post("/characters/:id/delete", async (req, res)=> {
    await axios.delete(`https://ih-crud-api.herokuapp.com/characters/${req.params.id}`)
    res.redirect('/characters')
})




 

module.exports = router;


