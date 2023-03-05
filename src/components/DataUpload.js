import React, { useRef } from "react";
import axios from "axios";
import useFileUpload from "react-use-file-upload";


const DataUpload = () => {
  const {
    files,
    fileNames,
    fileTypes,
    totalSize,
    totalSizeInBytes,
    handleDragDropEvent,
    clearAllFiles,
    createFormData,
    setFiles,
    removeFile,
  } = useFileUpload();
  
  const inputRef = useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = createFormData();

    console.log(formData);
    



    

    try {
      await axios.post("http://localhost:8000/api/uploadfile/", formData, {
        "content-type": "multipart/form-data",
      });
    } catch (error) {
      console.error("Failed to submit files.");
    }
  };

  return (
    <>
      <div
        className="w-full bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
        style={{ padding: "50px" }}
      >
        <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          Upload Files
        </h5>
        <p>
          Please use the form to your right to upload any file(s) of your
          choosing.
        </p>
        <div className="form-container">
          {/* Display the files to be uploaded */}
          <div>
            <ul>
              {fileNames.map((name) => (
                <li key={name}>
                  <span><b>File Name:</b>{name}</span>

                  <span onClick={() => removeFile(name)}>
                    <i className="fa fa-times" />
                  </span>
                </li>
              ))}
            </ul>

            {files.length > 0 && (
              <ul>
                <li>File types found: {fileTypes.join(", ")}</li>
                <li>Total Size: {totalSize}</li>
                <li>Total Bytes: {totalSizeInBytes}</li>

                <li className="clear-all">
                  <button onClick={() => clearAllFiles()}>Clear All</button>
                </li>
              </ul>
            )}
          </div>

          {/* Provide a drop zone and an alternative button inside it to upload files. */}
          <div
            onDragEnter={handleDragDropEvent}
            onDragOver={handleDragDropEvent}
            onDrop={(e) => {
              handleDragDropEvent(e);
              setFiles(e, "a");
            }}
          >
            <div class="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 my-5 " style = {{"background-color": "#000000ba"}}>
              <p class="mb-3 font-normal text-gray-500 dark:text-gray-400">
                Drag and drop Files here
              </p>
            </div>

            <button
              class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full my-5"
              onClick={() => inputRef.current.click()}
            >
              Select Files to Upload
            </button>

            {/* Hide the crappy looking default HTML input */}
            <input
              ref={inputRef}
              type="file"
              multiple
              style={{ display: "none" }}
              onChange={(e) => {
                setFiles(e, "a");
                inputRef.current.value = null;
              }}
            />
          </div>
        </div>

        <div className="submit">
          <button
            class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full my-5"
            onClick={handleSubmit}
          >
            Submit
          </button>
        </div>
      </div>
    </>
  );
};

export default DataUpload;