import fs from 'fs';
import path from 'path';

export default (req, res) => {
  const filePath = path.join(process.cwd(), 'schemas', 'formCredentialSchema.json');
  const fileContents = fs.readFileSync(filePath, 'utf-8');
  res.setHeader('Content-Type', 'application/json');
  res.status(200).send(fileContents);
};
