import React from 'react';
import Programs from '../../components/programs/programs.jsx';
import PageSeo from '../../components/seo/PageSeo.jsx';
import ScrollReveal from '../../components/scrollReveal/ScrollReveal.jsx';
import Title from '../../components/title/title.jsx';
import './programsPage.css';

const ProgramsPage = () => {
  return (
    <>
      <PageSeo
        title="Computer Courses & Coaching in Barrackpore | ICSE, ISC, CBSE, Java & Python"
        description="Explore computer coaching and programming courses at Subho's Computer Institute, including ICSE, ISC, CBSE, Java, Python, HTML, CSS and practical IT training in Barrackpore, near Shyamnagar, Sodepur, Sodepore and Kolkata."
        path="/programs"
        keywords={[
          'computer institute in Barrackpore',
          'computer classes in Barrackpore',
          'ICSE computer tuition Barrackpore',
          'ISC computer science tuition Barrackpore',
          'CBSE computer coaching Barrackpore',
          'programming classes in Barrackpore',
          'Java programming classes in Barrackpore',
          'Python programming classes in Barrackpore',
          'HTML CSS course in Barrackpore',
          'computer coaching near Sodepur',
          'programming classes near Sodepur',
          'Java programming classes near Sodepur',
          'Python programming classes near Sodepur',
          'HTML CSS course near Sodepur',
          'computer classes near Sodepore',
          'practical IT training Barrackpore',
        ]}
      />

      <main className="programs-page">
        <h1 className="seo-page-heading">Computer Courses and Coaching in Barrackpore</h1>
        <ScrollReveal as="section" className="programs-page-section">
          <Title subtitle="our program" title="what we offer" />
          <Programs syncWithUrl={true} />
        </ScrollReveal>
      </main>
    </>
  );
};

export default ProgramsPage;
