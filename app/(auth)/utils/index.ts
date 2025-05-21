function maskMobileNumber(mobile: string | number): string {
    const mobileStr = mobile.toString(); // Ensure it's a string
    if (mobileStr.length < 4) {
      throw new Error("Invalid mobile number");
    }
    // Replace all but the last 4 digits with asterisks
    return mobileStr.slice(0, -4).replace(/\d/g, '*') + mobileStr.slice(-4);
  }

export  {maskMobileNumber};
