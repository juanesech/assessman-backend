import * as admin from "firebase-admin";
import {newAssessment, listAssessments} from "./assessments";

admin.initializeApp();

exports.addAssessment = newAssessment();
exports.listAssessments = listAssessments();
