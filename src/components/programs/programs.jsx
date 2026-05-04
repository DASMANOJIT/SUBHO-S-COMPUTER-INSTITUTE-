import React, { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import './programs.css';
import Program_1 from '../assets/program1.jpeg';
import Program_2 from '../assets/program2.jpeg';
import Program_3 from '../assets/program3.jpeg';
import Program_4 from '../assets/program_4.jpeg';
import Course_1 from '../assets/cisce.png';
import Course_2 from '../assets/cbsc.png';
import Course_4 from '../assets/python.png';
import ScrollReveal from '../scrollReveal/ScrollReveal.jsx';
import ImageWithSkeleton from '../skeletons/ImageWithSkeleton.jsx';

const categoryOptions = [
  { label: 'ICSE/ISC', value: 'icse-isc' },
  { label: 'CBSE', value: 'cbse' },
  { label: 'COMPUTER COURSES', value: 'computer-courses' },
];

const defaultCategory = 'icse-isc';

const programCards = [
  {
    id: 1,
    category: 'icse-isc',
    image: Program_1,
    badge: Course_1,
    title: 'CLASSES 4-10(ICSE)',
    imageAlt: "ICSE Classes 4 to 10 computer coaching in Barrackpore and Shyamnagar at Subho's Computer Institute",
    badgeAlt: "ICSE board computer coaching badge - Subho's Computer Institute",
  },
  {
    id: 2,
    category: 'icse-isc',
    image: Program_2,
    badge: Course_1,
    title: 'CLASS 11-12(ISC)',
    imageAlt: "ISC Class 11-12 computer science coaching in Barrackpore and Shyamnagar - Subho's Computer Institute",
    badgeAlt: 'ISC board computer science badge - Subho\'s Computer Institute',
  },
  {
    id: 3,
    category: 'cbse',
    image: Program_3,
    badge: Course_2,
    title: 'CLASS 11-12(CBSE)',
    imageAlt: "CBSE Class 11-12 computer coaching in Barrackpore and Shyamnagar at Subho's Computer Institute",
    badgeAlt: "CBSE board computer coaching badge - Subho's Computer Institute",
  },
  {
    id: 4,
    category: 'computer-courses',
    image: Program_4,
    badge: Course_4,
    title: 'PYTHON',
    imageAlt: "Python programming course in Barrackpore and Shyamnagar at Subho's Computer Institute",
    badgeAlt: "Python programming badge - Subho's Computer Institute",
  },
];

const getValidCategory = (category) => {
  const isValid = categoryOptions.some((option) => option.value === category);
  return isValid ? category : defaultCategory;
};

const Programs = ({ syncWithUrl = false }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedCategory, setSelectedCategory] = useState(() =>
    syncWithUrl ? getValidCategory(searchParams.get('category')) : defaultCategory
  );

  useEffect(() => {
    if (!syncWithUrl) return;
    setSelectedCategory(getValidCategory(searchParams.get('category')));
  }, [searchParams, syncWithUrl]);

  const visiblePrograms = useMemo(
    () => programCards.filter((program) => program.category === selectedCategory),
    [selectedCategory]
  );

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);

    if (!syncWithUrl) return;

    const nextSearchParams = new URLSearchParams(searchParams);
    nextSearchParams.set('category', category);
    setSearchParams(nextSearchParams, { replace: true });
  };

  return (
    <>
      <div className="programs-shell">
        <div className="program-tabs" role="tablist" aria-label="Program categories">
          {categoryOptions.map((category) => (
            <button
              key={category.value}
              type="button"
              className={`program-tab ${selectedCategory === category.value ? 'active' : ''}`}
              onClick={() => handleCategoryChange(category.value)}
              role="tab"
              aria-selected={selectedCategory === category.value}
            >
              {category.label}
            </button>
          ))}
        </div>

        <div className="programs">
          {visiblePrograms.map((program, index) => (
            <ScrollReveal
              as="div"
              className="program smooth-card hover-lift image-hover-zoom"
              key={program.id}
              delay={index * 90}
            >
              <ImageWithSkeleton
                src={program.image}
                alt={program.imageAlt}
                className="card"
                wrapperClassName="program-image-shell"
                skeletonClassName="program-image-skeleton"
              />
              <div className="caption">
                <img src={program.badge} alt={program.badgeAlt} />
                <p>{program.title}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </>
  );
};

export default Programs;
