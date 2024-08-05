import { FC, useEffect, useState } from "react";
import { Link } from "react-router-dom";

interface Category {
  slug: string;
  name: string;
}

const AllCategories: FC = () => {
  const [allCategories, setAllCategories] = useState<Category[]>([]);

  useEffect(() => {
    const fetchCategories = () => {
      fetch("https://dummyjson.com/products/categories")
        .then((res) => res.json())
        .then((data) => {
          setAllCategories(data.map((name: string) => ({ name, slug: name.toLowerCase().replace(/ /g, '-') })));
        });
    };
    fetchCategories();
  }, []);

  return (
    <div className="container mx-auto min-h-[83vh] p-4 font-karla">
      <span className="text-lg dark:text-white">Categories</span>
      <div className="grid xl:grid-cols-6 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-2 my-2">
        {allCategories.map((category) => (
          <div
            key={category.slug}
            className="bg-gray-100 dark:bg-slate-600 dark:text-white px-4 py-4 font-karla mr-2 mb-2"
          >
            <div className="text-lg">{category.name}</div>
            <Link
              to={{ pathname: `/category/${category.slug}` }}
              className="hover:underline text-blue-500"
            >
              View products
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllCategories;