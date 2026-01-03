import { getCategoryClasses } from "../utils/categoryColors";

export default function CategoryFilter({ active, setActive }) {

  const categories = [
    "All",
    "Technology",
    "Business",
    "Design",
    "Lifestyle",
    "General"
  ];

  return (
    <div className="flex flex-wrap gap-3 max-w-7xl mx-auto p-6">

      {categories.map((c) => (
        <button
          key={c}
          onClick={() => setActive(c)}
          className={`
            px-4 py-2 rounded-xl border transition
            ${
              active === c
                ? getCategoryClasses(c) + " border-transparent"
                : "bg-white dark:bg-[#111827] border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300"
            }
          `}
        >
          {c}
        </button>
      ))}

    </div>
  );
}
