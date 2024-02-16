const Sample = require('../models/sample.model')

exports.getSampleData = async (req, res) => {
    const sampleId = req.params.sampleId;

    let sample = await Sample.findById(sampleId);

    if (sample){
        return res.status(200).json(sample);
    } else {
        return res.status(404).send({success: false, message: "Sample data with this id was not found"})
    }
}