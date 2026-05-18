import React from 'react';
import { Link } from 'react-router-dom';
import FreeStudyMaterials from '../../components/freeStudyMaterials/FreeStudyMaterials.jsx';
import PageSeo from '../../components/seo/PageSeo.jsx';
import ScrollReveal from '../../components/scrollReveal/ScrollReveal.jsx';
import './freeStudyMaterialsPage.css';

const FreeStudyMaterialsPage = () => {
  return (
    <>
      <PageSeo
        title="Free Study Materials | Subho’s Computer Institute"
        description="Access free computer study materials, ICSE revision notes, online MCQs, question papers, Java practice sets, and exam-focused resources from Subho’s Computer Institute."
        path="/free-study-materials"
        keywords={[
          'free study materials',
          'ICSE computer study materials',
          'computer revision notes',
          'Java practice sets',
          'online MCQ computer',
          'computer question papers',
          'exam-focused computer resources',
          'Subho’s Computer Institute study materials',
          'computer materials for ICSE students',
          'computer coaching in Barrackpore',
        ]}
      />

      <main className="free-study-materials-page">
        <ScrollReveal as="section" className="free-study-materials-page-hero">
          <p className="page-eyebrow">LEARNING RESOURCES</p>
          <h1>Free Study Materials</h1>
          <p className="page-intro">
            Access curated study resources, online MCQs, chapterwise notes, and ICSE question
            papers prepared for focused exam revision.
          </p>
          <div className="free-study-materials-page-links">
            <Link to="/programs">Explore computer programs</Link>
            <Link to="/contact">Contact for admission</Link>
          </div>
        </ScrollReveal>

        <FreeStudyMaterials showHeader={false} />
      </main>
    </>
  );
};

export default FreeStudyMaterialsPage;
