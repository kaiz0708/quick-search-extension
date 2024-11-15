/** @format */

import React, { useState } from "react";
import { motion } from "framer-motion";
import { CircularProgress } from "@mui/material";

const QuickSearch = () => {
   const [content, setContent] = useState("");
   const [answer, setAnswer] = useState(
      "Giấc ngủ đóng vai trò vô cùng quan trọng đối với sức khỏe và sự phát triển toàn diện của con người. Khi ngủ, cơ thể được nghỉ ngơi và phục hồi, giúp tái tạo năng lượng cho ngày mới. Não bộ, trong khi ngủ, cũng tiến hành xử lý thông tin, hình thành trí nhớ và loại bỏ các chất độc tích tụ sau một ngày làm việc căng thẳng. Thiếu ngủ không chỉ ảnh hưởng đến khả năng tập trung và hiệu suất làm việc mà còn dẫn đến các vấn đề sức khỏe nghiêm trọng như béo phì, tiểu đường, bệnh tim, và thậm chí trầm cảm. Các chuyên gia khuyến cáo người lớn nên ngủ từ 7 đến 8 giờ mỗi đêm, trong khi trẻ em và thanh thiếu niên cần nhiều thời gian hơn để phát triển toàn diện. Việc duy trì một giấc ngủ đều đặn, hạn chế ánh sáng xanh từ các thiết bị điện tử trước giờ đi ngủ, và tạo ra không gian ngủ thoải mái là những cách đơn giản nhưng hiệu quả giúp cải thiện chất lượng giấc ngủ."
   );
   const [reload, setReload] = useState(false);
   const [imageSrc, setImageSrc] = useState([]);

   const handleSearch = () => {
      setReload(true);
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
               setImageSrc((prevImages) => [...prevImages, event.target.result]);
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

            <div className='flex flex-wrap space-x-2'>
               {imageSrc.map((img) => (
                  <img src={img} alt='Pasted Screenshot' className='w-8 h-8 border rounded mb-2' />
               ))}
            </div>

            <div className='relative mb-4'>
               <motion.input
                  type='text'
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  onPaste={(e) => {
                     handlePaste(e);
                  }}
                  onKeyDown={(e) => {
                     if (e.key === "Enter") {
                     }
                  }}
                  placeholder='Enter anything you want to search'
                  className='w-full p-2 border rounded focus:outline-none'
               />

               <button onClick={handleSearch} className='absolute right-0 h-full bg-green-300 text-white p-2 rounded hover:bg-green-500'>
                  Search
               </button>
            </div>

            {answer !== "" && answer !== null ? (
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
