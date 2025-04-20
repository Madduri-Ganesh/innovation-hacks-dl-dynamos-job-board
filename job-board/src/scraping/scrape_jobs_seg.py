import json
from collections import defaultdict

def extract_company_and_status(subject):
    """
    Extract company name and job status from subject.
    Looks for '-' or ':' or splits by first space.
    """
    if '-' in subject:
        parts = subject.split('-', 1)
    elif ':' in subject:
        parts = subject.split(':', 1)
    else:
        parts = subject.split(' ', 1)  # fallback: split by first space

    company = parts[0].strip()
    status = parts[1].strip() if len(parts) > 1 else 'Job Update'
    return company, status

def segregate_emails_by_company(input_file):
    # Load the filtered emails
    with open(input_file, 'r') as f:
        emails = json.load(f)

    company_emails = defaultdict(list)

    for email in emails:
        subject = email.get('subject', '')
        date = email.get('date', '')

        if subject:
            company, status = extract_company_and_status(subject)
            company_emails[company].append({
                'status': status,
                'date': date
            })

    return company_emails

def print_company_emails(company_emails):
    print("\n--- Segregated Emails by Company ---\n")
    for company, updates in company_emails.items():
        print(f"Company: {company}")
        for update in updates:
            print(f"  - {update['status']} (Date: {update['date']})")
        print("-" * 50)

def save_company_emails(company_emails, output_file):
    with open(output_file, 'w') as f:
        json.dump(company_emails, f, indent=4)
    print(f"\nSaved segregated emails into '{output_file}' successfully!")

if __name__ == "__main__":
    input_file = '../data/filtered_emails.json'
    output_file = '../data/emails_data.json'

    company_emails = segregate_emails_by_company(input_file)
    print_company_emails(company_emails)
    save_company_emails(company_emails, output_file)
