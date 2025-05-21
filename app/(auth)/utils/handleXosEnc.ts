function xorEncrypt(text: string, key: string) {
  let result = "";
  for (let i = 0; i < text.length; i++) {
    result += String.fromCharCode(
      text.charCodeAt(i) ^ key.charCodeAt(i % key.length)
    );
  }
  return result;
}

function encode(text: string, key: string) {
  const encrypted = xorEncrypt(text, key);
  return btoa(encrypted); // Convert the XORed text to base64
}

// Decode function (Base64 and XOR decryption)
function decode(base64String: string, key: string) {
  const encrypted = atob(base64String); // Decode base64 to get encrypted text
  return xorEncrypt(encrypted, key); // XOR decrypt using the same key
}

export { encode, decode };
