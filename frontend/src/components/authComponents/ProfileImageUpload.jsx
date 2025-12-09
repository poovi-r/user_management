const ProfileImageUpload = ({ imagePreview, onImageChange, onRemoveImage }) => {
  return (
    <div className="flex justify-center mb-10">
      <div className="relative">
        <div className="w-36 h-36 rounded-full overflow-hidden ring-8 ring-white shadow-2xl bg-gray-100">
          {imagePreview ? (
            <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-purple-100 to-pink-100 flex items-center justify-center">
              <svg className="w-20 h-20 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" />
              </svg>
            </div>
          )}
        </div>
        <label className="absolute bottom-2 right-2 w-14 h-14 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center cursor-pointer shadow-2xl hover:scale-110 transition">
          {imagePreview ? (
            <svg onClick={onRemoveImage} className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          ) : (
            <>
              <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M12 4v16m8-8H4" />
              </svg>
              <input type="file" accept="image/*" onChange={onImageChange} className="hidden" />
            </>
          )}
        </label>
      </div>
    </div>
  );
};

export default ProfileImageUpload;