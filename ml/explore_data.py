import pandas as pd

df = pd.read_csv("data/AmesHousing.csv")

print("Dataset shape:", df.shape)

print("\nFirst 5 rows:")
print(df.head())

print("\nSale price statistics:")
print(df["SalePrice"].describe())

print("\nMissing values:")
print(df.isnull().sum().sort_values(ascending=False).head(15))

print("\nPROPERTY TYPES:")
print(df["Bldg Type"].value_counts())

print("\nBATHROOM COLUMNS:")
print(df[[
    "Full Bath",
    "Half Bath",
    "Bsmt Full Bath",
    "Bsmt Half Bath"
]].head(10))

print("\nBEDROOMS:")
print(df["Bedroom AbvGr"].value_counts().sort_index())