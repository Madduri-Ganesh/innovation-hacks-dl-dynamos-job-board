import json

def is_job_related(subject):
    """Check if the email subject is related to jobs."""
    if not subject:
        return False

    job_keywords = [
        'job', 'career', 'position', 'application', 'interview',
        'offer', 'recruiter', 'assessment', 'screening', 'hiring', 'candidate', 'role', 'opening'
    ]

    subject_lower = subject.lower()
    return any(keyword in subject_lower for keyword in job_keywords)

def filter_job_related_emails(input_file, output_file):
    # Load the emails from the input file
    with open(input_file, 'r') as f:
        emails = json.load(f)

    # Filter only job-related emails
    job_emails = [email for email in emails if is_job_related(email['subject'])]

    # Save the filtered emails to the output file
    with open(output_file, 'w') as f:
        json.dump(job_emails, f, indent=4)

    print(f"Filtered {len(job_emails)} job-related emails out of {len(emails)} total emails.")
    print(f"Saved to '{output_file}' successfully!")

if __name__ == "__main__":
    input_file = '../data/emailsss_data.json'
    output_file = '../data/filtered_emails.json'
    filter_job_related_emails(input_file, output_file)
