import React, { useEffect, useMemo, useState } from 'react';
import { useLocation } from 'react-router-dom';
import PageSeo from '../../components/seo/PageSeo.jsx';
import ScrollReveal from '../../components/scrollReveal/ScrollReveal.jsx';
import ImageWithSkeleton from '../../components/skeletons/ImageWithSkeleton.jsx';
import './faculties.css';

const getFacultyImagePath = (fileName) => `/${encodeURIComponent(fileName)}`;

const buildTeacher = ({
  fileName,
  name,
  qualification,
  experience,
  imageScale = 1.1,
  imagePosition = 'center',
  imageTranslateY = '0px',
  imageFit = 'cover',
}) => ({
  name,
  qualification,
  experience,
  image: fileName ? getFacultyImagePath(fileName) : '/RUPAM_GHOSH.jpeg',
  imageScale,
  imagePosition,
  imageTranslateY,
  imageFit,
});

const juniorTeachers = [
  buildTeacher({
    fileName: 'Debopriya_Biswas.jpeg',
    name: 'DEBOORIYA BISWAS',
    qualification: 'B.A. IN JOURNALISM AND MASS COMMUNICATION (Pursuing)',
    experience: "4 years of teaching experience at Subho's Computer Institute.",
    imageScale: 1.01,
    imagePosition: 'center 42%',
  }),
  buildTeacher({
    fileName: 'RAJANYA_GHOSH.jpeg',
    name: 'RAJANYA GHOSH',
    qualification: 'B.Sc Forensic Science (Pursuing)',
    experience: "4 years of teaching experience at Subho's Computer Institute.",
  }),
  buildTeacher({
    fileName: 'RUPAM_BASU.jpeg',
    name: 'RUPAM BASU',
    qualification: 'B.A. English Honours, M.A. English Honours, B.Ed. (Pursuing)',
    experience:
      "5 years of private tutoring experience and 2 years of teaching experience at Subho's Computer Institute.",
  }),
  buildTeacher({
    fileName: 'ANTARA_CHAKRABORTY.jpeg',
    name: 'ANTARA CHAKRABORTY LAHIRI',
    qualification: 'Post Graduation Diploma in Computer Application',
    experience: [
      '16+ years of teaching experience.',
    ],
    imageScale: 1.02,
    imagePosition: 'center 38%',
  }),
  
 
  buildTeacher({
    fileName: 'SHINJENE BISWAS.jpeg',
    name: 'SHINJINEE BISWAS',
    qualification: 'BCA (Pursuing)',
    experience:
      "4 years of private tuition experience and 1 year of teaching experience at Subho's Computer Institute.",
  }),
  buildTeacher({
    fileName: 'ISHITA_SAHA.jpeg',
    name: 'ISHITA SAHA',
    qualification: 'BBA (Pursuing)',
    experience:
      "1 year of private tuition experience and teaching experience at Subho's Computer Institute.",
  }),
  buildTeacher({
    fileName: 'APARUP_GHOSH.jpeg',
    name: 'APARUP GHOSH',
    qualification: 'B.A. LL.B. (Hons) (Pursuing)',
    experience:
      "2 years of private tutoring experience and 1 year of teaching experience at Subho's Computer Institute.",
    imageScale: 1.18,
    imagePosition: 'center 34%',
  }),
];

