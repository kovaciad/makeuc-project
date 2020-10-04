const PDFDocument = require('pdfkit');
const fs = require('fs');
const User = require('../models/User');

// Takes a "test" object type and an http response. Will return the test object formatted as a pdf
exports.makePdf = (test, res) => {
    if (test == undefined) return console.log("Test did not pass: " + test);
    let doc = new PDFDocument();
    let buffers = [];
    doc.on('data', buffers.push.bind(buffers));

    let title = test.testTitle;
    doc.pipe(res);
    // doc.pipe(res);
    doc.font('Helvetica')
        .fontSize(14);
    doc.text(title);
    doc.moveDown(2);
    // let questions = test.questionList;
    let qNdx = 1; // Garbage collection can take this, thx
    

    // Display all of the different questions in a format
    test.questionList.forEach((element) => {
        if (element.options.length == 0) { // If no options are given, it will simply leave blank space underneath in the pdf
            doc.text(`${qNdx}. ${element.question} `);
            doc.moveDown(6);
            qNdx++;
        } else {
            doc.text(`${qNdx}. ${element.question} `)
            let mNdx = 1;
            element.options.forEach(ele => {
                doc.text(`      ${mNdx}. ${ele}`);
                mNdx++;
            });
            doc.moveDown(2);
            qNdx++;
        }
    });
    doc.addPage({
        margin:50
    });
    doc.text('Answer Key');
    doc.moveDown(2);
    let aNdx = 1;

    // Display all of the answers for an answer key
    test.questionList.forEach(element => {
        doc.text(`${aNdx}. ${element.question}`)
        doc.moveDown(0.5);
        doc.text(`      ${element.answer}`)
            .fontSize(14);
        doc.moveDown(2);
        aNdx++;
    });
    doc.end();
}