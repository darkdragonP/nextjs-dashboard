import bcrypt from 'bcrypt';

export async function hashPassword(password: string): Promise<string> {
  const saltRounds = 10;

  const salt = await bcrypt.genSalt(saltRounds);
  if (!salt) {
    throw new Error('Failed to generate salt');
  }
  
  const hashedPassword = await bcrypt.hash(password, salt);
  if (!hashedPassword) {
    throw new Error('Failed to hash password');
  }
  
  // Log the hashed password and salt for debugging purposes
  console.log('Password hashed successfully', hashedPassword, 'salt:', salt);

  return hashedPassword;
}