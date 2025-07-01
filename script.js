// script.js - Logging-enabled version

// Deployed Google Apps Script Web App URL
const LOG_ENDPOINT = 'https://script.google.com/macros/s/AKfycby_IJdm8W5aKaL-lcm5Gd_aFWwyHPQ7Sz9IE8VDFLH2OWaX8pj9i2N_nnRVwjqqlTSB/exec';

function getParam(key) {
  return new URLSearchParams(window.location.search).get(key) || 'Unknown';
}

async function logSubmission({storeName, storeId, auditorName, auditorId, score, percentage}) {
  try {
    await fetch(LOG_ENDPOINT, {
      method: 'POST',
      mode: 'no-cors',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({ storeName, storeId, auditorName, auditorId, score, percentage })
    });
    console.log('Logged audit to sheet');
  } catch (e) {
    console.warn('Logging failed', e);
  }
}

function calculateScore() {
  // TODO: Integrate your existing score calculation logic here
  return 0;
}

function calculatePercentage() {
  // TODO: Integrate your existing percentage calculation logic here
  return 0;
}

function downloadPDF({storeName, storeId, score, percentage}) {
  // TODO: Integrate your existing PDF generation and auto-download logic here
}

// Attach the event handler for submission
document.getElementById('submitBtn').addEventListener('click', () => {
  const storeName   = getParam('storeName');
  const storeId     = getParam('storeId');
  const auditorName = getParam('auditorName');
  const auditorId   = getParam('auditorId');

  const score      = calculateScore();
  const percentage = calculatePercentage();

  // Log data to Google Sheets
  logSubmission({ storeName, storeId, auditorName, auditorId, score, percentage });

  // Proceed with PDF download
  downloadPDF({ storeName, storeId, score, percentage });
});
