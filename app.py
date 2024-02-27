from flask import Flask,render_template,jsonify
from pymongo import MongoClient
import certifi
ca = certifi.where()
app = Flask(__name__)
cl = MongoClient('mongodb+srv://mohammedaswath141:Aswath22%40data@cluster0.54i4ysr.mongodb.net/Hospital?retryWrites=true&w=majority',tlsCAFile=ca)
db = cl['Hospital']
collection = db['Departments']
dataBase = [{k: v for k, v in item.items() if k != '_id'} for item in list(collection.find({}))]
data = dataBase

@app.route('/')
def hello_world():
    return render_template('index.html')

@app.route('/api/data')
def get_data_api():
    return jsonify(data)

@app.route('/centrifuge', methods=['GET'])
def centrifuge():
    # data.clear() 
    # for i in dataBase:
    #     if i["Equipment_name"].lower() == "centrifuge":
    #         data.append(i)
    
    title = "Centrifuge"
    logo = "/static/icons/logo.png"
    image = "/static/pics/Centrifuge1.jpg"
    content = "Centrifuge is a device that uses centrifugal force to subject a specimen to a specified constant force, for example to separate various components of a fluid. This is achieved by spinning the fluid at high speed within a container, thereby separating fluids of different densities (e.g. cream from milk) or liquids from solids. It works by causing denser substances and particles to move outward in the radial direction. At the same time, objects that are less dense are displaced and moved to the centre. In a laboratory centrifuge that uses sample tubes, the radial acceleration causes denser particles to settle to the bottom of the tube, while low-density substances rise to the top. A centrifuge can be a very effective filter that separates contaminants from the main body of fluid."

    return render_template('equipment.html', title = title, logo = logo, image = image, content = content, data = data)

@app.route('/ventilator', methods=['GET'])
def ventilator():
    # data.clear() 
    # for i in dataBase:
    #     if i["Equipment_name"].lower() == "ventilator":
    #         data.append(i)
    
    title = "Ventilator"
    logo = "/static/icons/logo.png"
    image = "/static/pics/ventilator1.jpg"
    content = "A medical ventilator is a machine that helps your lungs work. It can be a lifesaving machine if you have a condition that makes it hard for you to breathe properly or when you can't breathe on your own at all. A ventilator helps to push air in and out of your lungs so your body can get the oxygen it needs. You may wear a fitted mask to help get oxygen from the ventilator into your lungs. Or, if your condition is more serious, a breathing tube may be inserted down your throat to supply your lungs with oxygen. Ventilators are most often used in hospital settings. A doctor or a respiratory therapist will control how much oxygen is pushed into your lungs by the ventilator."

    return render_template('equipment.html', title = title, logo = logo, image = image, content = content, data = data)

@app.route('/woodslamp', methods=['GET'])
def woodslamp():
    # data.clear() 
    # for i in dataBase:
    #     if i["Equipment_name"].lower() == "ventilator":
    #         data.append(i)
    
    title = "Woodslamp"
    logo = "/static/icons/logo.png"
    image = "/static/pics/woodslamp1.jpg"
    content = "Wood lamp examination is a diagnostic test in which the skin or hair is examined while exposed to the black light emitted by Wood lamp. Blacklight is invisible to the naked eye because it is in the ultraviolet spectrum, with a wavelength just shorter than the colour violet. The lamp glows violet in a dark environment because it also emits some light in the violet part of the electromagnetic spectrum. A traditional Wood lamp is a low-output mercury arc covered by a Wood filter (barium silicate and 9% nickel oxide) and emits wavelength 320-450 nm (peak 365 nm). The lamp was invented in 1903 by a Baltimore physicist, Robert W. Wood."

    return render_template('equipment.html', title = title, logo = logo, image = image, content = content, data = data)

@app.route('/patientmonitor', methods=['GET'])
def patientmonitor():
    # data.clear() 
    # for i in dataBase:
    #     if i["Equipment_name"].lower() == "ventilator":
    #         data.append(i)
    
    title = "Patientmonitor"
    logo = "/static/icons/logo.png"
    image = "/static/pics/patientMonitor1.jpg"
    content = "A Patient Monitor (also known as Vital Signs Monitors) are a medical monitor or physiological monitor or display, is an electronic medical device that measures a patient's vital signs and displays the data so obtained, which may or may not be transmitted on a monitoring network. Physiological data are displayed continuously on a CRT or LCD screen as data channels along the time axis, They may be accompanied by numerical readouts of computed parameters on the original data, such as maximum, minimum and average values, pulse and respiratory frequencies, and so on. In critical care units of hospitals, bedside units allow continuous monitoring of a patient, with medical staff being continuously informed of the changes in general condition of a patient. Some monitors can even warn of pending fatal cardiac conditions before visible signs are noticeable to clinical staff, such as atrial fibrillation or premature ventricular contraction (PVC)."

    return render_template('equipment.html', title = title, logo = logo, image = image, content = content, data = data)

@app.route('/anesthesia', methods=['GET'])
def anesthesia():
    # data.clear() 
    # for i in dataBase:
    #     if i["Equipment_name"].lower() == "ventilator":
    #         data.append(i)
    
    title = "Anesthesia"
    logo = "/static/icons/logo.png"
    image = "/static/pics/Anesthesia1.jpg"
    content = "The machine is commonly used together with a mechanical ventilator, breathing system, suction equipment, and patient monitoring devices; strictly speaking, the term anaesthetic machine refers only to the component which generates the gas flow, but modern machines usually integrate all these devices into one combined freestanding unit, which is colloquially referred to as the anaesthetic machine for the sake of simplicity. In the developed world, the most frequent type in use is the continuous-flow anaesthetic machine or Boyle's machine, which is designed to provide an accurate supply of medical gases mixed with an accurate concentration of anaesthetic vapour, and to deliver this continuously to the patient at a safe pressure and flow. This is distinct from intermittent-flow anaesthetic machines, which provide gas flow only on demand when triggered by the patient's own inspiration."

    return render_template('equipment.html', title = title, logo = logo, image = image, content = content, data = data)



if __name__ == '__main__':
    app.run()
