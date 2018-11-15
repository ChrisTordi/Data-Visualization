# - * - coding: utf - 8 -*-
import csv

required_fields = ['Gender',
                   'JobSatisfaction',
                   'ConvertedSalary',
                   'FormalEducation',
                   'CompanySize',
                   'Hobby',
                   'SkipMeals',
                   'HoursComputer',
                   'HoursOutside',
                   'OpenSource',
                   'Age',
                   'RaceEthnicity',
                   'NumberMonitors',
                   'EthicsChoice',
                   'Exercise']

value_mappings = {'Extremely satisfied': 'Satisfied',
                  'Moderately satisfied': 'Satisfied',
                  'Slightly satisfied': 'Neutral',
                  'Slightly dissatisfied': 'Neutral',
                  'Neither satisfied nor dissatisfied': 'Neutral',
                  'Moderately dissatisfied': 'Dissatisfied',
                  'Extremely dissatisfied': 'Dissatisfied'}


def is_qualified(row):
    return row['Country'] == 'United States' and row['Student'] == 'No'


def bucketize_salary(value):
    salary = float(value)
    if salary < 50000:
        return "$0-$50,000"
    if salary <= 100000:
        return "$51,000 - $100,000"
    elif salary <= 150000:
        return '$100,001 - $150,000'
    else:
        return "> $150000"


def bucketize_gender(value):
    if value == 'Male' or value == 'Female':
        return value
    else:
        return 'Non Binary'


def bucketize_education(value):
    education_mapping = {
        "Some college/university study without earning a degree": "No College Degree",
        "Secondary school (e.g. American high school, German Realschule or Gymnasium, etc.)": "No College Degree",
        "I never completed any formal education": "No College Degree",
        "Primary/elementary school": "No College Degree",
        "Bachelor’s degree (BA, BS, B.Eng., etc.)": "Undergrad Degree",
        "Associate degree": "Undergrad Degree",
        "Master’s degree (MA, MS, M.Eng., MBA, etc.)": "Graduate Degree",
        "Other doctoral degree (Ph.D, Ed.D., etc.)": "Graduate Degree",
        "Professional degree (JD, MD, etc.)": "Graduate Degree",
    }
    return education_mapping[value]


def bucketize_company_size(value):
    size_mapping = {
        '10,000 or more employees': '1,000 or more employees',
        '1,000 to 4,999 employees': '1,000 or more employees',
        '5,000 to 9,999 employees': '1,000 or more employees',
        '100 to 499 employees': '100 to 999 employees',
        '500 to 999 employees': '100 to 999 employees',
        '10 to 19 employees': 'Fewer than 100 employees',
        '20 to 99 employees': 'Fewer than 100 employees',
        'Fewer than 10 employees': 'Fewer than 100 employees',
    }
    return size_mapping[value]


def bucketize_skip_meals(value):
    if value[0] in 'D3':
        return 'More than 2 times per week'
    return value


def bucketize_hours_computer(value):
    if value[0] in '15L':
        return 'Less than 9 hours'
    return value


def bucketize_hours_outside(value):
    if value[0:2] in ['3 ', 'Ov']:
        return '> 2 hours'
    return value


def bucketize_age(value):
    age_mapping = {'55 - 64 years old': '45 years or older',
                   '18 - 24 years old': '0 - 18 years',
                   '65 years or older': '45 years or older',
                   '25 - 34 years old': '25 - 34 years old',
                   'Under 18 years old': '0 - 18 years',
                   '35 - 44 years old': '35 - 44 years old',
                   '45 - 54 years old': '45 years or older'}
    return age_mapping[value]


def bucketize_race(value):
    return value


def bucketize_monitors(value):
    if value[0] in 'M34':
        return '3 or more'
    return value


def bucketize_exercise(value):
    if value[0] in '13':
        return '1-4 times per week'
    elif value[0] == 'D':
        return '> 4 times per week'
    return value


def aggregate_data(field, value):
    if field == 'Gender':
        return bucketize_gender(value)
    elif field == "ConvertedSalary":
        return bucketize_salary(value)
    elif field == 'FormalEducation':
        return bucketize_education(value)
    elif field == 'CompanySize':
        return bucketize_company_size(value)
    elif field == 'SkipMeals':
        return bucketize_skip_meals(value)
    elif field == 'HoursComputer':
        return bucketize_hours_computer(value)
    elif field == 'HoursOutside':
        return bucketize_hours_outside(value)
    elif field == 'Age':
        return bucketize_age(value)
    elif field == 'RaceEthnicity':
        return bucketize_race(value)
    elif field == 'NumberMonitors':
        return bucketize_monitors(value)
    elif field == 'Exercise':
        return bucketize_exercise(value)
    if value in value_mappings:
        return value_mappings[value]
    else:
        return value


def create_new_row(row):
    new_row = []
    if not is_qualified(row): return None
    for field in required_fields:
        if row[field] == 'NA':
            return None
        new_row.append(aggregate_data(field, row[field]))
    return new_row


with open('survey_results_public.csv', encoding='utf8') as csv_file:
    with open('static/output_data.csv', 'w', encoding='utf8') as output_file:
        csv_reader = csv.DictReader(csv_file)
        csv_writer = csv.writer(output_file)
        csv_writer.writerow(required_fields)  # write header
        for row in csv_reader:
            new_row = create_new_row(row)
            if new_row:
                csv_writer.writerow(new_row)
