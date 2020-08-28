from flask import Flask, render_template, send_file, g, request, jsonify
import os
from db import Database


app = Flask(__name__, static_folder='public', static_url_path='')


def get_db():
    db = getattr(g, '_database', None)
    if db is None:
        db = Database()
    return db


@app.teardown_appcontext
def close_connection(exception):
    db = getattr(g, '_database', None)
    if db is not None:
        db.close()


@app.route('/')
def index():
    return render_template('index.html')


@app.route('/lib/<path:path>')
def base_static(path):
    return send_file(os.path.join(app.root_path, 'lib', path))


@app.route('/<name>')
def generic(name):
    return render_template(name + '.html')

@app.route('/api/locations')
def api_locations():
	response = {
		'locations': get_db().get_locs(),
		'total': get_db().get_total_locs()
	}
	return jsonify(response)

@app.route('/api/addlocation')
def api_add_location():
	location = request.args.get('location')
	get_db().add_new_location(location)
	return api_locations()

@app.route('/api/newentry')
def api_add_newentry():
	fname = request.args.get('fname')
	lname = request.args.get('lname')
	status = request.args.get('positive')
	location = request.args.get('location')
	vdate = request.args.get('date')
	get_db().add_new_tracedata(fname, lname, status, location, vdate)
	return find_contact(location, vdate)

def find_contact(location, vdate):
	response = {
		'tracedata': get_db().find_contact(location, vdate),
		'total': get_db().total_contact(location, vdate)
	}
	return jsonify(response)

if __name__ == "__main__":
    app.run(host='127.0.0.1', port=8080, debug=True)
