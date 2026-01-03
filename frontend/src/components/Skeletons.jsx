export function PostCardSkeleton() {
    return (
      <div className="bg-white dark:bg-[#111827] rounded-2xl shadow-md border dark:border-indigo-900/30 p-4 space-y-3">
        <div className="skeleton h-40 w-full rounded-xl"></div>
        <div className="skeleton h-4 w-24 rounded"></div>
        <div className="skeleton h-5 w-3/4 rounded"></div>
        <div className="skeleton h-4 w-full rounded"></div>
        <div className="skeleton h-4 w-2/3 rounded"></div>
      </div>
    );
  }
  
  export function FeaturedSkeleton() {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center 
      bg-white dark:bg-[#111827] rounded-2xl shadow-md border dark:border-indigo-900/30 p-4">
  
        <div className="skeleton h-64 w-full rounded-xl"></div>
  
        <div className="space-y-3">
          <div className="skeleton h-5 w-24 rounded"></div>
          <div className="skeleton h-8 w-3/4 rounded"></div>
          <div className="skeleton h-4 w-full rounded"></div>
          <div className="skeleton h-4 w-2/3 rounded"></div>
        </div>
      </div>
    );
  }
  
  export function CommentSkeleton() {
    return (
      <div className="animate-pulse border dark:border-gray-700 p-3 rounded">
        <div className="h-4 bg-gray-300 dark:bg-gray-700 w-1/3 rounded mb-2"></div>
        <div className="h-3 bg-gray-300 dark:bg-gray-700 w-2/3 rounded mb-1"></div>
        <div className="h-3 bg-gray-300 dark:bg-gray-700 w-1/2 rounded"></div>
      </div>
    );
  }
  