const seniorTeachers = [
   buildTeacher({
    fileName: 'Syed Wasif Islam.jpeg',
    name: 'SYED WASIF ISLAM',
    qualification: 'B.A (ENGLISH HONOURS) , M.A (JOURNALISM AND MASS COMMUNICATION) , PGDCA (Pursuing)',
    experience: "7 years of teaching experience at Subho's Computer Institute. AND currrently teaching at ASSEMBLY OF ANGELS SECONDARY SCHOOL , BARRACKPORE .",
  }),
  buildTeacher({
    fileName: 'ABHIRUP_MUKHERJEE.jpeg',
    name: 'ABHIRUP MUKHERJEE',
    qualification: 'B.Sc. in I.T. Cyber Security Honours (Pursuing)',
    experience: "6 years of teaching experience at Subho's Computer Institute.",
  }),
  buildTeacher({
    fileName: 'MANOJIT_DAS.JPEG',
    name: 'MANOJIT DAS',
    qualification: 'BBA Marketing (Pursuing)',
    experience: "5 years of teaching experience at Subho's Computer Institute.",
    imageTranslateY: '8px',
    imagePosition: 'center 36%',
  }),
  buildTeacher({
    fileName: 'Sounavo_Chatterjee.jpeg',
    name: 'SOUNAVA CHATTERJEE',
    qualification: 'B.Tech IT (Pursuing)',
    experience: "5 years of teaching experience at Subho's Computer Institute.",
    imageTranslateY: '8px',
    imagePosition: 'center 34%',
  }),
  buildTeacher({
    fileName: 'AVASH_BANERJEE.jpeg',
    name: 'AVASH BANERJEE',
    qualification: 'B.Tech CSE (Pursuing)',
    experience: "5 years of teaching experience at Subho's Computer Institute.",
    imageTranslateY: '8px',
    imagePosition: 'center 35%',
  }),
  
  
  
  buildTeacher({
    fileName: 'SREE_CHAKRABORTY.jpeg',
    name: 'SREE CHAKRABORTY',
    qualification: 'B.Tech CSE (Pursuing)',
    experience: "2 years of teaching experience at Subho's Computer Institute.",
  }),
  buildTeacher({
    fileName: 'Rupam_Sadhukhan.jpeg',
    name: 'RUPAM SADHUKHAN',
    qualification: 'B.Tech CSE (Pursuing)',
    experience: "3 years of teaching experience at Subho's Computer Institute.",
    imageScale: 1.16,
    imageTranslateY: '8px',
    imagePosition: 'center 34%',
  }),
  buildTeacher({
    fileName: 'SOUMYAJIT_DAS.jpeg',
    name: 'SOUMYAJIT DAS',
    qualification: 'B.Tech CSE (Pursuing)',
    experience: "1 year of teaching experience at Subho's Computer Institute.",
  }),
  buildTeacher({
    fileName: 'Arkajit_Saha.jpeg',
    name: 'ARKAJIT SAHA',
    qualification: 'B.Tech CSE (Pursuing)',
    experience: "1 years of teaching experience at Subho's Computer Institute.",
  }),
  buildTeacher({
    fileName: 'Sankarshan_Chakraborty 2.jpeg',
    name: 'SANKARSHAN CHAKRABORTY',
    qualification: 'BMS (Pursuing)',
    experience: "1 years of teaching experience at Subho's Computer Institute.",
  }),
  
  
  
   
];

