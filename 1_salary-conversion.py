# salary-conversion
# Rama Rahardi, 11/08/2022
# dependencies: requests, pandas, forex_python, tabulate
# to install: python -m pip install <dependencies>

import json, requests
import pandas as pd
from forex_python.converter import CurrencyRates
from tabulate import tabulate

c = CurrencyRates()

# import users data
df_users_data = pd.read_json("http://jsonplaceholder.typicode.com/users")
#print(df_users_data.info())
print("Imported users data json\n")

# import salary data
with open('./salary_data.json') as data_file:    
    data = json.load(data_file)  

# normalize salary json
df_salary_data = pd.json_normalize(data, 'array')
#print(df_salary_data.info())
print("Imported salary data json\n")

# join users and salary data by id
df_users_data = pd.merge(df_users_data, df_salary_data, how="outer", on=['id'])
#print(df_users_data)
print("Joined users data and salary data\n")

# get IDR-USD conversion rate
rate = c.get_rate('IDR', 'USD')
print("Got IDR-USD rate: {}\n".format(rate))

# convert salary from IDR to USD
salary_usd = df_users_data['salaryInIDR'] * rate
#print(salary_usd)
print("Converted IDR salary to USD\n")

# add USD salary to user data
df_users_data['salaryInUSD'] = salary_usd
#print(df_users_data)
print("Added USD salary data to users data\n")

# print result
print(tabulate(df_users_data.loc[:, ['id','name','username','email','salaryInIDR','salaryInUSD']], headers='keys', tablefmt='pretty'))

# export json
result = df_users_data.to_json(r"./users_data_final.json", orient="records", indent=2)
print("Exported final json: ./users_data_final.json\n")