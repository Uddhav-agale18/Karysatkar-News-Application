import React, { useState } from 'react';
import { MdEdit, MdDelete } from 'react-icons/md';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { useNavigate } from 'react-router-dom';

// Initial categories data
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

const Navigation = () => {
  const [categories, setCategories] = useState(categoriesData);
  const [newMenuLink, setNewMenuLink] = useState({
    title: '',
    link: '',
    menuOrder: 1,
    parentLink: 'None',
    showOnMenu: 'Yes',
  });
  const [menuLimit, setMenuLimit] = useState(9);
  const navigate = useNavigate();

  const handleEdit = (category) => {
    navigate(`/admin/navigation/edit-menu-link/${category.label}`);
  };

  const handleDelete = (category) => {
    setCategories(categories.filter((cat) => cat.label !== category.label));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewMenuLink((prev) => ({ ...prev, [name]: value }));
  };

  const handleMenuLimitChange = (e) => {
    setMenuLimit(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setCategories((prevCategories) => [
      ...prevCategories,
      { ...newMenuLink, label: newMenuLink.title },
    ]);
    setNewMenuLink({
      title: '',
      link: '',
      menuOrder: 1,
      parentLink: 'None',
      showOnMenu: 'Yes',
    });
  };

  const handleSaveChanges = () => {
    console.log('Save changes for menu limit:', menuLimit);
  };

  const onDragEnd = (result) => {
    if (!result.destination) return;

    const reorderedCategories = Array.from(categories);
    const [moved] = reorderedCategories.splice(result.source.index, 1);
    reorderedCategories.splice(result.destination.index, 0, moved);

    setCategories(reorderedCategories);
  };

  return (
    <div className="container mx-auto p-4 flex flex-wrap justify-between space-y-4">
      {/* Navigation Section */}
      <div className="w-full md:w-[48%] bg-white shadow-md rounded-sm p-4 mb-4">
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="droppable">
            {(provided) => (
              <nav
                ref={provided.innerRef}
                {...provided.droppableProps}
                className="text-sm"
              >
                <h2 className="text-2xl font-bold mb-4">Navigation</h2>
                <ul className="space-y-2">
                  {categories.map((category, index) => (
                    <Draggable key={category.label} draggableId={category.label} index={index}>
                      {(provided) => (
                        <li
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          className="flex justify-between items-center p-3 bg-gray-100 rounded-sm transition duration-300"
                        >
                          <span className="text-base font-medium">{category.label}</span>
                          <div>
                            <button
                              onClick={() => handleEdit(category)}
                              className="text-blue-500 hover:text-blue-700 mx-1"
                              title="Edit"
                            >
                              <MdEdit />
                            </button>
                            <button
                              onClick={() => handleDelete(category)}
                              className="text-red-500 hover:text-red-700"
                              title="Delete"
                            >
                              <MdDelete />
                            </button>
                          </div>
                        </li>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </ul>
              </nav>
            )}
          </Droppable>
        </DragDropContext>
      </div>

      {/* Add Link Section */}
      <div className="w-full md:w-[48%] bg-white shadow-md rounded-sm p-4 mb-4">
        <form onSubmit={handleSubmit} className="space-y-4">
          <h2 className="text-2xl font-bold mb-4">Add Menu Link</h2>

          <div>
            <label className="block text-sm font-medium mb-2">Title</label>
            <input
              type="text"
              name="title"
              value={newMenuLink.title}
              onChange={handleInputChange}
              required
              className="border rounded-sm p-2 w-full"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Link</label>
            <input
              type="text"
              name="link"
              value={newMenuLink.link}
              onChange={handleInputChange}
              required
              className="border rounded-sm p-2 w-full"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Menu Order</label>
            <input
              type="number"
              name="menuOrder"
              value={newMenuLink.menuOrder}
              onChange={handleInputChange}
              min="1"
              className="border rounded-sm p-2 w-full"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Parent Link</label>
            <select
              name="parentLink"
              value={newMenuLink.parentLink}
              onChange={handleInputChange}
              className="border rounded-sm p-2 w-full"
            >
              <option value="None">None</option>
              {categories.map((category, index) => (
                <option key={index} value={category.label}>{category.label}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Show on Menu</label>
            <select
              name="showOnMenu"
              value={newMenuLink.showOnMenu}
              onChange={handleInputChange}
              className="border rounded-sm p-2 w-full"
            >
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>
          </div>

          <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition w-full">
            Add Menu Link
          </button>
        </form>
      </div>

      {/* Menu Limit Section */}
      <div className="w-full md:w-[48%] bg-white shadow-md rounded-sm p-4 mb-4">
        <div>
          <h2 className="text-2xl font-bold mb-4">Menu Limit</h2>
          <label className="block text-sm font-medium mb-2">Set Menu Limit</label>
          <input
            type="number"
            value={menuLimit}
            onChange={handleMenuLimitChange}
            className="border rounded-sm p-2 w-full"
          />
          <button
            onClick={handleSaveChanges}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition w-full mt-4"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default Navigation;
