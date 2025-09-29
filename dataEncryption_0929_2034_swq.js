// 代码生成时间: 2025-09-29 20:34:23
// Importing necessary libraries for encryption
const crypto = require('crypto');

/**
 * Encrypts data using a symmetric algorithm.
 * @param {string} data - The data to be encrypted.
 * @param {string} secretKey - The secret key for encryption.
 * @returns {string} - The encrypted data as a base64 encoded string.
 */
function encryptData(data, secretKey) {
  // Check if the secret key is provided
  if (!secretKey) {
    throw new Error('Secret key is required for encryption.');
  }

  // Create a cipher using AES-256-CBC algorithm
  const cipher = crypto.createCipher('aes-256-cbc', secretKey);

  // Update the cipher with the data to be encrypted
  let encrypted = cipher.update(data, 'utf8', 'base64');
  // Finalize the encryption process and get the rest of the encrypted data
  encrypted += cipher.final('base64');

  return encrypted;
}

/**
 * Decrypts data using a symmetric algorithm.
 * @param {string} encryptedData - The encrypted data to be decrypted.
 * @param {string} secretKey - The secret key for decryption.
 * @returns {string} - The decrypted data.
 */
function decryptData(encryptedData, secretKey) {
  // Check if the secret key is provided
  if (!secretKey) {
    throw new Error('Secret key is required for decryption.');
  }

  // Create a decipher using AES-256-CBC algorithm
  const decipher = crypto.createDecipher('aes-256-cbc', secretKey);

  // Update the decipher with the encrypted data to be decrypted
  let decrypted = decipher.update(encryptedData, 'base64', 'utf8');
  // Finalize the decryption process and get the rest of the decrypted data
  decrypted += decipher.final('utf8');

  return decrypted;
}

// Example usage:
try {
  // Secret key for encryption and decryption
  const secretKey = 'your-256-bit-secret-key';

  // Original data to encrypt
  const originalData = 'This is a secret message.';

  // Encrypting the data
  const encryptedData = encryptData(originalData, secretKey);
  console.log('Encrypted Data:', encryptedData);

  // Decrypting the data
  const decryptedData = decryptData(encryptedData, secretKey);
  console.log('Decrypted Data:', decryptedData);
} catch (error) {
  console.error('Error:', error.message);
}
