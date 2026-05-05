import React, { useEffect, useMemo, useState } from 'react';
import { FaAward, FaGraduationCap } from 'react-icons/fa';
import { GiGraduateCap } from 'react-icons/gi';
import ScrollReveal from '../scrollReveal/ScrollReveal.jsx';
import ResultsSkeleton from '../skeletons/ResultsSkeleton.jsx';
import Title from '../title/title.jsx';
import './pastResults.css';

const boardOptions = [
  { id: 'icse', label: 'ICSE', icon: FaAward },
  { id: 'isc', label: 'ISC', icon: FaGraduationCap },
  { id: 'cbse', label: 'CBSE', icon: GiGraduateCap },
];

const boardMarksLabels = {
  icse: 'Computer Application Marks',
  isc: 'Computer Science Marks',
  cbse: 'Computer Science Marks',
};

const yearOptions = ['2026', '2025', '2024', '2023'];

const createResults = (entries) =>
  entries.map(([name, marks], index) => ({
    rank: index + 1,
    name,
    year: '2025',
    marks,
  }));

const icse2025Entries = [
  ['Rajyashree Das', '100'],
  ['Diya Roy', '100'],
  ['Shanvi Saha', '100'],
  ['Rudrapriya Biswas', '100'],
  ['Aditya Banik', '100'],
  ['Priyani Mukherjee', '100'],
  ['Sagnik Manna', '100'],
  ['Udita Samanta', '100'],
  ['Saptashwa Pal', '100'],
  ['Debopriya Sain', '100'],
  ['Renesa Sinha', '100'],
  ['Eeshan Sengupta Chakrabartty', '100'],
  ['Ryan Louis', '99'],
  ['Rashni Dey', '99'],
  ['Antarip Sen', '99'],
  ['Oushnik Pal', '99'],
  ['Debangy Moulick', '99'],
  ['Dibya Bhattacharya', '99'],
  ['Satvik Seth', '99'],
  ['Srijani Sengupta', '99'],
  ['Fazeen Ahamed', '99'],
  ['Rajkumari Chitrangada', '99'],
  ['Ishani Biswas', '99'],
  ['Abhinav Nath', '99'],
  ['Srijani Mukherjee', '99'],
  ['Pragya Mondal', '99'],
  ['Lineysha Sadhukhan', '99'],
  ['Ankit Nandy', '99'],
  ['Aishani Chatterjee', '98'],
  ['Souparno Naskar', '98'],
  ['Sampurna Biswas', '98'],
  ['Abantika Mukherjee', '98'],
  ['Asmi Patra', '98'],
  ['Aishani Das', '98'],
  ['Samrat Ghosh', '98'],
  ['Adriza Biswas', '98'],
  ['Soham Ray', '98'],
  ['Meghna Ghosh', '98'],
  ['Maheshi Jena', '98'],
  ['Sambita Das', '98'],
  ['Saksham Agarwal', '98'],
  ['Md Hamzah Waris', '98'],
  ['Adrija Saha', '98'],
  ['Sahreen Islam Sarkar', '98'],
  ['Subhrajit Ghosh', '98'],
  ['Raunak Barman', '98'],
  ['Yaagnasenee Sarkar', '98'],
  ['Antareep Bhattacharya', '98'],
  ['Adity Shaw', '98'],
  ['Bristimita Maity', '98'],
  ['Anushka Chatterjee', '98'],
  ['Sreejoiee Sarkar', '98'],
  ['Kirit Mallik', '98'],
  ['Spandan Koyral', '97'],
  ['Krisnakshi Mitra', '97'],
  ['Mritsa Ghosh Dastidar', '97'],
  ['Pragyan Biswas', '97'],
  ['Bikram Kar', '97'],
  ['Anubhav Nath', '97'],
  ['Aryaman Roy', '97'],
  ['Aditya Agrawal', '97'],
  ['Angshuman Ghosh', '97'],
  ['Adrita Banerjee', '97'],
  ['Prajukta Saha', '97'],
  ['Priyanshu Pasupureddi', '97'],
  ['Aayush Bhattacharyya', '97'],
  ['Avipsa Mandal', '97'],
  ['Asmita Basu', '97'],
  ['Aveek Chatterjee', '97'],
  ['Shrestha Chakraborty', '96'],
  ['Divyajyoti Pandey', '96'],
  ['Debjani Roy', '96'],
  ['Abhradip Das', '96'],
  ['Sushmit Roy', '96'],
  ['Adhrika Ghosh', '96'],
  ['Saptarshee Nandy', '96'],
  ['Riddhima Ray', '96'],
  ['Utsha Paul', '96'],
  ['Aniruddha Roy', '96'],
  ['Asmit Sarkar', '96'],
  ['Riya Gupta', '96'],
  ['Arkaprova Ghosh', '95'],
  ['Srinjoy Mazumder', '95'],
  ['Samadrita Malakar', '95'],
  ['Anushka Bedi', '95'],
  ['Maydhabeni Bairagi', '95'],
  ['Amelia Das', '95'],
  ['Aayushi Chakrabarti', '95'],
  ['Tamanash Ghosh', '95'],
  ['Madhuja Sil', '95'],
  ['Suhita Maitra', '94'],
  ['Satyajita Dolai', '94'],
  ['Jishnu Sarkar', '94'],
  ['Soumyadyuti Sadhu', '94'],
  ['Srinjan Majumdar', '94'],
  ['Subhodip Mukherjee', '93'],
  ['Disha Biswas', '93'],
  ['Mayukh Mallick', '93'],
  ['Insha Anis', '93'],
  ['Subhanjan Dey', '93'],
  ['Rodasi Biswas', '93'],
  ['Sayantani Das', '93'],
  ['Debojyoti Debnath', '92'],
  ['Rohitabjho Tapaswi', '92'],
  ['Hrishika Bhattacharya', '92'],
  ['Sreeja Dey', '92'],
  ['Rahul Das', '91'],
  ['Ishita Dasgupta', '91'],
  ['Archisman Saha', '91'],
  ['Aritra Sadhukhan', '91'],
  ['Chitrayan Manna', '90'],
  ['Aditya Bhakat', '90'],
  ['Dishani Dutta', '90'],
  ['Sahil Raj Srivastav', '90'],
  ['Dibyajyoti Biswas', '90'],
  ['Alekhya Chakraborty', '90'],
  ['Neeladri Bhakta', '89'],
  ['Anuran Sen', '89'],
  ['Uday Giri', '89'],
  ['Baibhav Roy', '89'],
  ['Parnashri Satya', '88'],
  ['Sunishka Bhagat', '88'],
  ['Sampuran Roy', '88'],
  ['Shirshadeep Kar', '88'],
  ['Ankit Bedi', '88'],
  ['Himadri Chatterjee', '88'],
  ['Rehan Ali Gazi', '88'],
  ['Shreyashree Patra', '88'],
  ['Srijita Mallick', '87'],
  ['Swapnil Koner', '87'],
  ['Tanvi Sadhukhan', '87'],
  ['Rishin Sengupta', '86'],
  ['Tannistha Karan', '85'],
  ['Subhomoy Chatterjee', '85'],
  ['Rudrangshu Das', '84'],
  ['Rudra Kumar Shaw', '84'],
  ['Anant Kumar', '80'],
  ['Nishant Mitra', '80'],
  ['Kevin Gomes', '76'],
  ['Stuti Lama', '71'],
];

