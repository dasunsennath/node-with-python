
from datetime import date
import sys
import json

def calculateAge(birthDate):
    today = date.today()
    age = today.year - birthDate.year -((today.month, today.day) <(birthDate.month, birthDate.day))
    return age
     
# Driver code
DOB = json.loads(sys.argv[1]);
print(calculateAge(date(DOB["year"], DOB["month"], DOB["date"])), "years")
