# Issue Tracker

This app provides a streamlined interface for managing project issues, tailored for a team of coders.

### Key features include:

* Dashboard: Overview of open, in-progress, and closed issues.
* Issues Listing: Detailed list of issues with filter, sort, and pagination functionality.
* Issue Details: Each issue has a specific details page with edit, delete, and assign user functionalities (for authenticated users only).

Stack: Next.js (TypeScript), NextAuth (Google Provider), Prisma (MySQL).

Link: https://issue-tracker-itayg43.vercel.app

Deploy using: Vercel, Railway.

## Setup Locally

1. Run a MySQL server in a docker container:
```
docker run -p 3306:3306 --name mysql -e MYSQL_ROOT_PASSWORD=password -e MYSQL_ROOT_HOST=% -e MYSQL_DATABASE=issue-tracker -d mysql/mysql-server
```

2. Create a .env file and set the needed values as shown in the .env.example file.

3. Run:
```
npm i && npx prisma migrate dev --name init && npm run dev
```
