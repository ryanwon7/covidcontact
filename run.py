from flask import Flask, render_template, send_file, g, request, jsonify
import os


app = Flask(__name__, static_folder='public', static_url_path='')

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/course/<path:path>')
def base_static(path):
    return send_file(os.path.join(app.root_path, 'course', path))

if __name__ == "__main__":
    app.run(host='127.0.0.1', port=8080, debug=True)
