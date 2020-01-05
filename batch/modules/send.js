
const mailgun = require("./mailgun");
const email = require("./email");

mg = mailgun.initializeSend();

module.exports = function(template, list, subject="Announcement") {
  const newsletter = email.getTemplate(template);
  var shareBody = {
    from: "Rick Mercer <rmercer33@gmail.com>",
    to: list,
    subject: `Library of Christ Mind Teachings - ${subject}`,
    html: newsletter
  };

  shareBody["o:tag"] = ["newsletter"];

  return mg.messages().send(shareBody);
};

