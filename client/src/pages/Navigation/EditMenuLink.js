import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

// Dummy categories data for editing
const categoriesData = [
  { path: "/", label: "HOME" },
  { path: "/marathi-news", label: "मराठी बातम्या", hasDropdown: true },
  { path: "/politics", label: "राजकीय", hasDropdown: true },
  { path: "/jalna-district", label: "जालना-जिल्हा", hasDropdown: true },
  { path: "/beed-district", label: "बीड जिल्हा", hasDropdown: true },
  { path: "/weather", label: "हवामान", hasDropdown: true },
  { path: "/agriculture", label: "शेती विशेष", hasDropdown: true },
  { path: "/gallery", label: "GALLERY" },
];

const EditMenuLink = () => {
  const { label } = useParams(); // Get the 'label' parameter from the route
  const navigate = useNavigate(); // To navigate back after form submission
  const [category, setCategory] = useState({
    label: '',
    path: '',
    language: 'Marathi',
    categoryName: '',
    slug: '',
    description: '',
    keywords: '',
    color: '#2d65fe',
    order: '',
    showOnMenu: 'Yes',
    showOnHomepage: 'Yes',
    categoryBlockStyle: '',
  });

  useEffect(() => {
    // Find the category to edit
    const foundCategory = categoriesData.find((cat) => cat.label === label);
    if (foundCategory) {
      setCategory(foundCategory);
    }
  }, [label]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCategory((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Updated Category:', category);
    // Handle save logic (e.g., updating state in Navigation component)
    navigate('/');
  };

  return (
    <div className="container mx-auto p-0">
      <h4 className="text-2xl font-bold mb-4">Update Category</h4>
      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-sm p-4 space-y-4 max-w-full mx-auto">
        {/* Language and Category Name */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Language</label>
            <input
              type="text"
              name="language"
              value={category.language}
              onChange={handleInputChange}
              className="border rounded-sm p-1 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Category Name</label>
            <input
              type="text"
              name="categoryName"
              value={category.categoryName}
              onChange={handleInputChange}
              className="border rounded-sm p-1 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
        </div>

        {/* Slug and Order */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Slug (Leave blank for auto-generate)</label>
            <input
              type="text"
              name="slug"
              value={category.slug}
              onChange={handleInputChange}
              className="border rounded-sm p-1 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Order</label>
            <input
              type="number"
              name="order"
              value={category.order}
              onChange={handleInputChange}
              className="border rounded-sm p-1 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Description and Keywords */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Description</label>
            <textarea
              name="description"
              value={category.description}
              onChange={handleInputChange}
              className="border rounded-sm p-1 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Keywords</label>
            <input
              type="text"
              name="keywords"
              value={category.keywords}
              onChange={handleInputChange}
              className="border rounded-sm p-1 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Color and Block Style */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Color</label>
            <input
              type="color"
              name="color"
              value={category.color}
              onChange={handleInputChange}
              className="border rounded-sm p-1 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Category Block Style</label>
            <input
              type="text"
              name="categoryBlockStyle"
              value={category.categoryBlockStyle}
              onChange={handleInputChange}
              className="border rounded-sm p-1 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Show on Menu and Homepage */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Show on Menu</label>
            <select
              name="showOnMenu"
              value={category.showOnMenu}
              onChange={handleInputChange}
              className="border rounded-sm p-1 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Show on Homepage</label>
            <select
              name="showOnHomepage"
              value={category.showOnHomepage}
              onChange={handleInputChange}
              className="border rounded-sm p-1 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>
          </div>
        </div>

        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition mt-4">
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default EditMenuLink;
