const login = async (req, res) => {
  const { idToken } = req.body;

  try {
    const decodedToken = await auth.verifyIdToken(idToken);
    const uid = decodedToken.uid;
    const userRecord = await auth.getUser(uid);

    // Check if email belongs to admin
    const adminEmails = ['admin@example.com']; // your admin emails here
    const role = adminEmails.includes(userRecord.email) ? 'admin' : 'user';

    res.status(200).json({
      message: 'Login successful',
      uid: userRecord.uid,
      email: userRecord.email,
      role,  // Send role back to frontend
    });
  } catch (error) {
    res.status(401).json({
      message: 'Invalid or expired token',
      error: error.message,
    });
  }
};
