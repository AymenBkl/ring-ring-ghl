function generateSmsReference() {
    const now = new Date();
    const datePart = now.toISOString().slice(0, 10).replace(/-/g, ''); // YYYYMMDD
    const timePart = now.getTime().toString().slice(-6); // last 6 digits of timestamp
    const randPart = Math.random().toString(36).substring(2, 6).toUpperCase(); // 4-char random
  
    return `SMS_${datePart}_${timePart}_${randPart}`;
  }
  
  module.exports = { generateSmsReference };