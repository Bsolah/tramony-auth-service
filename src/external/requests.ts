import { Dojah } from 'dojah-typescript-sdk';
import dotenv from 'dotenv';
dotenv.config();

export const dojah = new Dojah({
  // Defining the base path is optional and defaults to https://api.dojah.io
  // basePath: "https://api.dojah.io",
  authorization: process.env.DOJAH_SECRET_KEY,
    appId: '677e539c16c040c124f88f54',
  basePath: "https://sandbox.dojah.io"
});
