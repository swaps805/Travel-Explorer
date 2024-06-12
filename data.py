import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore

cred = credentials.Certificate("./firekey.json")
firebase_admin.initialize_app(cred)
db  = firestore.client()

def get_city_data():
    city_ref = db.collection('City')
    docs = city_ref.stream()

    city_data = {}
    for doc in docs:
        city_data[doc.id] = doc.to_dict().get('name')

    return city_data
print(get_city_data())

# cities =[
#     {
#         "name": "Shanghai",
#         "img": "./images/cities/shanghai.jpg",
#         "coord": [31.230390, 121.473702],
#         "descp": "Shanghai, China's largest city, is a global financial hub known for its futuristic skyline, historic landmarks, and vibrant street life. From the Bund waterfront to the iconic Oriental Pearl Tower, Shanghai offers a blend of tradition and modernity."
#     },
#     {
#         "name": "Seoul",
#         "img": "./images/cities/seoul.jpg",
#         "coord": [37.566535, 126.977969],
#         "descp": "Seoul, the capital of South Korea, is a dynamic metropolis known for its modern skyscrapers, historic sites, and bustling street markets. From palaces like Gyeongbokgung to the vibrant nightlife of Gangnam, Seoul offers a unique mix of old and new."
#     },
#     {
#         "name": "Rio de Janeiro",
#         "img": "./images/cities/riodejaneiro.jpg",
#         "coord": [-22.906847, -43.172897],
#         "descp": "Rio de Janeiro, Brazil's vibrant seaside city, is famed for its stunning beaches, iconic landmarks, and lively culture. From the Christ the Redeemer statue to Copacabana Beach, Rio offers a blend of natural beauty and urban excitement."
#     },
#     {
#         "name": "Cape Town",
#         "img": "./images/cities/capetown.jpg",
#         "coord": [-33.924870, 18.424055],
#         "descp": "Cape Town, South Africa's coastal gem, is known for its stunning scenery, diverse culture, and rich history. From Table Mountain to the Cape Winelands, Cape Town offers a blend of adventure, relaxation, and culinary delights."
#     },
#     {
#         "name": "Cairo",
#         "img": "./images/cities/cairo.jpg",
#         "coord": [30.044420, 31.235712],
#         "descp": "Cairo, the bustling capital of Egypt, is a city steeped in history, with iconic landmarks such as the Pyramids of Giza and the Sphinx. With its vibrant markets, rich culture, and ancient ruins, Cairo offers a glimpse into the past."
#     },
#     {
#         "name": "Honolulu",
#         "img": "./images/cities/honolulu.jpg",
#         "coord": [21.306944, -157.858337],
#         "descp": "Honolulu, the capital of Hawaii, is known for its stunning beaches, surfing spots, and tropical climate. From Waikiki Beach to Diamond Head, Honolulu offers a blend of relaxation, outdoor adventures, and cultural experiences."
#     }
# ]
# city_code  = ["PVG", "ICN", "GIG", "CPT", "CAI", "HNL"]



# for i in range(len(city_code)):
#     doc_ref = db.collection('City').document(city_code[i])
#     doc_ref.set(cities[i])
#     print('Custom data added to Firestore with  ID', doc_ref.id)
    
# flights = {
#     "start":"FRA",
#     "end":["ROM", "DXB", "SIN", "NYC"]
# }

# doc_ref = db.collection('Airline').document("Lufthansa")
# doc_ref.set(flights)
# print('Custom data added to Firestore with  ID', doc_ref.id)