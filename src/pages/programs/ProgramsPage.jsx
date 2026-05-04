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
        title="Computer Coaching Programs | ICSE, ISC, CBSE, Java & Python Classes"
        description="Explore ICSE Computer Applications, ISC Computer Science, CBSE computer coaching, Java, Python, HTML, CSS and programming classes at Subho's Computer Institute."
        path="/programs"
        keywords={[
          'best computer institute in Barrackpore',
          'computer institute in Barrackpore',
          'computer institute in Shyamnagar',
          'computer classes in Barrackpore',
          'computer classes in Shyamnagar',
          'ICSE computer tuition Barrackpore',
          'ICSE computer coaching in Shyamnagar',
          'ISC computer science tuition Barrackpore',
          'ISC computer science coaching in Shyamnagar',
          'CBSE computer coaching Barrackpore',
          'CBSE computer coaching in Shyamnagar',
          'programming classes in Barrackpore',
          'programming classes in Shyamnagar',
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
          'computer coaching near me',
        ]}
      />

      <main className="programs-page">
        <h1 className="seo-page-heading">Computer Courses and Coaching in Barrackpore & Shyamnagar</h1>
        <ScrollReveal as="section" className="programs-page-section">
          <Title subtitle="our program" title="what we offer" />
          <Programs syncWithUrl={true} />
        </ScrollReveal>
      </main>
    </>
  );
};

export default ProgramsPage;
