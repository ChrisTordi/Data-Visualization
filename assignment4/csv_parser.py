import csv
import sys
import os
import io

point_data = {} # key = point name, value = list of relevant data



'''
    scrapes csv row by row
    adds relevant data to point dictionary
'''
def scrape_csv(file_name):
    with open(file_name, newline='') as csvfile:
        reader = csv.reader(csvfile, delimiter=',')
        #writer = csv.writer(csvfile, delimiter=',', quotechar='"', quoting=csv.QUOTE_MINIMAL)

        big_list = []
        point_data_list = []

        for row in reader:
            point_data_list.clear()
            for i in range(5,len(row)):
                point_data_list.append(row[i])

            big_list.append(point_data_list.copy())

        #print(big_list)
        write_csv(calculate_avg(big_list))


def write_csv(lst):
    with open('output_file.csv', mode='w') as output_file:
        writer = csv.writer(output_file, delimiter=',', quotechar='"', quoting=csv.QUOTE_MINIMAL)
        writer.writerow(['Spouse', 'Children', 'ACT_CAREHH','ACT_CARENHH',	'ACT_EDUC',	'ACT_FOOD',	'ACT_GOVSERV'	,'ACT_HHACT'	,'ACT_HHSERV',	'ACT_PCARE',	'ACT_PHONE',	'ACT_PROFSERV',	'ACT_PURCH',	'ACT_RELIG',	'ACT_SOCIAL',	'ACT_SPORTS',	'ACT_TRAVEL',	'ACT_VOL',	'ACT_WORK'])
        for row in lst:
            #print(row)
            writer.writerow(row)





'''
'''
def calculate_avg(big_list):
    spouse_lst = ['1','2','3']
    child_lst = ['0','1','2','3','4','5','6','7','8','10']
    return_lst = []

    for sp in spouse_lst:
        for child in child_lst:
            sum_lst = []
            count = 0
            for lst in big_list:
                #print(lst)
                if (lst[0] == sp and lst[1] == child):
                    #print("kljsdlkfjsdlkfjdslkjflksd")
                    count += 1
                    sum_lst.append(map(int, lst.copy()))

            temp_lst = [sum(x) for x in zip(*sum_lst)]


            print("====================")
            print("Spouse Value: " , sp)
            print("Child Value: " , child)
            print("Temp list count: ", len(sum_lst))
            print("Count: " , count)
            print("====================")


            if (count > 0):
                avg_lst = [x / count for x in temp_lst.copy()]
                return_lst.append(avg_lst.copy())
                avg_lst.clear()

            sum_lst.clear()
            temp_lst.clear()

    return(return_lst)

'''
    load csv file and print output
'''
def main():
    if len(sys.argv) > 0:
        scrape_csv(sys.argv[1])
    else:
        print("Error: Please pass file name as an argument")


    for k, v in point_data.items():
        print(k, v)



if __name__ == '__main__':
    main()