// TODO: Add the remaining verified ICSE right-side poster entries if their marks are
// independently readable in a higher-resolution source.

const icse2024Entries = [
  { name: 'Kunal Bhattacharya', marks: '100', school: 'Adamas International School' },
  { name: 'Sagnika Mukherjee', marks: '100', school: 'Douglas Memorial Higher Secondary' },
  { name: 'Soham Khan', marks: '100', school: 'St.Augustines Day School' },
  { name: 'Ishani Mukherjee', marks: '100', school: 'Modern English Academy' },
  { name: 'Nandita Rakshit', marks: '100', school: 'Assembly of Angels Secondary' },
  { name: 'Dattatreya Mukherjee', marks: '100', school: 'St.Claret School' },
  { name: 'Sriparna Sadhu', marks: '100', school: 'St.Augustines Day School' },
  { name: 'Dipan Majumdar', marks: '100', school: 'Delhi Public School' },
  { name: 'Aharsi Bhattacharya', marks: '100', school: 'Delhi Public School' },
  { name: 'Pouli Pramanick', marks: '100', school: 'Modern English Academy' },
  { name: 'Arghadeep Paul', marks: '100', school: 'Authpur National Model School' },
  { name: 'Souritra Basu', marks: '100', school: 'Modern English Academy' },
  { name: 'Shreyam Bhar', marks: '100', school: 'Assembly of Angels Secondary' },
  { name: 'Priyanshu Datta', marks: '100', school: 'Modern English Academy' },
  { name: 'Indranil sadhukhan', marks: '100', school: 'Assembly of Angels Secondary' },
  { name: 'Aryan Bandyopadhyay', marks: '100', school: 'St.Augustines Day School' },
  { name: 'Kaushiki Mukherjee', marks: '100', school: 'Modern English Academy' },
  { name: 'Ephraim Chhetri', marks: '100', school: 'St.Augustines Day School' },
  { name: 'Trinanjan Chattopadhyay', marks: '100', school: 'St.Augustines Day School' },
  { name: "Upasyo Kushari", marks: '100', school: "St. Xavier's Institution" },
  { name: 'Ryaan Roy', marks: '100', school: 'Modern English Academy' },
  { name: 'Sumantika Bhattacharyya', marks: '100', school: 'Modern English Academy' },
  { name: 'Shreejita Sau', marks: '100', school: 'Modern English Academy' },
  { name: 'Sahina Sultana', marks: '100', school: 'Douglas Memorial Higher Secondary' },
  { name: 'Chandrabali Roy', marks: '100', school: 'W.W.A. Cossipore English School' },
  { name: 'Prerona Banerjee', marks: '100', school: 'St.Augustines Day School' },
  { name: 'Souroja Dutta', marks: '100', school: 'Modern English Academy' },
  { name: 'Subhasree Bose', marks: '100', school: 'Modern English Academy' },
  { name: 'Amartya Kumar Ray', marks: '100', school: 'Douglas Memorial Higher Secondary' },
  { name: 'Swapnadeep Banerjee', marks: '100', school: 'Modern English Academy' },
  { name: 'Dipan Majumdar', marks: '100', school: 'DPS Megacity' },
  { name: 'Aritro Ghosh', marks: '100', school: 'Douglas Memorial Higher Secondary' },
  { name: 'Aharshii Bhattacharya', marks: '100', school: 'Delhi Public School' },
  { name: 'Vaishnavi Kashyap', marks: '100', school: 'Assembly of Christ School' },
  { name: 'Emili Chatterjee', marks: '99', school: 'Modern English Academy' },
  { name: 'Bhoomika Roy', marks: '99', school: 'St.Augustines Day School' },
  { name: 'Soumajit Bhattacharjee', marks: '99', school: 'St.Augustines Day School' },
  { name: 'Soumil Biswas', marks: '99', school: 'Modern English Academy' },
  { name: 'Subarno Das', marks: '99', school: 'Douglas Memorial Higher Secondary' },
  { name: 'Oishiki Mukherjee', marks: '99', school: 'Douglas Memorial Higher Secondary' },
  { name: 'Arpan Rakshit', marks: '99', school: 'St.Augustines Day School' },
  { name: 'Zia Dutta', marks: '99', school: 'Modern English Academy' },
  { name: 'Sarthak Mukherjee', marks: '99', school: 'Modern English Academy' },
  { name: 'Anwesha Sarkar', marks: '99', school: 'Douglas Memorial Higher Secondary' },
  { name: 'Shalini Paul Roy', marks: '99', school: 'Modern English Academy' },
  { name: 'Sampoorna Dey', marks: '99', school: 'St.Augustines Day School' },
  { name: 'Udaydeep Sengupta', marks: '99', school: 'Modern English Academy' },
  { name: 'Shramana roy', marks: '99', school: 'Modern English Academy' },
  { name: 'Ishaan Sarkar', marks: '98', school: 'St.Augustines Day School' },
  { name: 'Hritambhara Sanyal', marks: '98', school: 'St.Augustines Day School' },
  { name: 'Souparno Sur', marks: '98', school: 'Modern English Academy' },
  { name: 'Titiksha Sah', marks: '98', school: 'Modern English Academy' },
  { name: 'Antara Roy', marks: '98', school: 'Modern English Academy' },
  { name: 'Adrakshi Kolay', marks: '98', school: 'St.Augustines Day School' },
  { name: 'Debam Chatterjee', marks: '98', school: 'Modern English Academy' },
  { name: 'Doyita Ghosh', marks: '98', school: 'Assembly of Angels Secondary' },
  { name: 'Piyas Karmakar', marks: '98', school: 'Modern English Academy' },
  { name: 'Snigdhadeep Biswas', marks: '98', school: 'Modern English Academy' },
  { name: 'Nirmalya Patra', marks: '98', school: 'St.Augustines Day School' },
  { name: 'Manjima Chaudhary', marks: '98', school: 'Modern English Academy' },
  { name: 'Arnabi Sen', marks: '97', school: 'Modern English Academy' },
  { name: 'Soumyadeep Ghosh', marks: '97', school: 'Modern English Academy' },
  { name: 'Sampriti Maitra', marks: '97', school: 'Modern English Academy' },
  { name: 'Sucheta Gayen', marks: '97', school: 'Assembly of Angels Secondary' },
  { name: 'A. Sunita Dora', marks: '97', school: 'Assembly of Angels Secondary' },
  { name: 'Tuneer Biswas', marks: '97', school: 'St.Claret School' },
  { name: 'Debangan Shit', marks: '97', school: 'Modern English Academy' },
  { name: 'Souradeep', marks: '97', school: 'Modern English Academy' },
  { name: 'Drona Mukherjee', marks: '97', school: 'Modern English Academy' },
  { name: 'Sayon Ghosh', marks: '96', school: 'Douglas Memorial Higher Secondary' },
  { name: 'Yashita Thapa', marks: '96', school: 'Modern English Academy' },
  { name: 'Ankita Sarkar', marks: '96', school: 'Douglas Memorial Higher Secondary' },
  { name: 'Ruparna Chatterjee', marks: '96', school: 'Modern English Academy' },
  { name: 'Adrito Chakraborty', marks: '96', school: 'Assembly of Angels Secondary' },
  { name: 'Asif Ali', marks: '96', school: 'St.Claret School' },
  { name: 'Arya Roy', marks: '96', school: 'St.Augustines Day School' },
  { name: 'Shuvam Porel', marks: '96', school: 'Modern English Academy' },
  { name: 'Spandan Das', marks: '96', school: 'Douglas Memorial Higher Secondary' },
  { name: 'Aryan Kalwar', marks: '95', school: 'Modern English Academy' },
  { name: 'Shreyasi Baidya', marks: '95', school: 'St.Augustines Day School' },
  { name: 'Siddhant Shaw', marks: '95', school: 'St.Augustines Day School' },
  { name: 'Avirup Pal', marks: '95', school: 'Douglas Memorial Higher Secondary' },
  { name: 'Rijul Chattopadhyay', marks: '94', school: 'Authpur National Model School' },
  { name: 'Samadrita Mukherjee', marks: '94', school: 'Modern English Academy' },
  { name: 'Ayan Das', marks: '94', school: 'Douglas Memorial Higher Secondary' },
  { name: 'Sayandeep Naskar', marks: '94', school: 'St.Augustines Day School' },
  { name: 'Aradhita Pyne', marks: '94', school: 'Modern English Academy' },
  { name: 'Adwitiya Paul', marks: '94', school: 'St.Claret School' },
  { name: 'Sanmay Gangopadhyay', marks: '94', school: 'Modern English Academy' },
  { name: 'Agniva Biswas', marks: '94', school: 'Douglas Memorial Higher Secondary' },
  { name: 'Ayush', marks: '94', school: 'Assembly of Christ School' },
  { name: 'Yash Ghosh', marks: '94', school: 'Modern English Academy' },
  { name: 'Debangi Banerjee', marks: '94', school: 'St.Augustines Day School' },
  { name: 'Srijit Dhar', marks: '94', school: 'Modern English Academy' },
  { name: 'Indraneel Mitra', marks: '94', school: 'Modern English Academy' },
  { name: 'Adhrit Kumar Samaddar', marks: '94', school: 'Modern English Academy' },
  { name: 'Manishika Acharyya', marks: '93', school: 'Modern English Academy' },
  { name: 'Anushree Das', marks: '93', school: 'Douglas Memorial Higher Secondary' },
  { name: 'Debrup Roy', marks: '93', school: 'Assembly of Angels Secondary' },
  { name: 'Sourashree Kar', marks: '93', school: 'Modern English Academy' },
  { name: 'Satyaki Biswas', marks: '93', school: 'Modern English Academy' },
  { name: 'Ahan Das', marks: '92', school: 'St.Augustines Day School' },
  { name: 'Arpan Saha', marks: '92', school: 'Douglas Memorial Higher Secondary' },
  { name: 'Md.Shoaib', marks: '92', school: 'St.Augustines Day School' },
  { name: 'Soham Biswas', marks: '92', school: 'St.Augustines Day School' },
  { name: 'Parijat Mitra', marks: '92', school: 'Douglas Memorial Higher Secondary' },
  { name: 'Ayush Kumar', marks: '92', school: 'Modern English Academy' },
  { name: 'Aiswariya Dutta Gupta', marks: '92', school: 'St.Augustines Day School' },
  { name: 'Srisha Sinha Roy', marks: '92', school: 'Modern English Academy' },
  { name: 'Prachi Acharya', marks: '92', school: 'St.Augustines Day School' },
  { name: 'Jinal Roy', marks: '92', school: 'Modern English Academy' },
  { name: 'Adrika Dey', marks: '92', school: 'Douglas Memorial Higher Secondary' },
  { name: 'Anuvab Bhawal', marks: '92', school: 'St.Augustines Day School' },
  { name: 'Sousthab Guha', marks: '91', school: 'Modern English Academy' },
  { name: 'Arkojit Roy', marks: '91', school: 'Modern English Academy' },
  { name: 'Deboshmit Roy', marks: '91', school: "St. Xavier's Institution" },
  { name: 'Sahayata Sircar', marks: '91', school: 'Modern English Academy' },
  { name: 'Deepan Talukdar', marks: '90', school: 'Modern English Academy' },
  { name: 'Angana Ghosh', marks: '90', school: 'Modern English Academy' },
  { name: 'Memosha Roy', marks: '90', school: 'Assembly of Angels Secondary' },
  { name: 'Sofia Parveen', marks: '90', school: 'St.Augustines Day School' },
  { name: 'Esther Sunar', marks: '90', school: 'Modern English Academy' },
  { name: 'Manoj', marks: '89', school: 'Modern English Academy' },
  { name: 'Shitadri Mitra', marks: '88', school: 'St.Luigi School' },
  { name: 'Hrishikesh Singh', marks: '87', school: 'Douglas Memorial Higher Secondary' },
  { name: 'Subhradip Bose', marks: '87', school: 'Modern English Academy' },
  { name: 'Hritisha Sarkar', marks: '86', school: 'St.Claret School' },
  { name: 'Itushree Dey', marks: '86', school: 'Modern English Academy' },
  { name: 'Ushmita', marks: '86', school: 'Douglas Memorial Higher Secondary' },
  { name: 'Shourjya Das', marks: '86', school: 'St.Augustines Day School' },
  { name: 'Trisha Karmakar', marks: '85', school: 'Douglas Memorial Higher Secondary' },
  { name: 'Sanjukta Das', marks: '85', school: 'St.Claret School' },
  { name: 'Swarnava Saha', marks: '85', school: 'St.Augustines Day School' },
  { name: 'Swapnil Saha', marks: '83', school: 'Modern English Academy' },
  { name: 'Additiya Banerjee', marks: '80', school: 'Douglas Memorial Higher Secondary' },
  { name: 'Patrali Chatterjee', marks: '80', school: 'Douglas Memorial Higher Secondary' },
  { name: 'Samiksha', marks: '78', school: 'St.Augustines Day School' },
  { name: 'Debanshu Deb', marks: '77', school: 'Douglas Memorial Higher Secondary' },
  { name: 'Shagufta Parween', marks: '76', school: 'Assembly of Christ School' },
  { name: 'Sharanna Sur', marks: '75', school: 'Modern English Academy' },
  { name: 'Tiyasha Nath', marks: '74', school: 'Assembly of Christ School' },
  { name: 'Rooprekha', marks: '74', school: 'Modern English Academy' },
  { name: 'Addwitia Chakraborty', marks: '70', school: 'St.Claret School' },
];

