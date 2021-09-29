import * as admin from "firebase-admin";
import {newAssessment, listAssessments, getAssessment} from "./assessments";

admin.initializeApp();

exports.addAssessment = newAssessment();
exports.listAssessments = listAssessments();
exports.getAssessment = getAssessment();
