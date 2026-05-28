# Module List

## MOD-001 Contact Form Submission

### Goal
Allow visitors to submit a basic sales inquiry from the marketing site.

### Includes
- Name, email, company, and message fields
- Required-field validation
- Email notification to sales inbox
- Local CSV backup
- Success and failure messages

### Excludes
- CRM integration
- Spam scoring service
- User accounts
- Admin dashboard
- Analytics dashboard

### Acceptance
- Empty required fields are rejected.
- Valid submission sends email notification.
- Valid submission appends a row to CSV backup.
- User sees success message after valid submission.
