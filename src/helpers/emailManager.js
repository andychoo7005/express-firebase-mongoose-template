const mailgun = require('mailgun-js');
const ejs = require('ejs');

const DOMAIN = 'sandbox07f06d98f013460882e4c3a32490cb6d.mailgun.org';

const mg = mailgun({ apiKey: 'bffc64c3f3af5734624773a441a64957-0677517f-1dba7aa2', domain: DOMAIN });

exports.mailgun = async (to, subject, html, options = {}) => {
  await mg.messages().send({
    from: 'testing account',
    to,
    subject,
    html,
    ...options,
  }).then((res) => {
    console.log(res);
  });
};

exports.mg = mg;

exports.sendNotice = async (
  to,
  title,
  description,
  buttonText,
  url,
  footerText,
  imageRedirectUrl,
  imgSrc,
) => {
  const html = await ejs.renderFile('src/resources/emailTemplates/notice.ejs', {
    title,
    description,
    buttonText,
    url,
    footerText,
    imageRedirectUrl,
    imgSrc,
  });

  await this.mailgun(to, title, description, buttonText, url, html);
};
