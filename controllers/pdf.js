const PDFDocument = require('pdfkit');
const fs = require('fs');

// Takes a "test" object type and an http response. Will return the test object formatted as a pdf
exports.makePdf = (test) => {
    let doc = new PDFDocument();
    let title = test.testTitle;
    // Save the file for future reference and create an http response with it
    
    doc.pipe(fs.createWriteStream('output.pdf'));
    // doc.pipe(res);
    doc.font('Helvetica')
        .fontSize(14);
    doc.text(title);
    doc.moveDown(2);
    let questions = test.questionList;
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
    questions.forEach(element => {
        doc.text(`${aNdx}. ${element.question}`)
        doc.moveDown(0.5);
        doc.text(`      ${element.answer}`)
            .fontSize(14);
        doc.moveDown(2);
        aNdx++;
    });
    doc.end();
}