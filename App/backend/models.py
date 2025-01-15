from config import db

class Contact(db.Model):
    id=db.Column(db.Integer, primary_key=True)
    first_name=db.Column(db.String(100) ,unique=False ,nullable=False)
    last_name=db.Column(db.String(100) ,unique=False ,nullable=False) 
    email=db.Column(db.String(100) ,unique=True ,nullable=False)
    phone=db.Column(db.String(100), unique=True ,nullable=False)

    def to_json(self):
        return {
            'id':self.id,
            'first_name':self.first_name,
            'last_name':self.last_name,
            'email':self.email,
            'phone':self.phone
        }