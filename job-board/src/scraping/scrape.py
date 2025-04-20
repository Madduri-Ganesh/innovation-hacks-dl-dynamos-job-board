from google_auth_oauthlib.flow import InstalledAppFlow
from googleapiclient.discovery import build
import json  # or import base64, email if needed


# Define the OAuth scope
SCOPES = ['https://www.googleapis.com/auth/gmail.readonly']

def authenticate_gmail():
    """Authenticate the user and create the Gmail API service."""
    flow = InstalledAppFlow.from_client_secrets_file('../data/credentials.json', SCOPES)
    creds = flow.run_local_server(port=0)
    service = build('gmail', 'v1', credentials=creds)
    return service

def search_messages(service, query):
    """Search for specific messages matching the query."""
    print(f"Searching Gmail with query: {query}")
    result = service.users().messages().list(userId='me', q=query).execute()
    messages = result.get('messages', [])
    print(f"Number of messages found: {len(messages)}")
    return messages

def get_message_detail(service, msg_id):
    """Fetch the Subject and Date of a single message."""
    message = service.users().messages().get(userId='me', id=msg_id, format='metadata', metadataHeaders=['Subject', 'Date']).execute()
    payload = message.get('payload')
    headers = payload.get('headers')
    
    subject = None
    date = None

    for header in headers:
        if header['name'] == 'Subject':
            subject = header['value']
        if header['name'] == 'Date':
            date = header['value']
    
    return subject, date

def main():
    service = authenticate_gmail()

    # TEST: Remove the search query temporarily
    query = ''  # <--- empty query fetches all inbox emails
    messages = search_messages(service, query)
    
    emails_data = []  # Create a list to store email details

    if not messages:
        print("No matching emails found.")
    else:
        print(f"Found {len(messages)} email(s):")
        for msg in messages:
            subject, date = get_message_detail(service, msg['id'])
            print(f"Subject: {subject}")
            print(f"Date: {date}")
            print("-" * 50)

            # Add each email's Subject and Date to the list
            emails_data.append({
                "subject": subject,
                "date": date
            })

    if emails_data:  # Only save if there is data
        with open('../data/emailsss_data.json', 'w') as f:
            json.dump(emails_data, f, indent=4)
            print("\nAll emails saved to 'emails_data.json' successfully!")
    else:
        print("\nNo emails to save, so no JSON file created.")

if __name__ == '__main__':
    main()

