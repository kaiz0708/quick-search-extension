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
         <motion.div className='p-3 rounded-lg shadow-lg' initial='hidden' animate='visible' exit='hidden' transition={{ type: "spring", stiffness: 200, damping: 20 }}>
            <h2 className='text-base text-center font-medium text-gray-600 mb-4'>Quick Search</h2>

            {imageSrc !== "" ? (
               <div className='flex flex-wrap space-x-2'>
                  <img src={imageSrc} alt='Pasted Screenshot' className='w-8 h-8 border rounded mb-2' />
               </div>
            ) : (
               <div></div>
            )}

            <div className='relative mb-4'>
               <motion.input
                  type='text'
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  onPaste={(e) => {
                     handlePaste(e);
                  }}
                  placeholder='Enter anything you want to search'
                  className='w-full p-2 border rounded focus:outline-none'
               />

               <button
                  onClick={() => {
                     handleSearch(content, imageSrc);
                  }}
                  className='absolute right-0 h-full bg-green-300 text-white p-2 rounded hover:bg-green-500'>
                  Search
               </button>
            </div>

            {answer !== "" ? (
               <div className=''>
                  <h2 className='text-base text-center font-medium text-gray-600 mb-2'>Answer</h2>
                  <div className='h-12 overflow-y-auto scrollbar-thumb-rounded'>{answer}</div>
               </div>
            ) : null}
         </motion.div>
      </div>
   );
};

export default QuickSearch;
