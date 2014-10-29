## Housing Price Predictor

#### This is a Node.js app that uses a Python machine learning script to create predictions for house values

### Deploy the app -> Input values -> get predictions for house values

To deply your model:

1. Update `housing.py` with your `YHAT_USERNAME` and `YHAT_APIKEY` (you can signup for a Yhat account here: https://yhathq.com/signup)
2. Run `$ python housing.py` to deploy your machine learning model

To deploy the app run:

```bash
$ export YHAT_USERNAME="kermit@themuppets.org"
$ export YHAT_APIKEY="ABCD1234"
$ nodemon app.js
```

Or click this button :)

[![Deploy](https://www.herokucdn.com/deploy/button.png)](https://heroku.com/deploy)

### In this repo:

1. housing.py -> a machine learning algorithm for predicting housing prices

2. housing_data.csv -> a csv with.....housing data!

3. A Node.js app for deploying the ML algorithm into production

Here's an architecture overview for how the final app works:

![setup](/public/img/setup.png)

