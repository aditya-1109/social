import React, { useEffect, useState } from "react";
import Buttons from "../ui/buttons";
import { createPostFunc } from "../../https/httpfunction";

export default function CreatePost({onclose}) {
  const [form, setForm] = useState({
    image: null,
    caption: "",
  });

  const [preview, setPreview] = useState(null);

  const [error, setError] = useState({
    image: "",
    caption: "",
  });

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setError((prev) => ({
        ...prev,
        image: "Only image files are allowed",
      }));
      setForm((prev) => ({ ...prev, image: null }));
      setPreview(null);
      return;
    }

     const imageURL = URL.createObjectURL(file);

    setForm((prev) => ({ ...prev, image: file }));
    setError((prev) => ({ ...prev, image: "" }));

   
    setPreview(imageURL);
  };

 
  useEffect(() => {
    return () => {
      if (preview) URL.revokeObjectURL(preview);
    };
  }, [preview]);

  const handleCaptionChange = (e) => {
    setForm((prev) => ({ ...prev, caption: e.target.value }));
    setError((prev) => ({ ...prev, caption: "" }));
  };

 const onSubmit = async (e) => {
  e.preventDefault();

  let hasError = false;

  if (!form.image) {
    setError((prev) => ({ ...prev, image: "Please upload an image" }));
    hasError = true;
  }

  if (!form.caption.trim()) {
    setError((prev) => ({ ...prev, caption: "Please write a caption" }));
    hasError = true;
  }

  if (hasError) return;

  const response = await createPostFunc(form);

  if(response){
    alert("Post created Successfully");
    onclose()
  }else{
    alert("Could not post")
  }

 
  
};


  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">
        
      <form
        onSubmit={onSubmit}
        className="w-[90vw] relative max-w-lg bg-white rounded-2xl shadow-xl p-6 space-y-5"
      >
        
        <h1 className="text-2xl font-semibold text-gray-900 text-center">
          Create Post
        </h1>

        <p onClick={onclose} className=" absolute top-4 right-4 font-semibold cursor-pointer text-lg text-gray-900 text-end">X</p>

        {/* Image Upload */}
        <div className="space-y-1">
          <label className="text-sm font-medium text-gray-700">
            Upload Image
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="w-full text-sm file:mr-4 file:py-2 file:px-4
                       file:rounded-lg file:border-0
                       file:bg-gray-100 file:text-gray-700
                       hover:file:bg-gray-200 cursor-pointer"
          />
          {error.image && (
            <p className="text-xs text-red-600">{error.image}</p>
          )}
        </div>

        {/* Image Preview */}
        {preview && (
          <div className="w-full flex justify-center">
            <img
              src={preview}
              alt="Preview"
              className="max-h-64 rounded-xl border border-gray-200 shadow-sm object-cover"
            />
          </div>
        )}

        {/* Caption */}
        <div className="space-y-1">
          <label className="text-sm font-medium text-gray-700">
            Caption
          </label>
          <textarea
            rows="3"
            placeholder="Write something about this post..."
            value={form.caption}
            onChange={handleCaptionChange}
            className="w-full rounded-lg border border-gray-300 px-3 py-2
                       text-sm focus:outline-none focus:ring-2 text-black
                       focus:ring-black/70 focus:border-transparent"
          />
          {error.caption && (
            <p className="text-xs text-red-600">{error.caption}</p>
          )}
        </div>

        {/* Button */}
        <div className="pt-2">
          <Buttons text="Post" type="submit" />
        </div>
      </form>
    </div>
  );
}
