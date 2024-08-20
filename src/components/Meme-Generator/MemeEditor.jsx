import React, { useState, useRef, useEffect } from "react";
import Draggable from "react-draggable";
import html2canvas from "html2canvas";
import TextEditor from "./TextEditor";
import ColorPicker from "./ColorPicker";
import FontSelector from "./FontSelector";
import FontSizeSelector from "./FontSizeSelector";
import { MdDownloadForOffline, MdImage } from "react-icons/md";
import ImageSelector from "./ImageSelector";
import TextIcon from "../../assets/textEditor/Lowercase.png";

import image1 from "../../assets/image01.png";
import image2 from "../../assets/image02.png";
import image3 from "../../assets/image03.png";
import image4 from "../../assets/image04.png";
import image5 from "../../assets/image05.png";
import image6 from "../../assets/image06.png";
import image7 from "../../assets/image07.png";
import image8 from "../../assets/5.png";

const images = [image1, image2, image3, image4, image5, image6, image7, image8];

const MemeEditor = () => {
  const [texts, setTexts] = useState([]);
  const [selectedTextId, setSelectedTextId] = useState(null);
  const [currentColor, setCurrentColor] = useState("#ffffff");
  const [selectedImage, setSelectedImage] = useState(null);
  const memeRef = useRef(null);

  useEffect(() => {
    if (texts.length === 0) {
      handleAddText();
    }
  }, [texts]);

  const handleTextChange = (e) => {
    const newTexts = texts.map((text) =>
      text.id === selectedTextId ? { ...text, text: e.target.value } : text
    );
    setTexts(newTexts);
  };

  const handleColorChange = (color) => {
    setCurrentColor(color.hex);
    const newTexts = texts.map((text) =>
      text.id === selectedTextId ? { ...text, color: color.hex } : text
    );
    setTexts(newTexts);
  };

  const handleFontChange = (e) => {
    const newTexts = texts.map((text) =>
      text.id === selectedTextId ? { ...text, fontStyle: e.target.value } : text
    );
    setTexts(newTexts);
  };

  const handleFontSizeChange = (e) => {
    const newTexts = texts.map((text) =>
      text.id === selectedTextId
        ? { ...text, fontSize: parseInt(e.target.value, 10) }
        : text
    );
    setTexts(newTexts);
  };

  const handleToggleBold = () => {
    const newTexts = texts.map((text) =>
      text.id === selectedTextId
        ? {
            ...text,
            fontWeight: text.fontWeight === "bold" ? "normal" : "bold",
          }
        : text
    );
    setTexts(newTexts);
  };

  const handleToggleItalic = () => {
    const newTexts = texts.map((text) =>
      text.id === selectedTextId
        ? {
            ...text,
            fontStyle: text.fontStyle === "italic" ? "normal" : "italic",
          }
        : text
    );
    setTexts(newTexts);
  };

  const handleToggleUnderline = () => {
    const newTexts = texts.map((text) =>
      text.id === selectedTextId
        ? {
            ...text,
            textDecoration:
              text.textDecoration === "underline" ? "none" : "underline",
          }
        : text
    );
    setTexts(newTexts);
  };

  const handleAddText = () => {
    if (texts.length < 4) {
      const newId = texts.length + 1;
      const newY =
        texts.length === 0
          ? 100
          : texts[texts.length - 1].y + texts[texts.length - 1].fontSize + 10;
      setTexts([
        ...texts,
        {
          id: newId,
          text: "",
          x: 100,
          y: newY,
          color: currentColor,
          fontStyle: "Roboto",
          fontSize: 24,
          fontWeight: "normal",
          textDecoration: "none",
        },
      ]);
      setSelectedTextId(newId);
    }
  };

  const handleSelectText = (id) => {
    setSelectedTextId(id);
  };

  const handleDeleteText = () => {
    if (selectedTextId !== null) {
      setTexts(texts.filter((text) => text.id !== selectedTextId));
      setSelectedTextId(null);
    }
  };

  const handleDownloadMeme = () => {
    const selectedTextElement = document.getElementById(
      `text-${selectedTextId}`
    );
    if (selectedTextElement) {
      selectedTextElement.style.border = "none";
    }

    html2canvas(memeRef.current).then((canvas) => {
      const link = document.createElement("a");
      link.href = canvas.toDataURL("image/png");
      link.download = "meme.png";
      link.click();

      if (selectedTextElement) {
        selectedTextElement.style.border = "2px dotted #000";
      }
    });
  };

  const handleImageSelect = (image) => {
    setSelectedImage(image);
    // No need to hide the image selector
  };

  return (
    <div className="grid grid-cols-12 h-screen">
      <div className="bg-[#191919] col-span-2">01</div>
      <div className="bg-[#191919] col-span-8 flex justify-center border border-[#535353]">
        <div>
          <div style={{ position: "relative", width: "500px" }}>
            <div
              ref={memeRef}
              style={{ position: "relative", display: "inline-block" }}
            >
              {selectedImage ? (
                <>
                  <img
                    src={selectedImage}
                    alt="Meme"
                    style={{ width: "100%", height: "auto" }}
                  />
                  {texts.map((text) => (
                    <Draggable
                      key={text.id}
                      defaultPosition={{ x: text.x, y: text.y }}
                      onStop={(e, data) => {
                        const newTexts = texts.map((t) =>
                          t.id === text.id ? { ...t, x: data.x, y: data.y } : t
                        );
                        setTexts(newTexts);
                      }}
                    >
                      <div
                        id={`text-${text.id}`}
                        style={{
                          position: "absolute",
                          top: 0,
                          left: 0,
                          color: text.color,
                          fontSize: `${text.fontSize}px`,
                          fontWeight: text.fontWeight,
                          textDecoration: text.textDecoration,
                          fontStyle: text.fontStyle,
                          textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)",
                          fontFamily: text.fontStyle,
                          cursor: "move",
                          border:
                            text.id === selectedTextId
                              ? "2px dotted #fff"
                              : "none",
                        }}
                        onClick={() => handleSelectText(text.id)}
                      >
                        {text.text}
                      </div>
                    </Draggable>
                  ))}
                </>
              ) : (
                <ImageSelector onImageSelect={handleImageSelect} />
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="bg-[#191919] col-span-2">
        <div className="flex items-center gap-6 mb-6">
          <img src={TextIcon} alt="My Image" />
          <p className="self-end text-white">Text</p>
        </div>

        <div className="flex">
          {selectedImage && selectedTextId !== null && (
            <div className="w-full">
              <div className=" border-b border-[#535353] py-3 px-4">
                <TextEditor
                  text={texts.find((text) => text.id === selectedTextId)}
                  onTextChange={handleTextChange}
                  onAddText={handleAddText}
                  onDeleteText={handleDeleteText}
                  onToggleBold={handleToggleBold}
                  onToggleItalic={handleToggleItalic}
                  onToggleUnderline={handleToggleUnderline}
                  isAddDisabled={texts.length >= 4}
                />
              </div>

              <div className="border-b border-[#535353] py-3 px-4">
                <ColorPicker
                  currentColor={currentColor}
                  onColorChange={handleColorChange}
                />
              </div>

              <div className="border-b border-[#535353] py-3 px-4">
                <FontSelector
                  currentFont={
                    texts.find((text) => text.id === selectedTextId)?.fontStyle
                  }
                  onFontChange={handleFontChange}
                />
              </div>

              <div className="border-b border-[#535353] py-3 px-4">
                <FontSizeSelector
                  currentSize={
                    texts.find((text) => text.id === selectedTextId)?.fontSize
                  }
                  onFontSizeChange={handleFontSizeChange}
                />
              </div>
            </div>
          )}

          <div className="self-end">
            <button
              className="bg-[#8B0000] text-white py-2 px-4 rounded-md mt-4"
              onClick={handleDownloadMeme}
              disabled={!selectedImage}
            >
              <MdDownloadForOffline className="inline mr-2" />
              Download
            </button>
          </div>
        </div>

        <button
          className="bg-[#8B0000] text-white py-2 px-4 rounded-md mt-4"
          onClick={() => setSelectedImage(null)} // Option to clear the image
        >
          <MdImage className="inline mr-2" />
          Change Image
        </button>
      </div>
    </div>
  );
};

export default MemeEditor;
