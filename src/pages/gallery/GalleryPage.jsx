import React from 'react';
import Campus from '../../components/campus/campus.jsx';
import PageSeo from '../../components/seo/PageSeo.jsx';
import Title from '../../components/title/title.jsx';
import './galleryPage.css';

const GalleryPage = () => {
  return (
    <>
      <PageSeo
        title="Gallery | Subho's Computer Institute Barrackpore"
        description="View photos and memories from Subho's Computer Institute, a trusted computer coaching centre in Barrackpore for students from Barrackpore, Shyamnagar, Sodepur, Kolkata and nearby areas."
        path="/gallery"
        keywords={[
          'Subho’s Computer Institute gallery',
          'computer institute in Barrackpore',
          'computer classes near Sodepur',
          'computer coaching near Sodepur',
          'computer tuition near Sodepore',
          'computer classes near Kolkata',
        ]}
      />

      <main className="gallery-page">
        <section className="gallery-page-hero">
          <p className="page-eyebrow">Campus</p>
          <h1>Gallery</h1>
          <p className="page-intro">
            Explore classroom moments, practical learning sessions, and campus memories from
            Subho&apos;s Computer Institute in Barrackpore, serving students from Shyamnagar,
            Sodepur, Sodepore, Kolkata, and nearby areas.
          </p>
        </section>

        <section className="gallery-page-content">
          <Title subtitle="gallery" title="Campus Photos" />
          <Campus />
        </section>
      </main>
    </>
  );
};

export default GalleryPage;
