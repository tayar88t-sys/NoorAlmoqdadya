// Job Application Form Handler - Saves to localStorage for Admin Panel

// Handle job application form submission
document.getElementById('job-application-form').addEventListener('submit', async function(e) {
    e.preventDefault();

    const form = e.target;
    const formData = new FormData(form);

    // Validate required fields
    const name = formData.get('name');
    const age = formData.get('age');
    const phone = formData.get('phone');
    const address = formData.get('address');
    const id_number = formData.get('id_number');
    const job_position = formData.get('job_position');
    const id_front = formData.get('id_front');
    const id_back = formData.get('id_back');
    const terms = document.getElementById('terms').checked;

    if (!name || !age || !phone || !address || !id_number || !job_position || !id_front || !id_back || !terms) {
        showAlert('يرجى ملء جميع الحقول المطلوبة وتحميل الصور', 'error');
        return;
    }

    // Show loading state
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin rtl:ml-2 rtl:mr-0"></i> جاري الإرسال...';
    submitBtn.disabled = true;

    try {
        // Convert images to base64 for storage
        const id_front_base64 = await convertFileToBase64(id_front);
        const id_back_base64 = await convertFileToBase64(id_back);
        
        let photo_base64 = null;
        if (document.getElementById('photo').files.length > 0) {
            photo_base64 = await convertFileToBase64(document.getElementById('photo').files[0]);
        }

        // Create application object
        const application = {
            id: Date.now().toString(),
            fullName: name,
            age: age,
            phone: phone,
            address: address,
            idNumber: id_number,
            maritalStatus: formData.get('marital_status'),
            position: job_position,
            experience: formData.get('experience') || 'لم يتم إدراج خبرة سابقة',
            skills: formData.get('skills') || 'لم يتم إدراج مهارات',
            notes: formData.get('notes') || 'لا توجد ملاحظات',
            idFront: id_front_base64,
            idBack: id_back_base64,
            photo: photo_base64,
            submittedAt: new Date().toISOString(),
            status: 'pending'
        };

        // Save to localStorage (for admin panel)
        const existingApplications = JSON.parse(localStorage.getItem('jobApplications')) || [];
        existingApplications.push(application);
        localStorage.setItem('jobApplications', JSON.stringify(existingApplications));

        // Show success message
        showAlert('تم استقبال طلبك بنجاح! سنتواصل معك قريباً', 'success');
        form.reset();
        
        // Reset file display names
        document.getElementById('id_front_name').textContent = 'لم يتم اختيار ملف';
        document.getElementById('id_back_name').textContent = 'لم يتم اختيار ملف';
        document.getElementById('photo_name').textContent = 'لم يتم اختيار ملف';
        
    } catch (error) {
        console.error('Error saving application:', error);
        showAlert('حدث خطأ أثناء إرسال الطلب. يرجى المحاولة مرة أخرى', 'error');
    }

    // Reset button state
    submitBtn.innerHTML = originalText;
    submitBtn.disabled = false;
});

// Convert file to base64
function convertFileToBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });
}

// Show alert message
function showAlert(message, type = 'info') {
    // Remove any existing alerts first
    const existingAlerts = document.querySelectorAll('.job-alert');
    existingAlerts.forEach(alert => alert.remove());
    
    const alertDiv = document.createElement('div');
    alertDiv.className = `job-alert fixed top-24 left-1/2 transform -translate-x-1/2 z-[9999] px-6 py-4 rounded-lg shadow-2xl ${
        type === 'success' ? 'bg-green-500 text-white' :
        type === 'error' ? 'bg-red-500 text-white' :
        'bg-blue-500 text-white'
    }`;
    alertDiv.innerHTML = `
        <div class="flex items-center gap-3">
            <i class="fas fa-${
                type === 'success' ? 'check-circle' :
                type === 'error' ? 'exclamation-circle' :
                'info-circle'
            }"></i>
            <span>${message}</span>
        </div>
    `;
    document.body.appendChild(alertDiv);

    setTimeout(() => {
        alertDiv.style.animation = 'fadeOut 0.3s ease forwards';
        setTimeout(() => alertDiv.remove(), 300);
    }, 4000);
}
