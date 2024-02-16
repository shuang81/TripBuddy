const Question = require("../models/question.model");
const User = require("../models/user.model");

// delete frequently asked question
exports.deleteQuestion = async (req, res) =>{
    try {
        const userId = res.locals.userId;
        const user = await User.findById(userId);
        // check if the user is authenticated and has admin role
        if (user && user.isAdmin) {
            const id  = req.params.id;
            const result = await Question.findByIdAndRemove(id);
            if (result) {
                return res.status(200).json({message: "Question is deleted sucessfully"});
            } else {
                return res.status(404).json({error: "Question not found"});
            }
        } else {
            return res.status(403).json({error: "User does not have the premission to perform this action"});
        }
    } catch (error) {
        return res.status(500).json({error: `Server error: ${error.message}`});
    }
 }

 // add new frequently asked question
exports.addQuestion = async (req, res) =>{
    try {
        const userId = res.locals.userId;
        const user = await User.findById(userId);

        if (user && user.isAdmin) {
            const newQuestion = new Question({
                question: req.body.question,
                answer: req.body.answer,
                questionBy: userId
            });

            await newQuestion.save();
            return res.status(200).json({message: "Question and answer is created sucessfully"});
        } else {
            return res.status(403).json({error: "User does not have the premission to perform this action"});
        }
    } catch (error) {
        return res.status(500).json({error: `Server error: ${error.message}`});
    }
}

exports.editQuestion = async (req, res) => {
    try {
        const questionId = req.params.id;
        const oldQuestion = await Question.findById(questionId);
        const questionBy = oldQuestion.questionBy;
        const userId = res.locals.userId; // get user id from authentication middleware
        const user = await User.findById(userId);
        // check if the user is authenticated and has admin role
        if (user && user.isAdmin) {
            const updatedQuestion = {
                question: req.body.question,
                answer: req.body.answer,
                questionBy: questionBy
            };

            await Question.updateOne({ _id: questionId }, updatedQuestion);
            return res.status(200).json(updatedQuestion);
        } else {
            return res.status(403).json({error: "User does not have the premission to perform this action"});
        }
    } catch (error) {
        return res
        .status(500)
        .send({ success: false, message: `Server error: ${error.message}` });
    }
};

exports.getAllQuestions = async (req, res) => {
    try {
        const questions = await Question.find();
        return res.status(200).json(questions);
    } catch (error) {
        return res.status(500).send({ message: `Server error: ${error.message}` });
    }
};

