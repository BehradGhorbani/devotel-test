import { readFile } from 'fs/promises';
import * as admin from 'firebase-admin';

export class FirebaseAdmin {
  static async onApplicationBootstrap() {
    const firebaseServiceAccountFile = await readFile(
      './src/config/firebase-priv-key.json',
      'utf8',
    );
    const serviceAccount = await JSON.parse(firebaseServiceAccountFile);
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
    });
  }
}
