import sys
from google.cloud import firestore
import pandas as pd
import json

def main(id):
    db = firestore.Client.from_service_account_json('credentials.json')
    docs = db.collection(u'food').stream()

    # get doc from ID
    targetCat = None
    for doc in docs:
        if doc.id == id:
            # targetDoc = doc
            targetCat = doc.to_dict()['categories']
            break

    # data = {'ID':[], 'CATEGORIES':[], 'ENERGY':[], 'PROTEIN':[], 'CARBOHYDRATE':[], 'FAT':[], 'SUGAR':[]}

    recs = []
    docs = db.collection(u'food').stream()

    for doc in docs:

        curID = doc.id
        curCat = doc.to_dict()['categories']
        if curCat == '':
            curCat = None
        
        if curID != id and curCat == targetCat and curCat != '':
            recs.append({"recommendation": "", "productID": str(curID)})
    
    print(recs[:2])
        
        # # get col name
        # cols = doc.to_dict()['nutritionCategories']
        # col = None
        # for c in cols:
        #     if '100' in c.upper():
        #         col = c
        
        # # populate data
        # nutrition = doc.to_dict()['nutrition']
        # for d in nutrition:
        #     if 'PROTEIN' in d['Nutrient'].upper():
        #         tmp = d[col]
        #         data['PROTEIN'].append(tmp)
        #     if 'CARBOHYDRATE' in d['Nutrient'].upper():
        #         tmp = d[col]
        #         data['CARBOHYDRATE'].append(tmp)
        #     if 'FAT' in d['Nutrient'].upper():
        #         tmp = d[col]
        #         data['FAT'].append(tmp)
        #     if 'SUGAR' in d['Nutrient'].upper():
        #         tmp = d[col]
        #         data['SUGAR'].append(tmp)
        
        
        # print(data)

        # for d in nutrition:



    
    # d = {'id':[], 'categories':[], 'energy':[], 'protein':[], 'carbohydrates':[], 'fat':[], 'sugars':[]}
    # df = pd.DataFrame(data=d)


if __name__ == '__main__':
    main(sys.argv[1])