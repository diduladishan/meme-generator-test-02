import React from "react";
import { MdDeleteForever, MdAddToPhotos } from "react-icons/md";

import {
  MdFormatBold,
  MdFormatUnderlined,
  MdFormatItalic,
} from "react-icons/md";

const TextEditor = ({
  text,
  onTextChange,
  onAddText,
  onDeleteText,
  onToggleBold,
  onToggleUnderline,
  onToggleItalic,
  isAddDisabled,
}) => {
  return (
    <div className="">
      <div className="mb-4">
        <input
          type="text"
          value={text.text || ""}
          className="h-[40px] w-full rounded-sm px-2"
          onChange={onTextChange}
          placeholder="Enter text"
        />
      </div>

      <div className="mb-4 flex items-center gap-4 text-white">
        <button
          onClick={onAddText}
          disabled={isAddDisabled}
          className="bg-[#40813f] py-1 px-2 rounded-md flex items-center justify-center gap-2"
        >
          <MdAddToPhotos className="text-[18px]" />
          Add More Text
        </button>
        <button
          onClick={onDeleteText}
          className="bg-[#e5342f] py-1 px-2 rounded-md flex items-center justify-center gap-2"
        >
          <MdDeleteForever className="text-[18px]" />
          Delete Text
        </button>
      </div>

      <div className="text-white flex gap-4">
        <button
          onClick={onToggleBold}
          style={{ fontWeight: text.fontWeight === "bold" ? "bold" : "normal" }}
        >
          <MdFormatBold className="text-[24px]" />
        </button>
        <button
          onClick={onToggleItalic}
          style={{
            fontStyle: text.fontStyle === "italic" ? "italic" : "normal",
          }}
        >
          <MdFormatItalic className="text-[24px]" />
        </button>
        <button
          onClick={onToggleUnderline}
          style={{
            textDecoration:
              text.textDecoration === "underline" ? "underline" : "none",
          }}
        >
          <MdFormatUnderlined className="text-[24px]" />
        </button>
      </div>
    </div>
  );
};

export default TextEditor;
