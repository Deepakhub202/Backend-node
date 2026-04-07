const verifyOtp = (inputOtp, correctOtp) => {
    if (inputOtp === correctOtp) {
        return true;
    }
    return false;
};

module.exports = verifyOtp;
