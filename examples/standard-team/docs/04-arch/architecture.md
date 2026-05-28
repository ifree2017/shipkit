# Architecture

## Components

- Lead intake frontend
- Lead API endpoint
- Lead storage table
- Notification adapter
- Internal review list

## Data Flow

Visitor form → API validation → storage → notification → review list.

## Risks

- Notification sandbox must be confirmed before production.
- Storage schema should remain minimal until reporting needs are confirmed.
