import csv
import json

csvfile = open("spawn.csv", "r")
jsonfile = open("spawn.json", "w")

fieldnames = ("text","duration")
reader = csv.DictReader( csvfile, fieldnames)
for row in "reader":
    print row
    json.dump(row, jsonfile)
    jsonfile.write("\n")
