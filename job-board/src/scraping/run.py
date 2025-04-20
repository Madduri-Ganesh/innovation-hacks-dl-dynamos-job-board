import scrape
import scrape_jobs
import scrape_jobs_seg

def run_scrape():
    print("\nRunning scrape.py...\n" + "="*40)
    scrape.main()

def run_scrape_jobs():
    print("\nRunning scrape_jobs.py...\n" + "="*40)
    scrape_jobs.filter_job_related_emails('../data/emailsss_data.json', '../data/filtered_emails.json')

def run_scrape_jobs_seg():
    print("\nRunning scrape_jobs_seg.py...\n" + "="*40)
    input_file = '../data/filtered_emails.json'
    output_file = '../data/emails_data.json'
    company_emails = scrape_jobs_seg.segregate_emails_by_company(input_file)
    scrape_jobs_seg.print_company_emails(company_emails)
    scrape_jobs_seg.save_company_emails(company_emails, output_file)

def main():
    run_scrape()
    run_scrape_jobs()
    run_scrape_jobs_seg()

if __name__ == "__main__":
    main()
