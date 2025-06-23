import { useState } from "react";
import { db, storage } from "../utils/firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { useAuth } from "../context/AuthContext";
import { v4 as uuidv4 } from "uuid";

export default function UploadPage() {
  const [caption, setCaption] = useState("");
  const [image, setImage] = useState(null);
  const [uploading, setUploading] = useState(false);
  const { user } = useAuth();

  const handlePost = async (e) => {
    e.preventDefault();
    if (!image || !caption) return;

    try {
      setUploading(true);
      const imageRef = ref(storage, `posts/${user.uid}/${uuidv4()}`);
      await uploadBytes(imageRef, image);
      const imageUrl = await getDownloadURL(imageRef);

      await addDoc(collection(db, "posts"), {
        caption,
        imageUrl,
        userEmail: user.email,
        createdAt: serverTimestamp(),
      });

      setCaption("");
      setImage(null);
      alert("Post uploaded!");
    } catch (err) {
      alert("Error uploading post: " + err.message);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded shadow">
      <h2 className="text-xl font-bold mb-4">Create a New Post</h2>
      <form onSubmit={handlePost} className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="Write a caption..."
          className="border p-2 rounded"
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
          required
        />
        <input
          type="file"
          accept="image/*"
          className="border p-2 rounded"
          onChange={(e) => setImage(e.target.files[0])}
          required
        />
        <button
          disabled={uploading}
          className="bg-purple-600 text-white py-2 rounded hover:bg-purple-700"
        >
          {uploading ? "Uploading..." : "Post"}
        </button>
      </form>
    </div>
  );
} 