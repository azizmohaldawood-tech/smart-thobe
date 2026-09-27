const people = {
  "SAIF-001": {
    name: "Aziz",
    contact: "Family Contact",
    blood: "O+",
    medical: "No medical information added"
  },

  "SAIF-002": {
    name: "Test Person",
    contact: "Emergency Contact",
    blood: "A+",
    medical: "Demo medical information"
  }
};

const params = new URLSearchParams(location.search);

// Handles both:
// ?id=SAIF-001
// and the accidental ?id=id=SAIF-001
const rawTag = params.get("id") || "SAIF-001";
const tag = rawTag.replace(/^id=/, "").trim();

const savedPeople =
  JSON.parse(localStorage.getItem("smartThobePeople") || "{}");

const person = savedPeople[tag] || people[tag] || {
  name: "Unknown Person",
  contact: "No emergency contact saved",
  blood: "Not provided",
  medical: "Not provided"
};

function savePeople() {
  localStorage.setItem(
    "smartThobePeople",
    JSON.stringify(savedPeople)
  );
}

// Show ID and person
document.getElementById("personId").textContent =
  "ID: " + tag;

document.getElementById("personName").textContent =
  person.name;

document.getElementById("contactInfo").textContent =
  person.contact;

const status = document.getElementById("status");

// Location
document.getElementById("locationBtn").onclick = () => {
  if (!navigator.geolocation) {
    status.hidden = false;
    status.textContent =
      "Location sharing is not supported on this browser.";
    return;
  }

  status.hidden = false;
  status.textContent =
    "Requesting location permission…";

  navigator.geolocation.getCurrentPosition(
    p => {
      const lat = p.coords.latitude.toFixed(5);
      const lon = p.coords.longitude.toFixed(5);

      const maps =
        `https://www.google.com/maps?q=${lat},${lon}`;

      status.innerHTML =
        `Location ready: <a href="${maps}" target="_blank" rel="noopener">open map</a>`;
    },

    () => {
      status.textContent =
        "Location permission was not granted.";
    }
  );
};

// Emergency contact
document.getElementById("contactBtn").onclick = () => {
  status.hidden = false;

  status.innerHTML =
    `Demo contact action: <strong>${person.contact}</strong>`;
};

// Unlock protected information
document.getElementById("unlockBtn").onclick = () => {
  const pin = prompt("Demo PIN: 2468");

  if (pin === "2468") {
    document.getElementById("protected").hidden = false;

    document.getElementById("protectedContact").textContent =
      `Blood type: ${person.blood} • Medical: ${person.medical}`;

    status.hidden = false;

    status.textContent =
      `Protected demo opened for ${person.name}. ⚠️ Demo only.`;
  }

  else if (pin !== null) {
    status.hidden = false;
    status.textContent = "Access denied.";
  }
};

// Edit information
document.getElementById("editBtn").onclick = () => {
  document.getElementById("editPanel").hidden = false;

  document.getElementById("editName").value =
    person.name;

  document.getElementById("editContact").value =
    person.contact;

  document.getElementById("editBlood").value =
    person.blood;

  document.getElementById("editMedical").value =
    person.medical;
};

// Save information
document.getElementById("saveBtn").onclick = () => {
  savedPeople[tag] = {
    name: document.getElementById("editName").value,
    contact: document.getElementById("editContact").value,
    blood: document.getElementById("editBlood").value,
    medical: document.getElementById("editMedical").value
  };

  savePeople();

  person.name = savedPeople[tag].name;
  person.contact = savedPeople[tag].contact;
  person.blood = savedPeople[tag].blood;
  person.medical = savedPeople[tag].medical;

  document.getElementById("personName").textContent =
    person.name;

  document.getElementById("contactInfo").textContent =
    person.contact;

  status.hidden = false;

  status.textContent =
    "Information saved successfully! ✅";
};