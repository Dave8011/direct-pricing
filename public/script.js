document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('generatorForm');
    const submitBtn = document.getElementById('submitBtn');
    const btnText = document.querySelector('.btn-text');
    const spinner = document.getElementById('spinner');
    const statusMessage = document.getElementById('statusMessage');

    function showStatus(msg, type) {
        statusMessage.textContent = msg;
        statusMessage.className = `status-message ${type}`;
        statusMessage.classList.remove('hidden');
    }

    // Form submission
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const monthYear = document.getElementById('monthYear').value;

        // Update UI to loading state
        submitBtn.disabled = true;
        btnText.textContent = 'Generating...';
        spinner.classList.remove('hidden');
        statusMessage.classList.add('hidden');

        try {
            const response = await fetch('/api/generate', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ monthYear: monthYear })
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
            a.download = `Pure Tree Price List - ${document.getElementById('monthYear').value || 'Generated'}.pdf`;
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
