"use client";

import { useState } from "react";

export default function Home() {
  const [property, setProperty] = useState({
  address: "",
  bedrooms: "",
  bathrooms: "",
  squareFeet: "",
  propertyType: "Single Family Home",
});

const [estimatedPrice, setEstimatedPrice] = useState<number | null>(null);

const [error, setError] = useState("");

function handleEstimate() {
  const sqft = Number(property.squareFeet);
  const bedrooms = Number(property.bedrooms);
  const bathrooms = Number(property.bathrooms);

  if (
    !property.address.trim() ||
    !property.bedrooms ||
    !property.bathrooms ||
    !property.squareFeet ||
    sqft <= 0 ||
    bedrooms < 0 ||
    bathrooms <= 0
  ) {
    setError("Please enter valid information for all property fields.");
    setEstimatedPrice(null);
    return;
  }

  let price = sqft * 150;

  price += bedrooms * 5000;
  price += bathrooms * 7500;

  if (property.propertyType === "Condo") price *= 0.9;
  if (property.propertyType === "Apartment") price *= 0.85;
  if (property.propertyType === "Townhouse") price *= 0.95;

  setError("");
  setEstimatedPrice(Math.round(price));
}

 return (
    <main className = "min-h-screen bg-slate-50 text-slate-900">
     <section>
         <p>Home Evaluation</p>
         <h1 className = "text-5xl font-bold tracking-tight">
         
         Understand The True Value Of Your Home
         </h1>

         <p>
         Receives perfectly on point evalutions on homes through the use of AI and data from the real estate market
        </p>
    
    
    </section>

    <section className="mx-auto max-w-3xl px-6 py-20">
  <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">

    <h2 className="text-2xl font-bold">
      Evaluate Your Property
    </h2>

    <p className="mt-2 text-slate-500">
      Enter your property details to get started.
    </p>

    <div className="mt-8 grid gap-5 sm:grid-cols-2">

      <div className="sm:col-span-2">
        <input
  type="text"
  placeholder="Enter property address"
  value={property.address}
  onChange={(e) =>
    setProperty({ ...property, address: e.target.value })
  }
  className="mt-2 w-full rounded-lg border border-slate-300 p-3"
/>
      </div>

      <div>
        <label className="text-sm font-medium">
          Bedrooms
        </label>
        <input
  type="number"
  placeholder="e.g. 3"
  value={property.bedrooms}
  onChange={(e) =>
    setProperty({ ...property, bedrooms: e.target.value })
  }
  className="mt-2 w-full rounded-lg border border-slate-300 p-3"
/>
      </div>

      <div>
        <label className="text-sm font-medium">
          Bathrooms
        </label>
      <input
  type="number"
  placeholder="e.g. 2"
  value={property.bathrooms}
  onChange={(e) =>
    setProperty({ ...property, bathrooms: e.target.value })
  }
  className="mt-2 w-full rounded-lg border border-slate-300 p-3"
/>
      </div>

      <div>
        <label className="text-sm font-medium">
          Square Feet
        </label>
      <input
  type="number"
  placeholder="e.g. 1800"
  value={property.squareFeet}
  onChange={(e) =>
    setProperty({ ...property, squareFeet: e.target.value })
  }
  className="mt-2 w-full rounded-lg border border-slate-300 p-3"
/>
      </div>

      <div>
        <label className="text-sm font-medium">
          Property Type
        </label>
        <select
  value={property.propertyType}
  onChange={(e) =>
    setProperty({ ...property, propertyType: e.target.value })
  }
  className="mt-2 w-full rounded-lg border border-slate-300 p-3"
>
  <option>Single Family Home</option>
  <option>Condo</option>
  <option>Apartment</option>
  <option>Townhouse</option>
</select>
      </div>

    </div>

    <button
  onClick={handleEstimate}
  className="mt-8 w-full rounded-lg bg-blue-600 p-4 font-semibold text-white hover:bg-blue-700"
>
  Estimate Property Value
</button>

{error && (
  <p className="mt-4 text-red-600">
    {error}
  </p>
)}

{estimatedPrice !== null && (
  <div className="mt-8 rounded-xl bg-blue-50 p-6">
    <p className="text-sm font-medium text-blue-700">
      Estimated Property Value
    </p>

    <h3 className="mt-2 text-4xl font-bold text-slate-900">
      ${estimatedPrice.toLocaleString("en-US")}
    </h3>

    <p className="mt-2 text-sm text-slate-500">
      Preliminary estimate based on the property details provided.
    </p>
  </div>
)}

  </div>
</section>

  </main>
  );

}