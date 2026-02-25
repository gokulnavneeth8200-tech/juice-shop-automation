import fs from 'fs';
import path from 'path';

export function saveUserCredentials(user: { email: string; password: string }) {
  const filePath = path.join(process.cwd(), 'test-data', 'new-user.json');

  fs.writeFileSync(
    filePath,
    JSON.stringify(user, null, 2)
  );
}