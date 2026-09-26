# Smart Thobe ID — SAIF Prototype

## Run it
1. Put these files in one folder.
2. Open `index.html` in a browser.
3. Tap **Run emergency demo**.
4. Open `qr.html` to generate a QR target.

## Make the QR public
For the competition, the QR/NFC tag needs a public HTTPS URL. A simple option is GitHub Pages:
- Create a GitHub repository.
- Upload these files.
- Enable Pages for the repository.
- Use the resulting HTTPS site URL in `qr.html`.

The final tag URL should look like:
`https://YOUR-SITE/emergency.html?id=SAIF-001`

## NFC
Write that exact HTTPS URL as an NDEF URL record to an NFC tag. The QR and NFC should lead to the same emergency page.

## Important
This is a competition prototype, not a production medical/emergency system.
Do NOT put real medical records, passwords, ID numbers, or private family information into this static demo.
The protected area currently demonstrates the UI concept only. Real security requires a server-side database, authentication, access controls, HTTPS, audit logging, and careful privacy design.
