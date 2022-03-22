const mailgun = require('mailgun-js');
const ejs = require('ejs');

const env = require('#config/env')

const DOMAIN = env.mailgun.domain;

const mg = mailgun({ apiKey: env.mailgun.apikey, domain: DOMAIN });

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
