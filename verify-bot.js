import { google } from 'googleapis';
import fs from 'fs';

async function run() {
  const keyPath = '/Users/nakulamundhada23/Downloads/new-project-498214-97dea6c91d08.json';
  const key = JSON.parse(fs.readFileSync(keyPath, 'utf8'));

  const auth = new google.auth.GoogleAuth({
    credentials: {
      client_email: key.client_email,
      private_key: key.private_key,
    },
    scopes: ['https://www.googleapis.com/auth/siteverification'],
  });

  const client = await auth.getClient();
  const siteVerification = google.siteVerification({ version: 'v1', auth: client });

  try {
    const { data: tokenData } = await siteVerification.webResource.getToken({
      requestBody: {
        verificationMethod: 'META',
        site: {
          identifier: 'https://www.biovaco.in/',
          type: 'SITE',
        },
      },
    });
    console.log('SUCCESS_TOKEN:', tokenData.token);
  } catch (err) {
    console.error('ERROR:', err.message);
  }
}
run();
