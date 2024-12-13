import React from 'react';

const PendingComments = () => {
  const comments = [
    { id: 1, name: "John Doe", comment: "Great post!", date: "2024-10-09" },
    { id: 2, name: "Jane Smith", comment: "I disagree with this point...", date: "2024-10-08" }
  ];

  return (
    <div className="bg-white shadow-md p-4 rounded-lg ml-9 ">
      <h2 className="text-xl font-bold mb-4">Pending Comments</h2>
      <table className="min-w-full table-auto ">
        <thead>
          <tr>
            <th className="px-4 py-2">Id</th>
            <th className="px-4 py-2">Name</th>
            <th className="px-4 py-2">Comment</th>
            <th className="px-4 py-2">Date</th>
          </tr>
        </thead>
        <tbody>
          {comments.map(comment => (
            <tr key={comment.id}>
              <td className="border px-4 py-2">{comment.id}</td>
              <td className="border px-4 py-2">{comment.name}</td>
              <td className="border px-4 py-2">{comment.comment}</td>
              <td className="border px-4 py-2">{comment.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PendingComments;
