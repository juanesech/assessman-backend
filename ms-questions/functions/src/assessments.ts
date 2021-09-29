import * as functions from "firebase-functions";
import {firestore} from "firebase-admin";

/**
 * Saves assessment info into a firebase document.
 * @return {functions.HttpsFunction} a firebase https function
 */
export function newAssessment(): functions.HttpsFunction {
  return functions.https.onRequest(async (req, res) => {
    const body = req.body;
    const writeAssessment= await firestore()
        .collection("assessments")
        .add({
          name: body.name,
          description: body.description,
        });
    res.json({result: `Assessment with ID: ${writeAssessment.id} added.`});
  });
}

/**
 * Lists saved assessments.
 * @return {functions.HttpsFunction} a firebase https function
 */
export function listAssessments(): functions.HttpsFunction {
  return functions.https.onRequest(async (req, res) => {
    const assessmentList = await firestore()
        .collection("assessments")
        .get()
        .then((querySnapshot) => {
          return querySnapshot.docs
              .map( (doc) => ({data: doc.data(), id: doc.id}));
        });
    res.json(assessmentList);
  });
}
