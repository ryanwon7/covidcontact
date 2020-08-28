import os
import re
import sqlite3

SQLITE_PATH = os.path.join(os.path.dirname(__file__), 'covidcontact.db')

class Database:
	def __init__(self):
		self.conn = sqlite3.connect(SQLITE_PATH)

	def select(self, sql, parameters=[]):
		c = self.conn.cursor()
		c.execute(sql, parameters)
		return c.fetchall()

	def get_locs(self):
		data = self.select('SELECT * FROM locations ORDER BY location')
		return [{
			'uid': d[0],
			'location': d[1]
		} for d in data]

	def get_total_locs(self):
		data = self.select('SELECT COUNT(*) FROM locations')
		return data[0][0]

	def add_new_location(self, location):
		self.execute('INSERT INTO locations (location) VALUES ("' + location + '");');

	def add_new_tracedata(self, fname, lname, infect, location, vdate):
		self.execute('INSERT INTO tracedata (firstname, lastname, positive, location, date) VALUES ("' + fname + '", "' + lname + '","' + infect + '","' + location + '","' + vdate + '");');

	def find_contact(self, location, vdate):
		data = self.select('SELECT * FROM tracedata WHERE positive="yes" AND location="' + location + '" AND date="' + vdate + '";')
		return [{
			'uid': d[0],
			'fname': d[1],
			'lname': d[2],
			'positive': d[3],
			'location': d[4],
			'date': d[5]
		} for d in data]

	def total_contact(self, location ,vdate):
		data = self.select('SELECT * FROM tracedata WHERE positive="yes" AND location="' + location + '" AND date="' + vdate + '";')
		if (data == []):
			return 0
		else:
			return data[0][0]

	def execute(self, sql, parameters=[]):
		c = self.conn.cursor()
		c.execute(sql, parameters)
		self.conn.commit()

	def close(self):
		self.conn.close()