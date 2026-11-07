
import pandas as pd
import numpy as np
import joblib

from sklearn.model_selection import train_test_split
from sklearn.compose import ColumnTransformer
from sklearn.pipeline import Pipeline
from sklearn.preprocessing import OneHotEncoder
from sklearn.impute import SimpleImputer
from sklearn.ensemble import RandomForestRegressor
from sklearn.metrics import mean_absolute_error, mean_squared_error, r2_score

# 1. Load dataset
df = pd.read_csv("data/AmesHousing.csv")

# 2. Create bathroom feature
df["Bathrooms"] = (
    df["Full Bath"].fillna(0)
    + df["Half Bath"].fillna(0) * 0.5
    + df["Bsmt Full Bath"].fillna(0)
    + df["Bsmt Half Bath"].fillna(0) * 0.5
)

# 3. Map dataset property types to website options
property_mapping = {
    "1Fam": "Single Family Home",
    "Twnhs": "Townhouse",
    "TwnhsE": "Townhouse",
    "Duplex": "Duplex",
    "2fmCon": "Two-Family Home"
}

df["PropertyType"] = df["Bldg Type"].map(property_mapping)

# 4. Select features and target
X = df[[
    "Bedroom AbvGr",
    "Bathrooms",
    "Gr Liv Area",
    "PropertyType"
]].copy()

X.columns = [
    "bedrooms",
    "bathrooms",
    "squareFeet",
    "propertyType"
]

y = df["SalePrice"]

# 5. Preprocessing
numeric_features = ["bedrooms", "bathrooms", "squareFeet"]
categorical_features = ["propertyType"]

numeric_transformer = SimpleImputer(strategy="median")

categorical_transformer = Pipeline(steps=[
    ("imputer", SimpleImputer(strategy="most_frequent")),
    ("onehot", OneHotEncoder(handle_unknown="ignore"))
])

preprocessor = ColumnTransformer(transformers=[
    ("num", numeric_transformer, numeric_features),
    ("cat", categorical_transformer, categorical_features)
])

# 6. Create model
model = Pipeline(steps=[
    ("preprocessor", preprocessor),
    ("regressor", RandomForestRegressor(
        n_estimators=300,
        min_samples_leaf=3,
        random_state=42,
        n_jobs=-1
    ))
])

# 7. Split dataset
X_train, X_test, y_train, y_test = train_test_split(
    X, y,
    test_size=0.2,
    random_state=42
)

# 8. Train
print("Training simplified model...")
model.fit(X_train, y_train)

# 9. Evaluate
predictions = model.predict(X_test)

mae = mean_absolute_error(y_test, predictions)
rmse = np.sqrt(mean_squared_error(y_test, predictions))
r2 = r2_score(y_test, predictions)

print("\nSIMPLIFIED MODEL RESULTS")
print("------------------------")
print(f"Mean Absolute Error: ${mae:,.2f}")
print(f"RMSE: ${rmse:,.2f}")
print(f"R² Score: {r2:.4f}")

# 10. Save model
joblib.dump(model, "ames_simple_model.joblib")

print("\nSimplified model saved successfully!")
