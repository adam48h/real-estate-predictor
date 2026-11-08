"use client";

import { useState } from "react";

export default function Home() {

const [property, setProperty] = useState({
  bedrooms: "",
  bathrooms: "",
  squareFeet: "",
  propertyType: "Single Family Home",
});

const [estimatedPrice, setEstimatedPrice] = useState<number | null>(null);

const [error, setError] = useState("");

const [loading, setLoading] = useState(false);


async function handleEstimate() {
  const sqft = Number(property.squareFeet);
  const bedrooms = Number(property.bedrooms);
  const bathrooms = Number(property.bathrooms);

  if (
    !property.bedrooms ||
    property.bathrooms === "" ||
    !property.squareFeet ||
    sqft <= 0 ||
    bedrooms < 0 ||
    bathrooms < 0
  ) {
    setError("Please enter valid information for all property fields.");
    setEstimatedPrice(null);
    return;
  }

  setLoading(true);
  setError("");
  setEstimatedPrice(null);

  try {
    const response = await fetch("http://127.0.0.1:8000/predict", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        bedrooms: bedrooms,
        bathrooms: bathrooms,
        squareFeet: sqft,
        propertyType: property.propertyType,
      }),
    });

    const data = await response.json();

if (!response.ok) {
  console.error("Backend error:", response.status, data);
  throw new Error(
    data.detail || data.error || `Server error: ${response.status}`
  );
}
    if (typeof data.estimatedPrice !== "number") {
      throw new Error(data.error || "Invalid prediction received.");
    }

    setEstimatedPrice(Math.round(data.estimatedPrice));

  } catch (err) {
    console.error(err);
    setError(
      "Unable to connect to the prediction server. Please try again."
    );
  } finally {
    setLoading(false);
  }
}


 return (
    <main

    
  className="min-h-screen bg-cover bg-center bg-fixed text-white"
  style={{
    backgroundImage:
      "linear-gradient(rgba(15, 23, 42, 0.60), rgba(15, 23, 42, 0.60)), url('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSmurQ82vgozU-Qs0p_0pQY2V9y0dkFg2d6c7jTTMiEyQ&s=10')",
  }}
>
  
     <section>
         <p>Home Evaluation</p>
         <h1 className = "text-5xl font-bold tracking-tight">
         
         Understand The True Value Of Your Home
         </h1>

         <p>
         Receives perfectly on point evaluations on homes through the use of AI and data from the Iowa real estate market
        </p>
    
    
    </section>

    <section className="mx-auto max-w-3xl px-6 py-20">
  <div className="rounded-2xl border border-slate-200 bg-white p-8 text-slate-900 shadow-2xl">

    <h2 className="text-2xl font-bold">
      Evaluate Your Property
    </h2>

    <p className="mt-2 text-slate-500">
      Enter your property details to get started.
    </p>

    <div className="mt-8 grid gap-5 sm:grid-cols-2">
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
<option>Townhouse</option>
<option>Duplex</option>
<option>Two-Family Home</option>
</select>
      </div>

    </div>

    <button
  onClick={handleEstimate}
  disabled={loading}
  className="mt-8 w-full rounded-lg bg-blue-600 p-4 font-semibold text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
>
  {loading ? "Analyzing Property..." : "Estimate Property Value"}
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