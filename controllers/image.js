const Clarifai = require('clarifai');
const app = new Clarifai.App({
    apiKey: 'f239e9a86ed749dd941a406e39e0c894'
  });

const handleApiCall = (req, res) => {
    app.models.predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
    .then(data => {
        res.json(data);
    })
    .catch(err => {
        res.status(400).json('unable to work with API');
    });
}

const handleImage = (req, res, db)=>{
    const { id } = req.body;
    db('users')
    .where('id', '=', id)
    .increment('entries', 1)
    .returning('entries')
    .then(entries => {
        res.json(entries[0]);
    }).catch(err =>{
        res.status(400).json('unable to get entries');
    })
}

module.exports = {
    handleImage: handleImage,
    handleApiCall: handleApiCall
}