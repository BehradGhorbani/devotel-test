import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { readFile } from 'fs/promises';
import * as admin from 'firebase-admin';
@Injectable()
export class FirebaseAdmin implements OnApplicationBootstrap {
  async onApplicationBootstrap() {
    const firebaseServiceAccountFile = await readFile(
      './config/firebase-priv-key.json',
      'utf8',
    );
    const serviceAccount = await JSON.parse(firebaseServiceAccountFile);
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
    });
  }
}
