#create
#types of requests: GET, POST, PATCH, DELETE

#send a request from app the backend-sends json data to the backend
#gets a respomse from the backend- to the frontend in json format/or any other format 


from flask import request, jsonify,flash
from config import app, db
from models import Contact

app.config['SECRET_KEY'] =  'whatthefuckisthisbullshit'

@app.route('/contacts', methods=['GET'])#decorative function
def get_contacts():
    contacts = Contact.query.all()
    return jsonify({ "contacts":[contact.to_json() for contact in contacts]})
    
@app.route('/create_contact', methods=['POST'])
def cerate_contact():
    data = request.get_json()
    existing_contact = Contact.query.filter((Contact.email == data['email']) | (Contact.phone == data['phone'])).first()

    if existing_contact:
        flash('Email or phone number already exists', category='error')
        return jsonify({"error": "Email or phone number already exists"}), 400
    
    new_contact = Contact(first_name=data['first_name'], last_name=data['last_name'], email=data['email'], phone=data['phone']) 
    try:
        db.session.add(new_contact)
        db.session.commit()
    except Exception as e:
        return jsonify({ "error":str(e) }), 400

    flash('Contact created successfully' , category='success')
    return jsonify(new_contact.to_json())

@app.route('/update-contact/<int:user_id>', methods=['PATCH'])
def update_contact(user_id):
    contact = Contact.query.get(user_id)
    if contact:
        data = request.get_json()
        contact.first_name = data['first_name']
        contact.last_name = data['last_name']
        contact.email = data['email']
        contact.phone = data['phone']
        try:
            db.session.commit()
        except Exception as e:
            return jsonify({ "error":str(e) }), 400
        flash('Contact updated successfully' , category='success')
        return jsonify(contact.to_json())
    return jsonify({ "error":f"Contact with id {user_id} not found" }), 404

@app.route('/delete_contact/<int:user_id>', methods=['DELETE'])
def delete_contact(user_id):
    contact = Contact.query.get(user_id)
    if contact:
        db.session.delete(contact)
        db.session.commit()
        flash('Contact deleted successfully' , category='success')
        return jsonify({ "message":f"Contact with id {user_id} deleted successfully" })
    return jsonify({ "error":f"Contact with id {user_id} not found" }), 404

if __name__ == '__main__':
    with(app.app_context()):
        db.create_all()
    app.run(debug=True)