// Firebase Handler for Job Applications

// Upload image to Firebase Storage
async function uploadImageToFirebase(file, filename) {
    try {
        const storageRef = storage.ref(`job-applications/${filename}`);
        await storageRef.put(file);
        return await storageRef.getDownloadURL();
    } catch (error) {
        console.error('Error uploading image:', error);
        throw error;
    }
}

// Save application to Firestore
async function saveApplicationToFirestore(application) {
    try {
        await db.collection('jobApplications').add(application);
        return true;
    } catch (error) {
        console.error('Error saving application:', error);
        throw error;
    }
}

// Get all applications from Firestore
async function getApplicationsFromFirestore() {
    try {
        const snapshot = await db.collection('jobApplications').orderBy('submittedAt', 'desc').get();
        const applications = [];
        snapshot.forEach(doc => {
            applications.push({ id: doc.id, ...doc.data() });
        });
        return applications;
    } catch (error) {
        console.error('Error getting applications:', error);
        throw error;
    }
}

// Update application status in Firestore
async function updateApplicationStatus(applicationId, status) {
    try {
        await db.collection('jobApplications').doc(applicationId).update({ status });
        return true;
    } catch (error) {
        console.error('Error updating application status:', error);
        throw error;
    }
}
