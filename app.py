from flask import *
from flask import render_template
import pymongo, os, shutil

DB = pymongo.MongoClient("mongodb://localhost:27017/")
Stake = DB["miner"]
Accounts = Stake["accounts"]

app = Flask(__name__, static_folder="static", template_folder=os.getcwd())

@app.route("/", methods=["GET"])
def index():
	if request.method:
		return render_template("index.html", leaderboard=[{"name":i["name"],"coins":i["coins"]} for i in Accounts.find().sort("coins")][::-1][0:3])

@app.route("/post", methods=["POST"])
def post():
	Accounts.update_one({"email":request.form["email"]},{"$set":{"coins":int(request.form["coins"])}})
	return ""

@app.route("/login", methods=["GET","POST"])
def login():
	if request.method == "GET":
		return render_template("login.html")
	else:
		w = [request.form["email"], request.form["password"]]
		if Accounts.find_one({"email":w[0],"password":w[1]}) == None:
			return render_template("login.html", err="Wrong credentials")
		else:
			return render_template("play.html", details=Accounts.find_one({"email":w[0]}))

@app.route("/signup", methods=["GET","POST"])
def signup():
	if request.method == "GET":
		return render_template("signup.html")
	else:
		w=[request.form["email"], request.form["password"], request.form["name"]]
		if "" in w or " " in w:
			return render_template("signup.html", err="Enter all information")
		if Accounts.find_one({"email":w[0]}) != None:
			return render_template("signup.html", err="Account already exists")
		else:
			Accounts.insert_one({"email":w[0],"password":w[1],"name":w[2],"coins":10000})
			return render_template("play.html", details=Accounts.find_one({"email":w[0]}))

if __name__ == '__main__':
	app.run(debug=True)