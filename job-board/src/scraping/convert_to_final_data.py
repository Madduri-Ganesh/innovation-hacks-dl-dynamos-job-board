import json

def slugify(text):
    return text.lower().replace(' ', '-')

def convert_to_final_data(input_file, output_file_js):
    # Step 1: Read the input JSON
    with open(input_file, "r") as f:
        data = json.load(f)

    output = {}

    # Step 2: Process it into the desired format
    for company, updates in data.items():
        slug = slugify(company)
        output[slug] = {
            "companyName": company,
            "updates": []
        }
        for update in updates:
            cleaned_date = update["date"].split(',', 1)[-1].strip() if ',' in update["date"] else update["date"]
            output[slug]["updates"].append({
                "date": cleaned_date,
                "status": update["status"]
            })

    # Step 3: Convert output to JSON string first
    json_string = json.dumps(output, indent=4)

    # Step 4: Write the exportable JS file
    with open(output_file_js, "w") as f:
        f.write("export const final_email_data = ")
        f.write(json_string)
        f.write(";")

    print(f"✅ Final exportable JavaScript file created successfully at '{output_file_js}'")

    return output
