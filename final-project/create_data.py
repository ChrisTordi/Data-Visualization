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


def aggregate_data(field, value):
    if field == 'Gender':
        if value == 'Male' or value == 'Female':
            return value
        else: return 'Non-Binary'
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

# total_salary = 0
# num = 0
with open('survey_results_public.csv', encoding='utf8') as csv_file:
    with open('output_data.csv', 'w', encoding='utf8') as output_file:
        csv_reader = csv.DictReader(csv_file)
        csv_writer = csv.writer(output_file)
        csv_writer.writerow(required_fields) # write header
        for row in csv_reader:
            new_row = create_new_row(row)
            if new_row:
                csv_writer.writerow(new_row)
                # total_salary += float(row["ConvertedSalary"])
                # num += 1
