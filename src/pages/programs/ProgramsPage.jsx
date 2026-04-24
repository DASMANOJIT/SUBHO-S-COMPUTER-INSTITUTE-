import React from 'react';
import { Helmet } from 'react-helmet-async';
import Programs from '../../components/programs/programs.jsx';
import Title from '../../components/title/title.jsx';
import './programsPage.css';

const ProgramsPage = () => {
  return (
    <>
      <Helmet>
        <title>Programs | Subho's Computer Institute Kolkata</title>
        <meta
          name="description"
          content="Explore programs at Subho's Computer Institute in Kolkata for ICSE, ISC, CBSE, and computer courses including Python."
        />
        <meta
          name="keywords"
          content="Subho's Computer Institute programs, ICSE ISC CBSE computer coaching, python course Kolkata, computer courses Barrackpore"
        />
      </Helmet>

      <main className="programs-page">
        <Title subtitle="our program" title="what we offer" />
        <Programs syncWithUrl={true} />
      </main>
    </>
  );
};

export default ProgramsPage;
