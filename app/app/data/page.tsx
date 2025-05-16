'use client';

import React, { useState } from "react";


export default function DataPage() {

  const [selectedCountry, setSelectedCountry] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);


  return (
    <div className="p-4 max-w-xl mx-auto">
      <h1 className="text-xl font-bold mb-4">Buy Data Bundle</h1>


      <select
        value={selectedCountry}
        onChange={e => setSelectedCountry(e.target.value)}
        className="block w-full mb-4 p-2 border rounded"
      >
        <option value="">Select Country</option>
        <option value="coming_soon">Coming Soon</option>
      </select>

      <button
        onClick={() => {}}
        disabled={!selectedCountry || loading}
        className="bg-green-600 text-white px-4 py-2 rounded w-full"
      >
        {loading ? "Processing..." : "Pay with USDC"}
      </button>

      {message && <p className="mt-4 text-center">{message}</p>}
    </div>
  );
}