const buildResults = (entries, year) =>
  entries.map((entry, index) => ({
    rank: index + 1,
    name: entry.name,
    year,
    marks: entry.marks,
    school: entry.school,
  }));

const isc2025Entries = [
  ['Soudrita Kusari', '100'],
  ['Meghdri Chakraborty', '92'],
  ['Ankita Karmakar', '99'],
  ['Soumyajit Das', '92'],
  ['Kangona Sinha', '98'],
  ['Abhaneel Dey', '92'],
  ['Sresthha Chakraborty', '97'],
  ['Riddhi Som', '91'],
  ['Akash Naiya', '96'],
  ['Shounak Roy', '90'],
  ['Arkajit Saha', '96'],
  ['Sankarshan Chakraborty', '90'],
  ['Anish Deb Roy', '96'],
  ['Serene Goswami', '90'],
  ['Alolika Roy', '95'],
  ['Swapnil Dutta', '90'],
  ['Nayanika Porel', '94'],
  ['Surjyodipto Das', '88'],
  ['Kalpan Sanyal', '94'],
  ['Debosmita Bhowmick', '85'],
  ['Aparup Ghosh', '93'],
  ['Ayan Bhattacharya', '81'],
  ['Shreya Halder', '93'],
  ['Ayush Banerjee', '80'],
  ['Sumit Kumar Ghosh', '93'],
  ['Shuvanan Acharyya', '79'],
  ['Niladri Chakraborty', '92'],
  ['Utsab Chatterjee', '79'],
  ['Shabinah Murad', '92'],
  ['Aditya Roy', '74'],
];

