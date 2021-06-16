import sqlite3
from flask import g, jsonify

DATABASE_URI = "database.db"

def db_hackU(query, args=()):
    cursor = get_db().execute(query, args)
    rows = cursor.fetchall()
    cursor.close()
    result = []
    for index in range(len(rows)):
        result.append(rows[index])
    return result
#From flask website

def get_db():
    db = getattr(g, 'db', None)
    if db is None:
        db = g.db = sqlite3.connect(DATABASE_URI)
    return db
#From flask website

def query_db(query, args=(), one=False):
    cur = get_db().execute(query, args)
    rv = cur.fetchall()
    cur.close()
    return (rv[0] if rv else None) if one else rv

def disconnect_db():
    db = getattr(g, 'db', None)
    if db is not None:
        g.db.close()



def valid_user(email, password):
    print(email,password)
   

    valid_user = query_db("SELECT email, password FROM users WHERE email = ? AND password = ?;", [email, password], one=True)
    if (valid_user is None):
        return False
    else:
        return True

def check_logged_in_users_by_email(email):
    logged_in_user = query_db("SELECT email FROM signedInUsers WHERE email = ?", [email], one=True)
    if (logged_in_user is None):
        return False
    else:

        return True


def put_logged_in_user(email, token):
    print("titta hit först: ",email,token)
    if check_logged_in_users_by_email(email):
        try:
            get_db().execute("UPDATE signedInUsers SET token = ? WHERE email = ?", [token, email])
            get_db().commit()
            return True
        except:
            return False
    else:

        try:
            get_db().execute("INSERT INTO signedInUsers VALUES(?,?);", [email, token])
            get_db().commit()
            print("wazzap")
            return True
        except:
            print("härjar")
            return False


def new_user(email, password, firstname, familyname, username):
    try:
        get_db().execute("INSERT INTO users VALUES(?,?,?,?,?);", [email, password, firstname, familyname, username])
        get_db().commit()

        return True
    except:
        return False
