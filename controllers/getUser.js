const getUser = async (req, res, next) => {
    try {
        const { id } = req.params;

        const user = await User.findById(id)
            .select('name email phone username'); // ✅ only these

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json({ user });

    } catch (error) {
        next(error);
    }
};

module.exports = getUser;