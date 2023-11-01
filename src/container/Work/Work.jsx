import React, { useState, useEffect } from 'react';
import { AiFillEye, AiFillGithub } from 'react-icons/ai';
import { motion } from 'framer-motion';

import { AppWrap, MotionWrap } from '../../wrapper';
import { urlFor, client } from '../../client';
import './Work.scss';

import './Work.scss';

const Work = () => {
   const [activeFilter, setActiveFilter] = useState('All');
   const [animateCard, setAnimateCard] = useState({ y: 0, opacity: 1 });
   const [works, setWorks] = useState([]);
   const [filterWork, setFilterWork] = useState([]);

   // Create a Set to store unique tags
   const uniqueTags = new Set();

   // Iterate through the projects and add tags to the Set
   works.forEach((work) => {
      work.tags.forEach((tag) => {
         if (tag !== '') {
            uniqueTags.add(tag);
         }
      });
   });

   // Convert the Set back to an array
   const uniqueTagsArray = Array.from(uniqueTags);

   // Use the filter method to remove "All" from the array
   const filteredArray = uniqueTagsArray.filter((tag) => tag !== 'All');

   // Sort the filtered array alphabetically
   const sortedArray = filteredArray.sort();

   // Add "All" to the end of the sorted array using concat
   const rearrangedArray = sortedArray.concat('All');

   useEffect(() => {
      const query = '*[_type == "works"]';

      client.fetch(query).then((data) => {
         setWorks(data);
         setFilterWork(data);
      });
   }, []);

   const handleWorkFilter = (item) => {
      setActiveFilter(item);
      setAnimateCard({ y: 100, opacity: 0 });

      setTimeout(() => {
         setAnimateCard({ y: 0, opacity: 1 });

         if (item === 'All') {
            setFilterWork(works);
         } else {
            setFilterWork(works.filter((work) => work.tags.includes(item)));
         }
      }, 500);
   };

   return (
      <>
         <h2 className="head-text">
            My Creative <span>Portfolio</span> Section
         </h2>

         <div className="app__work-filter">
            {rearrangedArray.map((item, index) => (
               <div
                  key={index}
                  onClick={() => handleWorkFilter(item)}
                  className={`app__work-filter-item app__flex p-text ${
                     activeFilter === item ? 'item-active' : ''
                  }`}
               >
                  {item}
               </div>
            ))}
         </div>

         <motion.div
            animate={animateCard}
            transition={{ duration: 0.5, delayChildren: 0.5 }}
            className="app__work-portfolio"
         >
            {filterWork.map((work, index) => (
               <div
                  className="app__work-item app__flex"
                  key={index}
               >
                  <div className="app__work-img app__flex">
                     <img
                        src={urlFor(work.imgUrl)}
                        alt={work.name}
                     />

                     <motion.div
                        whileHover={{ opacity: [0, 1] }}
                        transition={{
                           duration: 0.25,
                           ease: 'easeInOut',
                           staggerChildren: 0.5,
                        }}
                        className="app__work-hover app__flex"
                     >
                        <a
                           href={work.projectLink}
                           target="_blank"
                           rel="noreferrer"
                        >
                           <motion.div
                              whileInView={{ scale: [0, 1] }}
                              whileHover={{ scale: [1, 0.9] }}
                              transition={{
                                 duration: 0.25,
                              }}
                              className="app__flex"
                           >
                              <AiFillEye />
                           </motion.div>
                        </a>
                        <a
                           href={work.codeLink}
                           target="_blank"
                           rel="noreferrer"
                        >
                           <motion.div
                              whileInView={{ scale: [0, 1] }}
                              whileHover={{ scale: [1, 0.9] }}
                              transition={{
                                 duration: 0.25,
                              }}
                              className="app__flex"
                           >
                              <AiFillGithub />
                           </motion.div>
                        </a>
                     </motion.div>
                  </div>

                  <div className="app__work-content app__flex">
                     <h4 className="bold-text">{work.title}</h4>
                     <p
                        className="p-text"
                        style={{ marginTop: 10 }}
                     >
                        {work.description}
                     </p>
                     <div className="app__work_technology">
                        {work.tags
                           .filter((tag) => tag !== '' && tag !== 'All')
                           .map((tag, index, array) => (
                              <span key={index}>{tag}</span>
                           ))}
                     </div>
                     <div className="app__work-tag app__flex">
                        <p className="p-text">{work.tags[0]}</p>
                     </div>
                  </div>
               </div>
            ))}
         </motion.div>
      </>
   );
};

export default AppWrap(
   MotionWrap(Work, 'app__works'),
   'work',
   'app__primarybg'
);
