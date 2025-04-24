// src/lib/parseForm.ts
import formidable, { Fields, Files } from 'formidable';
import { IncomingMessage } from 'http';

export const parseForm = (req: IncomingMessage): Promise<{ fields: Fields; files: Files }> => {
  const form = formidable({ multiples: false });

  return new Promise((resolve, reject) => {
    form.parse(req, (err: any, fields: Fields, files: Files) => {
      if (err) reject(err);
      resolve({ fields, files });
    });
  });
};

// Untuk Next.js App Router, ini akan diabaikan
export const config = {
  api: {
    bodyParser: false,
  },
};
