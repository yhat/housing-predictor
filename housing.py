import os
import pandas as pd
from sklearn import linear_model
from sklearn.cross_validation import train_test_split
from sklearn.metrics import r2_score

df = pd.read_csv('housing_data.csv', sep=',')


features = df.columns[df.columns != "MEDVALUE"]

target = "MEDVALUE"
y = df[target]
X = df.drop(target, 1)
X_train, X_test, y_train, y_test = train_test_split(X, y)

clf = linear_model.LinearRegression()
clf.fit(X_train,y_train)

y_pred = clf.predict(X_test)
print r2_score(y_test, y_pred)

from yhat import Yhat, YhatModel, preprocess, df_to_json

class HousePred(YhatModel):
   @preprocess(in_type=pd.DataFrame, out_type=pd.DataFrame)
   def execute(self, data):
       result = clf.predict(data[features])
       df = pd.DataFrame(data={'predicted_price': result})
       return df

yh = Yhat(
    "USERNAME",
    "APIKEY",
    "http://cloud.yhathq.com/")

yh.deploy("HouseValuePredictor", HousePred, globals())

print df_to_json(df[:1])
