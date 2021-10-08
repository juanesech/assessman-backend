import * as functions from "firebase-functions";
import {firestore} from "firebase-admin";


interface Question {
    content: string,
    type: string
    
};

/**
 * Saves question into a firebase document.
 * @return {functions.HttpsFunction} a firebase https function
 */
export const  newQuestion = (): functions.HttpsFunction => {
    return functions.https.onRequest(async (req, res) => {
        const body: Question = req.body;
        const writeQuestion= await firestore()
            .collection("questions")
            .add(body);
        res.json({result: `Question with ID: ${writeQuestion.id} added.`});
    });
}

/**
 * Lists saved questions.
 * @return {functions.HttpsFunction} a firebase https function
 */
 export const listQuestions = (): functions.HttpsFunction => {
    return functions.https.onRequest(async (req, res) => {
      const questionsList = await firestore()
          .collection("questions")
          .get()
          .then((querySnap) => {
            return querySnap.docs
                .map( (doc) => ({data: doc.data(), id: doc.id}));
          });
      res.json(questionsList);
    });
}
