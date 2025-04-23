# 🚀🥉 Won 3rd Place at InnovationHacks 2025 (Qruil: Job Board Features track) 🏆🥉

# JobPulse

JobPulse is a job and internship portal tailored to make recruitment easier for both students and recruiters. The idea came from the real-world difficulties students face while navigating overwhelming job portals, understanding timelines, and finding opportunities that align with their skill sets and schedules.

## 💡 Inspiration

We’ve all experienced how confusing and exhausting job hunting can get—multiple applications, unclear deadlines, and inconsistent follow-ups. JobPulse was born to simplify this experience. Our goal is to build something meaningful that addresses the actual needs of students and makes it easier for recruiters to manage and fill roles efficiently.

## 🛠️ What It Does

- **Students** can search, view, and apply for jobs and internships.
- **Recruiters** can post jobs, track hiring periods, and reactivate listings as needed.
- The platform automatically tracks the hiring period and updates job statuses accordingly.
- A clean recruiter dashboard allows editing and managing all postings in one place.
- All updates sync with the backend in real-time.

## 🔧 How We Built It

- **Frontend**: Built using React for a modular and responsive UI. It handles job posting, listing, form submission, and real-time status display.
- **Backend**: Flask (Python) API connects to MongoDB Atlas to handle job records, recruiter data, and student applications.
- **Automation**: On each frontend render, job status is automatically updated by comparing the hiring period with the posting date.
- **Cloud Integration**: MongoDB Atlas was used for ease of use, scalability, and secure remote access.

## 🧠 Challenges We Faced

- Getting real-time job status updates right (especially with hiring period expiration).
- Managing asynchronous data flow between frontend and backend (especially CORS issues).
- Handling merge conflicts and syncing progress when multiple people worked on different features.
- Designing UI/UX that works well across different types of users—recruiters and students.

## ✅ Accomplishments

- A fully functional and complete prototype that feels real.
- Job status automation with reactivation logic.
- Created a dashboard that allows seamless job tracking.
- Improved student job application experience by removing clutter and focusing on what matters.

## 📘 What We Learned

- The importance of designing for both ends of a platform—students and recruiters.
- Automating simple tasks (like status updates) saves time and reduces user friction.
- Even small touches like status badges or reactivation buttons improve UX significantly.
- Debugging CORS and syncing with MongoDB Atlas taught us a lot about full-stack development.

## 🚀 What’s Next

- **Email Tracking Enhancements**: We plan to use domain-specific emails to track communication between recruiters and applicants. We’ll also explore using NLP to analyze email subjects and classify messages automatically.
- **Hiring Period Notifications**: Recruiters will soon receive email alerts when a job is about to expire or becomes inactive, helping them take action quickly.
- **Experience Estimation via ML**: We plan to use pre-trained models to analyze resumes and experience descriptions to provide better candidate-job matches.

---

This project was built with both practicality and scalability in mind. We hope to continue improving JobPulse and eventually use it in real-world campus hiring workflows.
