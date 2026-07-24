document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('generatorForm');
    const fileInput = document.getElementById('csvFile');
    const dropArea = document.getElementById('dropArea');
    const fileMsg = document.querySelector('.file-msg');
    const submitBtn = document.getElementById('submitBtn');
    const btnText = document.querySelector('.btn-text');
    const spinner = document.getElementById('spinner');
    const statusMessage = document.getElementById('statusMessage');

    // Drag and drop functionality
    ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
        dropArea.addEventListener(eventName, preventDefaults, false);
    });

    function preventDefaults(e) {
        e.preventDefault();
        e.stopPropagation();
    }

    ['dragenter', 'dragover'].forEach(eventName => {
        dropArea.addEventListener(eventName, () => {
            dropArea.classList.add('is-active');
        }, false);
    });

    ['dragleave', 'drop'].forEach(eventName => {
        dropArea.addEventListener(eventName, () => {
            dropArea.classList.remove('is-active');
        }, false);
    });

    dropArea.addEventListener('drop', (e) => {
        let dt = e.dataTransfer;
        let files = dt.files;
        fileInput.files = files;
        updateFileMsg();
    }, false);

    fileInput.addEventListener('change', updateFileMsg);

    function updateFileMsg() {
        if (fileInput.files.length > 0) {
            fileMsg.textContent = fileInput.files[0].name;
            fileMsg.style.color = 'var(--text-main)';
        } else {
            fileMsg.textContent = 'Choose a CSV file or drag it here';
            fileMsg.style.color = 'var(--text-muted)';
        }
    }

    function showStatus(msg, type) {
        statusMessage.textContent = msg;
        statusMessage.className = `status-message ${type}`;
        statusMessage.classList.remove('hidden');
    }

    // Form submission
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        if (!fileInput.files || fileInput.files.length === 0) {
            showStatus('Please select a CSV file.', 'error');
            return;
        }

        const formData = new FormData();
        formData.append('csvFile', fileInput.files[0]);
        formData.append('monthYear', document.getElementById('monthYear').value);

        // Update UI to loading state
        submitBtn.disabled = true;
        btnText.textContent = 'Generating...';
        spinner.classList.remove('hidden');
        statusMessage.classList.add('hidden');

        try {
            const response = await fetch('/api/generate', {
                method: 'POST',
                body: formData
            });

            if (!response.ok) {
                const errData = await response.json().catch(() => ({}));
                throw new Error(errData.error || `Server error: ${response.status}`);
            }

            // Get the PDF blob
            const blob = await response.blob();
            
            // Create a temporary link to download the PDF
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.style.display = 'none';
            a.href = url;
            a.download = `Generated_Pricelist.pdf`;
            document.body.appendChild(a);
            a.click();
            window.URL.revokeObjectURL(url);
            
            showStatus('✅ PDF generated and downloaded successfully!', 'success');
        } catch (error) {
            console.error('Error generating PDF:', error);
            showStatus(`❌ Failed to generate PDF: ${error.message}`, 'error');
        } finally {
            // Reset UI
            submitBtn.disabled = false;
            btnText.textContent = 'Generate PDF';
            spinner.classList.add('hidden');
        }
    });
});
