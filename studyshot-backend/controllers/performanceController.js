// controllers/performanceController.js
const { db } = require('../firebase');  // Firestore instance

const storePerformance = async (req, res) => {
  const { userId, quizId, score, timeSpent } = req.body;

  try {
    const studentRef = db.collection('students').doc(userId);  // Firestore reference
    const performanceData = {
      quizId,
      score,
      timeSpent,
      date: new Date().toISOString(),
    };

    // Save the performance data in Firestore
    await studentRef.set({ performance: performanceData }, { merge: true });
    res.status(200).send('Performance data saved successfully');
  } catch (error) {
    res.status(500).send('Error saving performance data: ' + error.message);
  }
};

module.exports = { storePerformance };
