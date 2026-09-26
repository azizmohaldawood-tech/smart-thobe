const params = new URLSearchParams(location.search);
const tag = params.get('id') || 'SAIF-001';
document.getElementById('personId').textContent = 'ID: ' + tag;

const status = document.getElementById('status');
document.getElementById('locationBtn').onclick = () => {
  if (!navigator.geolocation) {
    status.hidden = false;
    status.textContent = 'Location sharing is not supported on this browser.';
    return;
  }
  status.hidden = false;
  status.textContent = 'Requesting location permission…';
  navigator.geolocation.getCurrentPosition(
    p => {
      const lat = p.coords.latitude.toFixed(5);
      const lon = p.coords.longitude.toFixed(5);
      const maps = `https://www.google.com/maps?q=${lat},${lon}`;
      status.innerHTML = `Location ready: <a href="${maps}" target="_blank" rel="noopener">open map</a>`;
    },
    () => status.textContent = 'Location permission was not granted.'
  );
};

document.getElementById('contactBtn').onclick = () => {
  status.hidden = false;
  status.innerHTML = 'Demo contact action: <strong>Family contact</strong>. In a real version, this would use a secure backend/contact workflow.';
};

document.getElementById('unlockBtn').onclick = () => {
  const pin = prompt('Demo PIN: 2468');
  if (pin === '2468') {
    document.getElementById('protected').hidden = false;
    status.hidden = false;
    status.textContent = 'Protected demo opened. ⚠️ This PIN is NOT real security.';
  } else if (pin !== null) {
    status.hidden = false;
    status.textContent = 'Access denied.';
  }
};
