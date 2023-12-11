import joblib
import pandas as pd
from sklearn.ensemble import RandomForestRegressor
from sklearn.preprocessing import StandardScaler

def predict(hum, wins, winb, vis, pre):
    hum = hum/100
    vis = vis/1000
    input_data = pd.DataFrame({'Humidity': hum, 'Wind Speed (km/h)': wins, 'Wind Bearing (degrees)': winb, 'Visibility (km)': vis, 'Pressure (millibars)': pre}, index=[0])

    # Load the pre-trained model
    model = joblib.load('../python/model.joblib', mmap_mode=None)

    # Load the scaler that was used during training
    scaler = joblib.load('../python/scaler.joblib', mmap_mode=None)

    # Transform the input data using the fitted scaler
    scaled_input = scaler.transform(input_data)

    # Make the prediction
    pred = model.predict(scaled_input)

    return pred[0]

if __name__ == "__main__":
    import sys

    # Command line arguments are used to pass parameters
    hum = float(sys.argv[1])
    wins = float(sys.argv[2])
    winb = float(sys.argv[3])
    vis = float(sys.argv[4])
    pre = float(sys.argv[5])

    result = predict(hum, wins, winb, vis, pre)
    print(result)
