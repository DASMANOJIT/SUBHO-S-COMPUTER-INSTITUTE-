import React from 'react';
import Programs from '../../components/programs/programs.jsx';
import PageSeo from '../../components/seo/PageSeo.jsx';
import Title from '../../components/title/title.jsx';
import './programsPage.css';

const ProgramsPage = () => {
  return (
    <>
      <PageSeo
        title="Computer Courses & Coaching in Barrackpore | ICSE, ISC, CBSE, C & Python"
        description="Explore computer coaching and programming courses at Subho's Computer Institute, including ICSE, ISC, CBSE, C programming, Python and practical IT training."
        path="/programs"
        keywords={[
          'computer institute in Barrackpore',
          'computer classes in Barrackpore',
          'ICSE computer tuition Barrackpore',
          'ISC computer science tuition Barrackpore',
          'CBSE computer coaching Barrackpore',
          'programming classes in Barrackpore',
          'C programming course Barrackpore',
          'Python course Barrackpore',
          'practical IT training Barrackpore',
        ]}
      />

      <main className="programs-page">
        <h1 className="seo-page-heading">Computer Courses and Coaching in Barrackpore</h1>
        <Title subtitle="our program" title="what we offer" />
        <Programs syncWithUrl={true} />
      </main>
    </>
  );
};

export default ProgramsPage;
