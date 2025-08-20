export default function Post({ post }) {
    return (
      <div className="bg-white p-4 rounded-lg shadow">
        <div className="flex items-center space-x-2 mb-2">
          <span className="font-semibold text-gray-900">
            {post.authorName}
          </span>
          <span className="text-gray-500 text-sm">
            {post.createdAt?.toDate().toLocaleDateString()}
          </span>
        </div>
        <p className="text-gray-700">{post.content}</p>
      </div>
    );
  }