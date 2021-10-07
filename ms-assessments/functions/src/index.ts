import * as admin from "firebase-admin";
import {newAssessment, listAssessments, getAssessment} from "./assessments";
import {newQuestion, listQuestions} from "./questions";

admin.initializeApp();

exports.addAssessment = newAssessment();
exports.listAssessments = listAssessments();
exports.getAssessment = getAssessment();
exports.addQuestion = newQuestion();
exports.listQuestions = listQuestions();
