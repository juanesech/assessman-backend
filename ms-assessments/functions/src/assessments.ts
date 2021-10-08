import * as functions from "firebase-functions";
import {firestore} from "firebase-admin";

interface Assessment {
    name: string,
    description: string
}
/**
 * Saves assessment info into a firebase document.
 * @return {functions.HttpsFunction} a firebase https function
 */
export const newAssessment = (): functions.HttpsFunction => {
  return functions.https.onRequest(async (req, res) => {
    const body: Assessment = req.body;
    const writeAssessment= await firestore()
        .collection("assessments")
        .add(body);
    res.json({result: `Assessment with ID: ${writeAssessment.id} added.`});
  });
}

/**
 * Lists saved assessments.
 * @return {functions.HttpsFunction} a firebase https function
 */
export const listAssessments = (): functions.HttpsFunction => {
  return functions.https.onRequest(async (req, res) => {
    const assessmentList = await firestore()
        .collection("assessments")
        .get()
        .then((querySnap) => {
          return querySnap.docs
              .map( (doc) => ({data: doc.data(), id: doc.id}));
        });
    res.json(assessmentList);
  });
}

/**
 * Get assessment info from a firebase document.
 * @return {functions.HttpsFunction} a firebase https function
 */
export const getAssessment = (): functions.HttpsFunction => {
  return functions.https.onRequest(async (req, res) => {
    const assessmentId = req.query.id;
    let data:
        FirebaseFirestore.DocumentData |
        null |
        undefined |
        FirebaseFirestore.DocumentSnapshot<FirebaseFirestore.DocumentData>;
    if (typeof assessmentId === "string") {
      data = await firestore()
          .collection("assessments")
          .doc(assessmentId)
          .get()
          .then((querySnap) => (querySnap.exists ? querySnap.data() : null)
          );
      if (!data) {
        res.statusCode = 404;
        res.json({message: `Assessment with ID ${assessmentId} not found`});
      } else {
        res.json(data);
      }
    }
  });
}
