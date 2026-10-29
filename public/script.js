/**
 * Pure Tree ® Pricelist Studio - Frontend Controller
 * Follows ponytail principles: clean vanilla JS, zero dependencies, minimal & robust.
 */

document.addEventListener('DOMContentLoaded', () => {
    const monthYearInput = document.getElementById('monthYear');
    const btnCurrentMonth = document.getElementById('btnCurrentMonth');
    const actionButtons = document.querySelectorAll('.action-btn');
    const statusToast = document.getElementById('statusToast');
    const statusIcon = document.getElementById('statusIcon');
    const statusTitle = document.getElementById('statusTitle');
    const statusDesc = document.getElementById('statusDesc');
    const statusClose = document.getElementById('statusClose');

    let toastTimeout = null;

    // 1. Compute & Prepopulate Current Month & Year
    function getCurrentMonthYear() {
        const now = new Date();
        const monthName = now.toLocaleString('en-US', { month: 'long' }).toUpperCase();
        const year = now.getFullYear();
        return `${monthName} ${year}`;
    }

    const defaultMonthYear = getCurrentMonthYear();
    if (monthYearInput && !monthYearInput.value) {
        monthYearInput.value = defaultMonthYear;
    }

    if (btnCurrentMonth) {
        btnCurrentMonth.addEventListener('click', () => {
            monthYearInput.value = getCurrentMonthYear();
            monthYearInput.focus();
        });
    }

    // 2. Toast Notification Helper
    function showToast(type, title, message, autoDismiss = false) {
        if (toastTimeout) {
            clearTimeout(toastTimeout);
            toastTimeout = null;
        }

        statusToast.className = `status-toast ${type}`;
        statusTitle.textContent = title;
        statusDesc.textContent = message;

        // Custom SVGs based on toast type
        if (type === 'success') {
            statusIcon.innerHTML = `
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                    <polyline points="22 4 12 14.01 9 11.01"></polyline>
                </svg>
            `;
        } else if (type === 'error') {
            statusIcon.innerHTML = `
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <circle cx="12" cy="12" r="10"></circle>
                    <line x1="15" y1="9" x2="9" y2="15"></line>
                    <line x1="9" y1="9" x2="15" y2="15"></line>
                </svg>
            `;
        } else {
            // Info / Loading
            statusIcon.innerHTML = `
                <svg class="spinner" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <circle cx="12" cy="12" r="10" stroke-opacity="0.25"></circle>
                    <path d="M12 2a10 10 0 0 1 10 10" stroke-linecap="round"></path>
                </svg>
            `;
        }

        statusToast.classList.remove('hidden');

        if (autoDismiss) {
            toastTimeout = setTimeout(() => {
                statusToast.classList.add('hidden');
            }, 8000);
        }
    }

    if (statusClose) {
        statusClose.addEventListener('click', () => {
            statusToast.classList.add('hidden');
        });
    }

    // 3. Button Click & PDF Generation Flow
    const TYPE_LABELS = {
        complete: 'Complete Catalog',
        hampers: 'Gift Hampers',
        normal: 'Normal Products'
    };

    actionButtons.forEach(btn => {
        btn.addEventListener('click', async () => {
            const type = btn.getAttribute('data-type') || 'complete';
            const typeLabel = TYPE_LABELS[type] || 'Catalog';
            const card = btn.closest('.generator-card');
            const btnText = btn.querySelector('.btn-text');
            const spinner = btn.querySelector('.spinner');
            const originalBtnHTML = btnText.innerHTML;

            const monthYear = (monthYearInput.value || defaultMonthYear).trim();

            // Disable all action buttons while processing
            actionButtons.forEach(b => {
                b.disabled = true;
            });

            if (card) card.classList.add('is-active');
            if (spinner) spinner.classList.remove('hidden');
            btnText.innerHTML = `<span>Generating ${typeLabel}...</span>`;

            showToast(
                'info',
                `Generating ${typeLabel} PDF...`,
                'Pulling live sheet data, rendering layouts & compiling print-ready PDF. Please wait ~10-15 seconds.'
            );

            const startTime = performance.now();

            try {
                const response = await fetch('/api/generate', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        monthYear: monthYear,
                        type: type
                    })
                });

                if (!response.ok) {
                    const errData = await response.json().catch(() => ({}));
                    throw new Error(errData.error || `Server error (${response.status}): ${response.statusText}`);
                }

                // Parse disposition filename if present
                let downloadFilename = `Pure_Tree_${typeLabel.replace(/\s+/g, '_')}_${monthYear.replace(/[^a-zA-Z0-9_-]/g, '_')}.pdf`;
                const disposition = response.headers.get('content-disposition');
                if (disposition && disposition.includes('filename=')) {
                    const match = disposition.match(/filename="?([^";]+)"?/);
                    if (match && match[1]) {
                        downloadFilename = match[1];
                    }
                }

                // Download the generated PDF blob
                const blob = await response.blob();
                const blobUrl = window.URL.createObjectURL(blob);
                const tempLink = document.createElement('a');
                tempLink.style.display = 'none';
                tempLink.href = blobUrl;
                tempLink.download = downloadFilename;
                document.body.appendChild(tempLink);
                tempLink.click();
                document.body.removeChild(tempLink);
                window.URL.revokeObjectURL(blobUrl);

                const duration = ((performance.now() - startTime) / 1000).toFixed(1);
                showToast(
                    'success',
                    `✅ ${typeLabel} PDF Ready!`,
                    `Successfully generated and downloaded "${downloadFilename}" in ${duration}s.`,
                    true
                );

            } catch (err) {
                console.error(`[PDF Generation Error - ${type}]:`, err);
                showToast(
                    'error',
                    `❌ Generation Failed (${typeLabel})`,
                    err.message || 'An unexpected error occurred while generating the PDF. Please check your sheet permissions or try again.'
                );
            } finally {
                // Restore button states
                actionButtons.forEach(b => {
                    b.disabled = false;
                });
                if (card) card.classList.remove('is-active');
                if (spinner) spinner.classList.add('hidden');
                btnText.innerHTML = originalBtnHTML;
            }
        });
    });
});