const cbse2025Entries = [
  ['Bihangesh Guha', '96'],
  ['Soumojit Das', '92'],
  ['Siddhartha Chowdhury', '96'],
  ['Suniti Shaw', '92'],
  ['Debbroto Sarkar', '96'],
  ['Debayan Bhowmick', '91'],
  ['Soumalya Mukherjee', '95'],
  ['Krishnendu Das', '91'],
  ['Dibyajyoti Baisya', '95'],
  ['Aritra Majumder', '91'],
  ['Suchana Chowdhury', '95'],
  ['Ritam Biswas', '91'],
  ['Abhinaba Roy', '94'],
  ['Ramit Mitra', '90'],
  ['Archisman Mitra', '94'],
  ['Swapnil Mandal', '90'],
  ['Parthiv Chatterjee', '94'],
  ['Prapti Dutta', '88'],
  ['Subhronil Bhadra', '93'],
  ['Sinjini Biswas', '85'],
  ['Hrishikesh Dey', '92'],
  ['Sajid Ali Ansari', '83'],
];

const icse2026Entries = [
  { name: 'Arkoraj Ghosh', marks: 100, school: 'St. Claret School' },
  { name: 'Priyangshu Chatterjee', marks: 100, school: 'St. Augustine Day School, SNR' },
  { name: 'Ishant Kumar', marks: 100, school: 'St. Augustine Day School, BKP' },
  { name: 'Samriddhi Mondal', marks: 100, school: 'St. Augustine Day School, BKP' },
  { name: 'Ayan kumar Mondal', marks: 100, school: 'St. Augustine Day School, BKP' },
  { name: 'Mandrita Bhattacharya', marks: 100, school: 'St. Augustine Day School, BKP' },
  { name: 'ADRIJA JOARDER', marks: 100, school: 'St. Augustine Day School, BKP' },
  { name: 'Sankalan Das', marks: 100, school: 'St. Augustine Day School, BKP' },
  { name: 'Dhiaan Bhaduri', marks: 100, school: 'St. Augustine Day School, BKP' },
  { name: 'Siddharth Shankar Ghosh', marks: 100, school: 'St. Augustine Day School, BKP' },
  { name: 'Ankush Das', marks: 100, school: 'Modern English Academy' },
  { name: 'Soumabho Biswas', marks: 100, school: 'Modern English Academy' },
  { name: 'Anurag Sarkar', marks: 100, school: 'Modern English Academy' },
  { name: 'Ayush Mukhopadhyay', marks: 100, school: 'Modern English Academy' },
  { name: 'Purbayan Roy', marks: 100, school: 'Modern English Academy' },
  { name: 'Manmeet Ray', marks: 100, school: 'Modern English Academy' },
  { name: 'Sourojit Das', marks: 100, school: 'Modern English Academy' },
  { name: 'Kriday Saha', marks: 100, school: 'Modern English Academy' },
  { name: 'Vedansh Singh', marks: 100, school: 'Modern English Academy' },
  { name: 'Mayon Bhadury', marks: 99, school: 'St. Claret School' },
  { name: 'Pratishtha Chakraborty', marks: 99, school: 'Assembly of Angels Secondary School' },
  { name: 'Aishani Bhattacharya', marks: 99, school: 'Modern English Academy' },
  { name: 'Abhinaba Roy', marks: 99, school: 'St. Claret School' },
  { name: 'Oishee Banik', marks: 99, school: 'St. Claret School' },
  { name: 'Debatro Saha', marks: 99, school: 'Douglas Memorial H.S. School' },
  { name: 'Aditya Shaw', marks: 99, school: 'Douglas Memorial H.S. School' },
  { name: 'Aishik Choudhury', marks: 99, school: 'St. Augustine Day School, BKP' },
  { name: 'Aditya biswas', marks: 99, school: 'Assembly of Angels Secondary School' },
  { name: 'Parag Sen', marks: 99, school: 'St. Augustine Day School, BKP' },
  { name: 'Srishti Majumdar', marks: 99, school: 'St. Augustine Day School, BKP' },
  { name: 'Soham Ghosh', marks: 99, school: 'St. Augustine Day School, BKP' },
  { name: 'Abhinav Das', marks: 99, school: 'Modern English Academy' },
  { name: 'Anushka Sadhu', marks: 99, school: 'Modern English Academy' },
  { name: 'Saptarshi Guha', marks: 99, school: 'Modern English Academy' },
  { name: 'Apeksha Saha', marks: 99, school: 'Modern English Academy' },
  { name: 'Pubali Neogi', marks: 99, school: 'Modern English Academy' },
  { name: 'Joanna Bhattacharyya', marks: 99, school: 'Modern English Academy' },
  { name: 'Toshani Dhar', marks: 99, school: 'Modern English Academy' },
  { name: 'Niharika basu', marks: 99, school: 'Modern English Academy' },
  { name: 'Abirup Mukherjee', marks: 99, school: 'Modern English Academy' },
  { name: 'Soham Basak', marks: 99, school: 'St. Augustine Day School, BKP' },
  { name: 'Ujaan Gupta', marks: 99, school: 'Assembly of Angels Secondary School' },
  { name: 'Sarthak Goswami', marks: 98, school: 'Assembly of Angels Secondary School' },
  { name: 'Soham Biswas', marks: 98, school: 'Assembly of Angels Secondary School' },
  { name: 'Ishaan Bhattacharya', marks: 98, school: 'Assembly of Angels Secondary School' },
  { name: 'Snithik Saha Mondal', marks: 98, school: 'St. Claret School' },
  { name: 'Srija Manna', marks: 98, school: 'St. Claret School' },
  { name: 'Stuti Paine', marks: 98, school: 'St. Claret School' },
  { name: 'Purbhi Rajak', marks: 98, school: 'St. Claret School' },
  { name: 'Ahana Roy', marks: 98, school: 'St. Augustine Day School, BKP' },
  { name: 'Wriddhesh Kundu', marks: 98, school: 'St. Claret School' },
  { name: 'Daipayan Das', marks: 98, school: 'Assembly of Angels Secondary School' },
  { name: 'RUDRA DUTTA', marks: 98, school: 'Douglas Memorial H.S. School' },
  { name: 'DIPANGSHU SARKAR', marks: 98, school: 'St. Augustine Day School, BKP' },
  { name: 'Suha Akhtar', marks: 98, school: 'St. Augustine Day School, BKP' },
  { name: 'Nirajit Sarkar', marks: 98, school: 'St. Augustine Day School, BKP' },
  { name: 'Sobhona Nandi', marks: 98, school: 'St. Augustine Day School, SNR' },
  { name: 'Soham Dey', marks: 98, school: 'St. Augustine Day School, BKP' },
  { name: 'Nisttha Dey', marks: 98, school: 'St. Augustine Day School, SNR' },
  { name: 'Aditya Parek', marks: 98, school: 'St. Augustine Day School, BKP' },
  { name: 'Manoswita Mallick', marks: 98, school: 'Modern English Academy' },
  { name: 'Soham Bandyopadhyay', marks: 98, school: 'Modern English Academy' },
  { name: 'Nimisha Sarkar', marks: 98, school: 'Modern English Academy' },
  { name: 'Aayatakshi Gorai', marks: 98, school: 'Modern English Academy' },
  { name: 'Deborshe Biswas', marks: 98, school: 'Modern English Academy' },
  { name: 'Stuti Nag', marks: 98, school: 'Modern English Academy' },
  { name: 'Shinjita bandyopadhyay', marks: 98, school: 'Modern English Academy' },
  { name: 'Debayan Bagchi', marks: 98, school: 'Modern English Academy' },
  { name: 'Dattatreyo Chakraborty', marks: 98, school: 'Modern English Academy' },
  { name: 'Aryabrata Das', marks: 98, school: 'Modern English Academy' },
  { name: 'Hridi Bagchi', marks: 98, school: 'Modern English Academy' },
  { name: 'Tinisha Chatterjee', marks: 98, school: 'Assembly of Angels Secondary School' },
  { name: 'Adrita Ghosh', marks: 97, school: 'Assembly of Angels Secondary School' },
  { name: 'Md. Zohaib Quasim', marks: 97, school: 'Assembly of Angels Secondary School' },
  { name: 'Rishit Dutta', marks: 97, school: 'St. Claret School' },
  { name: 'Jyotirmoy Dhar', marks: 97, school: 'St. Claret School' },
  { name: 'Ayndrakshi Paul', marks: 97, school: 'St. Claret School' },
  { name: 'Stuti Chakravorty', marks: 97, school: 'St. Claret School' },
  { name: 'Ayan Biswas', marks: 97, school: 'Douglas Memorial H.S. School' },
  { name: 'Nazir Sekh', marks: 97, school: 'Douglas Memorial H.S. School' },
  { name: 'AYUSH SAHA', marks: 97, school: 'St. Augustine Day School, BKP' },
  { name: 'Sneha Shaw', marks: 97, school: 'Modern English Academy' },
  { name: 'sagnik maji', marks: 97, school: 'St. Augustine Day School, BKP' },
  { name: 'Rupsa Biswas', marks: 97, school: "St. Xavier's Institution, Ruiya" },
  { name: 'Eshika Mondal', marks: 97, school: 'St. Augustine Day School, BKP' },
  { name: 'Srija Das', marks: 97, school: 'St. Augustine Day School, BKP' },
  { name: 'Ishan Laha', marks: 97, school: 'St. Augustine Day School, BKP' },
  { name: 'Ayushman Banerjee', marks: 97, school: 'Modern English Academy' },
  { name: 'Biswapriti das', marks: 97, school: 'Modern English Academy' },
  { name: 'Suhana Nag', marks: 97, school: 'Modern English Academy' },
  { name: 'Sudebjyoti Bhowmik', marks: 97, school: 'Modern English Academy' },
  { name: 'AYANTIK BHATTACHARYA', marks: 97, school: 'Modern English Academy' },
  { name: 'Debdyuti Bhattacharyya', marks: 97, school: 'Douglas Memorial H.S. School' },
  { name: 'Debanshu Paul', marks: 97, school: 'St. Augustine Day School, BKP' },
  { name: 'Sagnik Kundu', marks: 96, school: 'St. Claret School' },
  { name: 'Hrishi Biswas', marks: 96, school: 'St. Claret School' },
  { name: 'Abhinab Ray', marks: 96, school: 'Douglas Memorial H.S. School' },
  { name: 'Aliva Halder', marks: 96, school: 'Douglas Memorial H.S. School' },
  { name: 'Tourjodeep Roy', marks: 96, school: 'St. Augustine Day School, BKP' },
  { name: 'Anushka Dutta', marks: 96, school: 'Modern English Academy' },
  { name: 'MEGH Chakraborty', marks: 96, school: 'St. Augustine Day School, BKP' },
  { name: 'Debarka Sarkar', marks: 96, school: "St. Xavier's Institution, Panihati" },
  { name: 'ARYA GHOSH', marks: 96, school: 'St. Augustine Day School, BKP' },
  { name: 'Abhirup Dutta', marks: 96, school: 'St. Augustine Day School, BKP' },
  { name: 'Dwitipriya Biswas', marks: 96, school: 'Modern English Academy' },
  { name: 'Shirsha Dasgupta', marks: 96, school: 'Modern English Academy' },
  { name: 'Srijani Maitra', marks: 96, school: 'Modern English Academy' },
  { name: 'Rik Mallick', marks: 96, school: 'Assembly of Christ School' },
  { name: 'Sandipan Chakraborty', marks: 96, school: 'Modern English Academy' },
  { name: 'Adrija Biswas', marks: 95, school: 'St. Claret School' },
  { name: 'Prattay Roy', marks: 95, school: 'Adamas International School' },
  { name: 'Ankit dutta', marks: 95, school: 'Assembly of Angels Secondary School' },
  { name: 'Aastha Halder', marks: 95, school: 'Assembly of Angels Secondary School' },
  { name: 'Adrish Das', marks: 95, school: 'St. Claret School' },
  { name: 'Agniva Naha', marks: 95, school: 'St. Claret School' },
  { name: 'PRIYANGSU DEY', marks: 95, school: 'Douglas Memorial H.S. School' },
  { name: 'Antara Das', marks: 95, school: 'Douglas Memorial H.S. School' },
  { name: 'Avi Mondal', marks: 95, school: 'St. Augustine Day School, BKP' },
  { name: 'Panchhi Sharma', marks: 95, school: 'Modern English Academy' },
  { name: 'Dishani Majumdar', marks: 95, school: 'St. Claret School' },
  { name: 'Gourav Kumar aich', marks: 94, school: 'St. Augustine Day School, BKP' },
  { name: 'Anwesha Jana', marks: 94, school: 'Adamas International School' },
  { name: 'Gourav Banerjee', marks: 94, school: 'St. Augustine Day School, BKP' },
  { name: 'Zaniva Das', marks: 94, school: 'Modern English Academy' },
  { name: 'Ayushi Gupta', marks: 94, school: 'Modern English Academy' },
  { name: 'Raksha Damai', marks: 94, school: 'Modern English Academy' },
  { name: 'Anushka Sarkar', marks: 94, school: 'Modern English Academy' },
  { name: 'Faizan Sabir Ansari', marks: 94, school: 'Modern English Academy' },
  { name: 'Lavanya Bhakat', marks: 94, school: 'Modern English Academy' },
  { name: 'Smita Ghosh', marks: 94, school: 'Douglas Memorial H.S. School' },
  { name: 'Protyush Das', marks: 93, school: 'Assembly of Angels Secondary School' },
  { name: 'Rishima Debnath', marks: 93, school: 'Assembly of Angels Secondary School' },
  { name: 'Anwesha Dutta', marks: 93, school: 'Modern English Academy' },
  { name: 'Suhani Shaw', marks: 93, school: 'Douglas Memorial H.S. School' },
  { name: 'Gour Moinak Rao', marks: 93, school: 'Douglas Memorial H.S. School' },
  { name: 'Bidisha Das', marks: 93, school: 'Modern English Academy' },
  { name: 'Aratrika Mandal', marks: 93, school: 'Modern English Academy' },
  { name: 'Samrat Ghosh', marks: 93, school: 'St. Claret School' },
  { name: 'Rudra Biswas', marks: 93, school: 'St. Augustine Day School, SNR' },
  { name: 'Sohan datta', marks: 92, school: 'St. Claret School' },
  { name: 'Pragya Chattopadhyay', marks: 92, school: 'St. Claret School' },
  { name: 'Ashish Kumar Singh', marks: 92, school: "St. Augustine's Day School, BKP" },
  { name: 'Supratik Mandal', marks: 92, school: 'Modern English Academy' },
  { name: 'Sushnata Maiti', marks: 92, school: 'Modern English Academy' },
  { name: 'Naisha Chakraborty', marks: 92, school: 'Modern English Academy' },
  { name: 'Rupam Sarkar', marks: 91, school: 'Assembly of Angels Secondary School' },
  { name: 'Tiyasa Biswas', marks: 90, school: 'St. Claret School' },
  { name: 'Shankha Ghosh', marks: 90, school: 'Adamas International School' },
  { name: 'Anurag Majumder', marks: 90, school: 'Assembly of Angels Secondary School' },
  { name: 'Sunanda Ghosh', marks: 90, school: 'Assembly of Angels Secondary School' },
  { name: 'Debangaan Roy Ghatak', marks: 90, school: 'Assembly of Angels Secondary School' },
  { name: 'Shripriya Biswas', marks: 90, school: 'St. Claret School' },
  { name: 'Srijon Lahiri', marks: 90, school: 'Douglas Memorial H.S. School' },
  { name: 'Soubhagya Dutta', marks: 90, school: 'Douglas Memorial H.S. School' },
  { name: 'Debarati Chakraborty', marks: 90, school: 'St. Augustine Day School, BKP' },
  { name: 'Pratusha Das', marks: 90, school: 'St. Augustine Day School, BKP' },
  { name: 'Pratiksha Bishnu', marks: 90, school: 'Modern English Academy' },
  { name: 'Souvik Dhali', marks: 89, school: 'Douglas Memorial H.S. School' },
  { name: 'Ayush Jain', marks: 89, school: 'Modern English Academy' },
  { name: 'Shriyans Ghosh', marks: 88, school: 'Douglas Memorial H.S. School' },
  { name: 'Dev Mukherjee', marks: 88, school: 'St. Augustine Day School, SNR' },
  { name: 'Moupriya Bhattacharya', marks: 88, school: 'St. Augustine Day School, SNR' },
  { name: 'Susmith Chakraborty', marks: 88, school: 'St. Augustine Day School, BKP' },
  { name: 'Satwik Datta', marks: 88, school: 'Modern English Academy' },
  { name: 'Anuska Dey', marks: 87, school: 'St. Augustine Day School, BKP' },
  { name: 'Subhajit Bera', marks: 87, school: 'St. Augustine Day School, BKP' },
  { name: 'Kaushani Sarkar', marks: 86, school: 'Modern English Academy' },
  { name: 'Pritam Paul', marks: 86, school: 'St. Augustine Day School, BKP' },
  { name: 'Trishani Moitra', marks: 85, school: 'St. Augustine Day School, SNR' },
  { name: 'Aishika Roy', marks: 85, school: 'St. Augustine Day School, BKP' },
  { name: 'Suniska Debnath', marks: 84, school: 'St. Augustine Day School, BKP' },
  { name: 'Arijeet Saha', marks: 84, school: 'St. Augustine Day School, BKP' },
  { name: 'Subhanganaa Barai', marks: 83, school: 'St. Claret School' },
  { name: 'Harman Singh', marks: 82, school: 'St. Augustine Day School, BKP' },
  { name: 'Anusmita Roy', marks: 82, school: 'Modern English Academy' },
  { name: 'Adrija mondal', marks: 81, school: 'St. Augustine Day School, BKP' },
  { name: 'Priyom Sinha', marks: 80, school: 'St. Claret School' },
  { name: 'Sneha Mishra', marks: 78, school: 'St. Augustine Day School, BKP' },
  { name: 'Saptarsi Das', marks: 77, school: 'St. Augustine Day School, BKP' },
  { name: 'Adrija Chattopadhyay', marks: 74, school: 'Modern English Academy' },
];

