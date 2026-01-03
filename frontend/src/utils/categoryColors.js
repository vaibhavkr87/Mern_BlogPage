export const getCategoryClasses = (cat = "General") => {
    switch (cat) {
      case "Technology":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-300";
  
      case "Business":
        return "bg-green-100 text-green-800 dark:bg-green-900/40 dark:text-green-300";
  
      case "Design":
        return "bg-pink-100 text-pink-800 dark:bg-pink-900/40 dark:text-pink-300";
  
      case "Lifestyle":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/40 dark:text-yellow-300";
  
      default:
        return "bg-gray-200 text-gray-700 dark:bg-gray-700/40 dark:text-gray-200";
    }
  };
  