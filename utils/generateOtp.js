const generateOtp = (email) => {
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    console.log(`OTP SERVICE: Email: ${email} - OTP: ${otp}`);
    return otp;
};

module.exports = generateOtp;
