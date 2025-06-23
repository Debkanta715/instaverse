import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { db, storage } from "../utils/firebase";
import { collection, query, where, orderBy, onSnapshot, doc, deleteDoc, updateDoc } from "firebase/firestore";

export default function ProfilePage() {
  const { user } = useAuth();
  const [posts, setPosts] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editCaption, setEditCaption] = useState("");

  useEffect(() => {
    if (!user) return;
    const q = query(
      collection(db, "posts"),
      where("userEmail", "==", user.email),
      orderBy("createdAt", "desc")
    );
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setPosts(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    });
    return () => unsubscribe();
  }, [user]);

  const handleDelete = async (postId) => {
    if (window.confirm("Delete this post?")) {
      await deleteDoc(doc(db, "posts", postId));
    }
  };

  const handleEdit = (post) => {
    setEditingId(post.id);
    setEditCaption(post.caption);
  };

  const handleSave = async (postId) => {
    await updateDoc(doc(db, "posts", postId), { caption: editCaption });
    setEditingId(null);
    setEditCaption("");
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 p-4">
      <h2 className="text-2xl font-bold mb-6">My Profile</h2>
      <div className="mb-6 p-4 bg-white rounded shadow">
        <div className="font-semibold">{user?.email}</div>
      </div>
      <h3 className="text-lg font-semibold mb-4">My Posts</h3>
      {posts.map((post) => (
        <div key={post.id} className="bg-white rounded shadow mb-6 p-4">
          <img
            src={post.imageUrl}
            alt="Post"
            className="w-full h-64 object-cover rounded"
          />
          {editingId === post.id ? (
            <div className="flex gap-2 mt-2">
              <input
                className="border p-1 rounded flex-1"
                value={editCaption}
                onChange={(e) => setEditCaption(e.target.value)}
              />
              <button onClick={() => handleSave(post.id)} className="bg-green-500 text-white px-2 rounded">Save</button>
              <button onClick={() => setEditingId(null)} className="bg-gray-300 px-2 rounded">Cancel</button>
            </div>
          ) : (
            <div className="mt-2 text-sm text-gray-600">
              <strong>{post.userEmail}</strong> — {post.caption}
            </div>
          )}
          <div className="flex gap-2 mt-2">
            <button onClick={() => handleEdit(post)} className="text-blue-600">Edit</button>
            <button onClick={() => handleDelete(post.id)} className="text-red-600">Delete</button>
          </div>
        </div>
      ))}
    </div>
  );
} 