const FacultyCard = ({ teacher, hasImageError, onImageError }) => {
  const initials = useMemo(
    () =>
      teacher.name
        .split(' ')
        .filter(Boolean)
        .slice(0, 2)
        .map((part) => part[0])
        .join(''),
    [teacher.name]
  );

  return (
    <ScrollReveal as="article" className="faculty-profile-card faculty-card smooth-card hover-lift">
      <div className="faculty-photo-frame">
        {hasImageError ? (
          <div className="faculty-photo-fallback" aria-label={`${teacher.name} photo unavailable`}>
            <span>{initials}</span>
          </div>
        ) : (
          <ImageWithSkeleton
            src={teacher.image}
            alt={teacher.name}
            className="faculty-photo"
            loading="lazy"
            onError={onImageError}
            wrapperClassName="faculty-photo-shell"
            skeletonClassName="faculty-photo-skeleton"
            style={{
              objectFit: teacher.imageFit,
              objectPosition: teacher.imagePosition,
              transform: `translateY(${teacher.imageTranslateY}) scale(${teacher.imageScale})`,
            }}
          />
        )}
      </div>

      <div className="faculty-card-content">
        <h3>{teacher.name}</h3>
        <p className="faculty-detail">
          <span>Qualification</span>
          {teacher.qualification}
        </p>
        <div className="faculty-detail">
          <span>Experience</span>
          {Array.isArray(teacher.experience) ? (
            <ul className="faculty-detail-list">
              {teacher.experience.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          ) : (
            <p>{teacher.experience}</p>
          )}
        </div>
      </div>
    </ScrollReveal>
  );
};

const FacultySection = ({ id, label, title, description, teachers, brokenImages, onImageError }) => (
  <ScrollReveal
    as="section"
    id={id}
    className={`faculty-section faculty-group smooth-card ${
      id === 'teaching-faculty' ? 'teaching-faculty-section junior-faculty-section' : 'senior-faculty-section'
    }`}
    delay={80}
  >
    <div className="faculty-section-header">
      <span className="faculty-section-pill">{label}</span>
      <h2>{title}</h2>
      <p>{description}</p>
    </div>

    <div className="faculty-grid">
      {teachers.map((teacher, index) => (
        <FacultyCard
          key={`${teacher.name}-${teacher.image}-${index}`}
          teacher={teacher}
          hasImageError={Boolean(brokenImages[teacher.name])}
          onImageError={() => onImageError(teacher.name)}
        />
      ))}
    </div>
  </ScrollReveal>
);

const Faculties = () => {
  const location = useLocation();
  const [brokenImages, setBrokenImages] = useState({});

  useEffect(() => {
    if (typeof window === 'undefined') return;
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
  }, [location.pathname]);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const section = params.get('section');

    if (!section) return;

    const timeoutId = window.setTimeout(() => {
      const target = document.getElementById(section);

      if (!target) return;

      const isMobile = window.matchMedia('(max-width: 768px)').matches;
      const headerOffset = isMobile ? 180 : 152;

      window.requestAnimationFrame(() => {
        window.requestAnimationFrame(() => {
          const targetTop = Math.max(
            target.getBoundingClientRect().top + window.scrollY - headerOffset,
            0
          );

          window.scrollTo({
            top: targetTop,
            left: 0,
            behavior: isMobile ? 'auto' : 'smooth',
          });
        });
      });
    }, 120);

    return () => window.clearTimeout(timeoutId);
  }, [location.search]);

  const handleImageError = (name) => {
    setBrokenImages((current) => {
      if (current[name]) return current;
      return { ...current, [name]: true };
    });
  };

  return (
    <>
      <PageSeo
        title="Teaching Faculty | Subho's Computer Institute Barrackpore & Shyamnagar"
        description="Meet the teaching faculty of Subho's Computer Institute in Barrackpore and Shyamnagar and explore the educators guiding junior and senior students with focused computer education."
        path="/faculties"
        keywords={[
          'computer institute in Barrackpore',
          'computer institute in Shyamnagar',
          'computer teachers Barrackpore',
          'ICSE computer tuition Barrackpore',
          'ISC computer science tuition Barrackpore',
          'CBSE computer coaching Barrackpore',
          'computer coaching in Shyamnagar',
        ]}
      />

  <main className="faculties-page">
        <ScrollReveal as="section" className="faculties-hero">
          <p className="page-eyebrow">Our Team</p>
          <h1>Faculties</h1>
          <p className="page-intro">
            Learn with experienced teachers who combine subject expertise, personal guidance, and
            student-focused mentoring to help every learner build strong confidence in computer
            studies at our Barrackpore and Shyamnagar campuses.
          </p>
        </ScrollReveal>

        <FacultySection
          id="teaching-faculty"
          label="Teaching Faculty"
          title="Junior Class Teacher (3-7)"
          description="Dedicated teachers supporting younger learners with clear explanations, steady practice, and confidence-building classroom guidance."
          teachers={juniorTeachers}
          brokenImages={brokenImages}
          onImageError={handleImageError}
        />

        <FacultySection
          id="senior-class-teacher"
          label="Teaching Faculty"
          title="Senior Class Teacher (8-12)"
          description="Focused academic mentors helping senior students prepare for school exams, board expectations, and deeper computer science understanding."
          teachers={seniorTeachers}
          brokenImages={brokenImages}
          onImageError={handleImageError}
        />
      </main>
    </>
  );
};

export default Faculties;