const isc2026Entries = [
  { name: 'Anushka Ghosh', marks: '100', school: "St. Xavier's Institution, Panihati" },
  { name: 'Satyaki Roy Ghatak', marks: '100', school: "St. Xavier's Institution, Panihati" },
  { name: 'Soham Khan', marks: '99', school: 'St. Augustine Day School, BKP' },
  { name: 'Subhasree Bose', marks: '99', school: 'Modern English Academy' },
  { name: 'Priyanshu Dutta', marks: '98', school: 'Modern English Academy' },
  { name: 'Soumil Biswas', marks: '98', school: 'Delhi Public School' },
  { name: 'Ayan Das', marks: '98', school: 'Douglas Memorial H.S. School' },
  { name: 'Antara Roy', marks: '98', school: 'Modern English Academy' },
  { name: 'Indraneel Sahdhukhan', marks: '98', school: 'Assembly of Angels Secondary School' },
  { name: 'Debam Chatterjee', marks: '97', school: 'Modern English Academy' },
  { name: 'Arpan Saha', marks: '97', school: 'Douglas Memorial H.S. School' },
  { name: 'Debangshu Dhar', marks: '97', school: 'St. Claret School' },
  { name: 'Chandrabali Roy', marks: '97', school: 'W.W.A. Cossipore English School' },
  { name: 'Souparno Sur (MEA)', marks: '97', school: 'Modern English Academy' },
  { name: 'Swapnadeep Banerjee (MEA)', marks: '97', school: 'Modern English Academy' },
  { name: 'Abhirup Pal', marks: '96', school: 'Douglas Memorial H.S. School' },
  { name: 'Sahina Sultana', marks: '95', school: 'Douglas Memorial H.S. School' },
  { name: 'Anwesha Sarkar', marks: '95', school: 'Douglas Memorial H.S. School' },
  { name: 'Shilpa Ghosh (STADS)', marks: '95', school: 'St. Augustine Day School, SNR' },
  { name: 'Amartya Kumar Ray (DMHSS)', marks: '94', school: 'Douglas Memorial H.S. School' },
  { name: 'Asif Ali', marks: '94', school: 'St. Claret School' },
  { name: 'Ephraim Chhetri', marks: '93', school: 'St. Augustine Day School, BKP' },
  { name: 'Dattatreya Mukherjee', marks: '93', school: 'St. Claret School' },
  { name: 'Siddhant Shaw', marks: '91', school: 'St. Augustine Day School, BKP' },
  { name: 'Souradeep Dam', marks: '91', school: 'Modern English Academy' },
  { name: 'Medha Paul (STADS - Shym)', marks: '91', school: 'St. Augustine Day School, SNR' },
  { name: 'KUNAL BHATTACHARYA', marks: '91', school: 'Adamas International School' },
  { name: 'Shibangi Banerjee (STADS)', marks: '90', school: 'St. Augustine Day School, SNR' },
  { name: 'Memosha Roy', marks: '90', school: 'Assembly of Angels Secondary School' },
  { name: 'Indraneel Mitra', marks: '90', school: 'Modern English Academy' },
  { name: 'Priyanshu Datta', marks: '89', school: 'Modern English Academy' },
  { name: 'Drona Mukherjee (MEA)', marks: '89', school: 'Modern English Academy' },
  { name: 'Ahana Saha (STADS)', marks: '88', school: 'St. Augustine Day School, SNR' },
  { name: 'Sarthak Mukherjee', marks: '88', school: 'Modern English Academy' },
  { name: 'A. Sunita Dora (STADS)', marks: '88', school: 'St. Augustine Day School, BKP' },
  { name: 'Kinjal', marks: '88', school: 'Modern English Academy' },
  { name: 'Shitadri Mitra', marks: '87', school: 'St. Luigi School' },
  { name: 'Srisha Sinha Roy', marks: '85', school: 'Modern English Academy' },
  { name: 'Prachi Acharya', marks: '85', school: 'St. Augustine Day School, BKP' },
  { name: 'Ahana Saha', marks: '83', school: 'Douglas Memorial H.S. School' },
  { name: 'Parijat Mitra', marks: '81', school: 'Douglas Memorial H.S. School' },
];

