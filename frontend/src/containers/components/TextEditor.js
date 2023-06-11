// npm install react-quilljs quill
import "quill/dist/quill.snow.css"; // Add css for snow theme
// import 'quill/dist/quill.bubble.css'; // Add css for bubble theme
import React, { useEffect } from "react";
import { useQuill } from "react-quilljs";

export const TextEditor = ({ placeHolder, value, setValue, name, detail }) => {
    let theme = "snow";
    // const theme = "bubble";

    const modules = {
        toolbar: detail
            ? []
            : [
                  [{ font: [] }],
                  [{ size: [] }],
                  ["bold", "italic", "underline", "strike"],
                  [
                      { list: "ordered" },
                      { list: "bullet" },
                      { indent: "-1" },
                      { indent: "+1" },
                  ],
              ],
    };

    const placeholder = placeHolder;

    const formats = [
        "font",
        "size",
        "bold",
        "italic",
        "underline",
        "strike",
        "list",
        "indent",
    ];

    const { quill, quillRef } = useQuill({
        theme,
        modules,
        formats,
        placeholder,
    });

    // getText format
    useEffect(() => {
        if (quill && value) {
            quill.clipboard.dangerouslyPasteHTML(value);
        }
    }, [quill, value]);

    useEffect(() => {
        if (quill && !detail) {
            quill.on("text-change", (delta, oldDelta, source) => {
                // console.log(quill.getText()); // Get text only
                // console.log(quill.getContents()); // Get delta contents
                // console.log(quill.root.innerHTML); // Get innerHTML using quill
                // console.log(quillRef.current.firstChild.innerHTML); // Get innerHTML using quillRef
                setValue((prev) => ({
                    ...prev,
                    [name]: quill.root.innerHTML,
                }));
            });
        }
    }, [quill, name]);

    return (
        <div
            className={
                detail
                    ? `w-full h-[80%] border-[1px] border-lightgray border-solid bg-[#F5F5F5]`
                    : `w-full h-[80%] border-[1px] border-lightgray border-solid`
            }
        >
            <div ref={quillRef} className="text-lg" />
        </div>
    );
};
