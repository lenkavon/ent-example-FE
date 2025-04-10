from flask import Flask, request
from flask_sqlalchemy import SQLAlchemy
from faker import Faker
from flask_cors import CORS

# Create Flask app
app = Flask(__name__)
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///data.db"
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

# Enable CORS for the Flask app
CORS(app)

# Initialize SQLAlchemy with app
db = SQLAlchemy(app)


class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    firstName = db.Column(db.String(80), nullable=False)
    lastName = db.Column(db.String(80), nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    age = db.Column(db.Integer, nullable=False)

    def __repr__(self):
        return f"{self.name} - {self.description}"


@app.route("/")
def index():
    return "Hello, World!"


@app.route("/users")
def get_users():
    users = User.query.all()
    output = []
    for user in users:
        user_data = {
            "id": user.id,
            "firstName": user.firstName,
            "lastName": user.lastName,
            "email": user.email,
            "age": user.age,
        }
        output.append(user_data)
    return output


@app.route("/users/<id>")
def get_user(id):
    user = User.query.get_or_404(id)
    return {
        "id": user.id,
        "firstName": user.firstName,
        "lastName": user.lastName,
        "email": user.email,
        "age": user.age,
    }


@app.route("/users", methods=["POST"])
def add_user():
    new_user = User(
        firstName=request.json["firstName"],
        lastName=request.json["lastName"],
        email=request.json["email"],
        age=request.json["age"],
    )
    db.session.add(new_user)
    db.session.commit()
    return {"id": new_user.id}


@app.route("/users/<id>", methods=["DELETE"])
def delete_user(id):
    user_to_delete = User.query.get_or_404(id)
    if user_to_delete is None:
        return {"message": "user not found"}
    db.session.delete(user_to_delete)
    db.session.commit()
    return {"message": "user deleted"}


# Create database tables and seed with fake data
def create_tables_and_seed():
    with app.app_context():
        db.create_all()
        fake = Faker()
        for _ in range(5):
            fake_user = User(
                firstName=fake.first_name(),
                lastName=fake.last_name(),
                email=fake.unique.email(),
                age=fake.random_int(min=18, max=80),
            )
            db.session.add(fake_user)
        db.session.commit()


# Run the application
if __name__ == "__main__":
    create_tables_and_seed()
    app.run(debug=True)
