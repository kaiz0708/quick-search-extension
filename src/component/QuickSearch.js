/** @format */

import React, { useState } from "react";
import { motion } from "framer-motion";
import { CircularProgress } from "@mui/material";
import { callGPT4HandleText, callGPT4HandleImage } from "../service/service";

const QuickSearch = () => {
   const [content, setContent] = useState("");
   const [answer, setAnswer] = useState("");
   const [reload, setReload] = useState(false);
   const [imageSrc, setImageSrc] = useState("");

   const handleResponse = (res) => {
      if (res !== null) {
         setAnswer(res);
         setImageSrc("");
         setContent("");
      }
   };

   const handleSearch = async (content, imageSrc) => {
      if (imageSrc != "") {
         const res = await callGPT4HandleImage(imageSrc);
         handleResponse(res);
      } else {
         const res = await callGPT4HandleText(content);
         handleResponse(res);
      }
   };

   const LoadingOverlay = () => {
      return (
         <div
            style={{
               position: "fixed",
               top: 0,
               left: 0,
               width: "100vw",
               height: "100vh",
               backgroundColor: "rgba(0, 0, 0, 0.2)",
               display: "flex",
               justifyContent: "center",
               alignItems: "center",
               zIndex: 9999,
            }}>
            <CircularProgress aria-label='Checking login status...' aria-live='polite' style={{ color: "#fff" }} />
         </div>
      );
   };

   const handlePaste = (e) => {
      const clipboardItems = e.clipboardData.items;
      for (const item of clipboardItems) {
         if (item.type.startsWith("image/")) {
            const blob = item.getAsFile();
            const reader = new FileReader();

            reader.onload = (event) => {
               const base64String = event.target.result;
               setImageSrc(base64String);
            };
            reader.readAsDataURL(blob);
            break;
         }
      }
   };

   return (
      <div>
         {reload ? <LoadingOverlay /> : null}
         <motion.div className='p-1 rounded-lg shadow-lg' initial='hidden' animate='visible' exit='hidden' transition={{ type: "spring", stiffness: 200, damping: 20 }}>
            {imageSrc !== "" ? (
               <div className='flex flex-wrap space-x-2'>
                  <img src={imageSrc} alt='Pasted Screenshot' className='w-8 h-8 border rounded mb-2' />
               </div>
            ) : (
               <div></div>
            )}

            <div className='relative'>
               <motion.input
                  type='text'
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  onPaste={(e) => {
                     handlePaste(e);
                  }}
                  onKeyDown={(e) => {
                     if (e.key === "Enter") {
                        handleSearch(content, imageSrc);
                     }
                  }}
                  placeholder='Enter anything you want to search'
                  className='w-full p-0.5 border rounded focus:outline-none'
               />

               <button
                  onClick={() => {
                     handleSearch(content, imageSrc);
                  }}
                  className='absolute right-0 h-full bg-gray-100 text-white p-0.5 rounded'>
                  search
               </button>
            </div>

            {answer !== "" ? <div className='h-10 overflow-y-auto scrollbar-thumb-rounded'>{answer}</div> : null}
         </motion.div>
      </div>
   );
};

export default QuickSearch;
