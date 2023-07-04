import fs from 'fs';
import path from 'path';

export default (req, res) => {
  const filePath = path.join(process.cwd(), 'schemas', 'formCredentialContext.jsonld');
  const fileContents = fs.readFileSync(filePath, 'utf-8');
  res.setHeader('Content-Type', 'application/ld+json');
  res.status(200).send(fileContents);
};