const resultsData = {
  icse: {
    2025: createResults(icse2025Entries),
    2026: buildResults(icse2026Entries, '2026'),
    2024: buildResults(icse2024Entries, '2024'),
    2023: [],
  },
  isc: {
    2025: createResults(isc2025Entries),
    2026: buildResults(isc2026Entries, '2026'),
    2024: [],
    2023: [],
  },
  cbse: {
    2025: createResults(cbse2025Entries),
    2024: [],
    2023: [],
  },
};

const PastResults = () => {
  const [activeBoard, setActiveBoard] = useState('icse');
  const [activeYear, setActiveYear] = useState('2026');
  const [isTableReady, setIsTableReady] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return undefined;

    const frameId = window.requestAnimationFrame(() => {
      setIsTableReady(true);
    });

    return () => window.cancelAnimationFrame(frameId);
  }, []);

  const selectedResults = useMemo(
    () => resultsData[String(activeBoard)]?.[String(activeYear)] ?? [],
    [activeBoard, activeYear]
  );

  const marksLabel = boardMarksLabels[activeBoard];

  useEffect(() => {
    if (!import.meta.env.DEV) return undefined;

    console.log('PastResults selectedBoard:', activeBoard);
    console.log('PastResults selectedYear:', activeYear);
    console.log('PastResults rows count:', selectedResults.length);

    return undefined;
  }, [activeBoard, activeYear, selectedResults.length]);

  return (
    <ScrollReveal
      as="section"
      className="past-results"
      aria-label="Past Results"
      animation="fade-up"
      duration={850}
    >
      <Title subtitle="Board-wise Results" title="Past Results" />
      <p className="past-results-intro">
        Celebrating our students’ strong performance in Computer Application and Computer Science across ICSE, ISC, and CBSE boards.
      </p>

      <div className="past-results-board-row" role="tablist" aria-label="Boards">
        {boardOptions.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            type="button"
            className={`past-results-board-card ${activeBoard === id ? 'active' : ''}`}
            onClick={() => setActiveBoard(id)}
            role="tab"
            aria-selected={activeBoard === id}
          >
            <span className="past-results-board-icon" aria-hidden="true">
              <Icon />
            </span>
            <span>{label}</span>
          </button>
        ))}
      </div>

      <div className="past-results-panel smooth-card hover-lift">
        <div className="past-results-year-row" role="tablist" aria-label="Result years">
          {yearOptions.map((year) => (
            <button
              key={year}
              type="button"
              className={`past-results-year-tab ${activeYear === year ? 'active' : ''}`}
              onClick={() => setActiveYear(year)}
              role="tab"
              aria-selected={activeYear === year}
            >
              {year}
            </button>
          ))}
        </div>

        {!isTableReady ? (
          <ResultsSkeleton />
        ) : (
          <div className="past-results-table-wrap">
            <div className="past-results-table-scroll">
              <table className="past-results-table">
                <thead>
                  <tr>
                    <th>Sl. No.</th>
                    <th>Student Name</th>
                    <th>Year</th>
                    <th>{marksLabel}</th>
                  </tr>
                </thead>
                <tbody>
                  {selectedResults.length ? (
                    selectedResults.map((result) => (
                      <tr key={`${activeBoard}-${activeYear}-${result.rank}-${result.name}`}>
                        <td>{result.rank}</td>
                        <td>{result.name}</td>
                        <td>{result.year}</td>
                        <td>{result.marks}</td>
                      </tr>
                    ))
                  ) : (
                    <tr className="past-results-empty-row">
                      <td colSpan={4}>Results will be updated soon.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </ScrollReveal>
  );
};

export default PastResults;
