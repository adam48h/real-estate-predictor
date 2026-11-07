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

    <button className="mt-8 w-full rounded-lg bg-blue-600 p-4 font-semibold text-white hover:bg-blue-700">
      Estimate Property Value
    </button>

  </div>
</section>

  </main>
  );

}