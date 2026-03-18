"use client";

import { useState } from "react";
import { posters } from "../data/posters";
import { motion } from "framer-motion";
type Poster = {
  id: number;
  title: string;
  category: string;
  image: string;
  description: string;
};

export default function Home() {
  const [filter, setFilter] = useState("All");
  const [selected, setSelected] = useState<Poster | null>(null);

  const categories = ["All", "Marketing", "Minimal"];

  const filtered =
    filter === "All"
      ? posters
      : posters.filter((p) => p.category === filter);

  return (
    <main className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white p-6">

      {/* Title */}
      <h1 className="text-4xl font-bold mb-6">
        Poster Showcase 🎨
      </h1>

      {/* Filter Buttons */}
      <div className="flex gap-4 mb-6">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            className={`px-4 py-2 rounded ${
              filter === cat
                ? "bg-blue-600"
                : "bg-gray-800"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="grid md:grid-cols-3 gap-6">

        {filtered.map((poster) => (
          <motion.div
            key={poster.id}
            onClick={() => setSelected(poster)}
            className="group cursor-pointer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >

            {/* Image */}
            <div className="overflow-hidden rounded-lg">
              <img
                src={poster.image}
                className="group-hover:scale-110 transition duration-500"
              />
            </div>

            {/* Title */}
            <h3 className="mt-2 text-lg font-semibold">
              {poster.title}
            </h3>

            {/* Category */}
            <span className="text-xs bg-purple-600 px-2 py-1 rounded">
              {poster.category}
            </span>

          </motion.div>
        ))}

      </div>

      {/* Modal */}
      {selected && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">

          <div className="bg-white/10 backdrop-blur-lg p-6 rounded-2xl border border-white/20 text-white max-w-md">

            <img
              src={selected.image}
              className="rounded mb-3"
            />

            <h2 className="text-xl font-bold">
              {selected.title}
            </h2>

            <p className="text-gray-300 mb-3">
              {selected.description}
            </p>

            {/* Download Button */}
            <a
              href={selected.image}
              download
              className="bg-blue-600 px-4 py-2 rounded inline-block mr-2"
            >
              Download
            </a>

            {/* Close */}
            <button
              onClick={() => setSelected(null)}
              className="bg-gray-700 px-4 py-2 rounded"
            >
              Close
            </button>

          </div>

        </div>
      )}

    </main>
  );
}