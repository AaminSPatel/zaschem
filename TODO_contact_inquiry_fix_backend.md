# Contact Inquiry Submit Fix (Backend)

- [x] Update `backend/src/controllers/contactController_FIXED.js` to map frontend payload fields to DB schema fields (service -> serviceInterested).
- [x] Add validation + clearer 400 responses when required fields are missing.
- [ ] Ensure controller returns success response only after DB insert.

- [ ] (Optional) Update frontend to send `serviceInterested` instead of `service` if still failing.
- [ ] Test by submitting contact form and confirming new record appears in MongoDB.

