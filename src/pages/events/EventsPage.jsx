import React, { useMemo, useState } from 'react';
import PageSeo from '../../components/seo/PageSeo.jsx';
import './eventsPage.css';

const buildEventItems = ({ baseItems, previewImages, fallbackTitle, extraDescription }) => {
  const itemsWithImages = baseItems.map((item, index) => ({
    ...item,
    previewImage: previewImages[index] || '',
  }));

  const extraItems = previewImages.slice(baseItems.length).map((previewImage, index) => ({
    type: 'post',
    title: fallbackTitle,
    description: extraDescription,
    url: baseItems[0]?.url || '',
    embedUrl: baseItems[0]?.embedUrl || '',
    previewImage,
  }));

  return [...itemsWithImages, ...extraItems];
};

const eventTabs = [
  {
    id: 'felicitation-25',
    label: "FELICITATION 25'",
    title: 'Felicitation 2025',
    description:
      "Highlights from Felicitation 2025, celebrating student achievement and academic excellence at Subho's Computer Institute.",
    items: buildEventItems({
      baseItems: [
        {
          url: 'https://www.facebook.com/share/p/17KrX7UBPT/',
          type: 'post',
          title: 'Felicitation 2025',
          embedUrl: 'https://www.facebook.com/share/p/17KrX7UBPT/',
          description: 'Student achievement moments from Felicitation 2025.',
        },
        {
          url: 'https://www.facebook.com/share/v/1EhMyUjPUZ/',
          type: 'video',
          title: 'Felicitation 2025',
          embedUrl: 'https://www.facebook.com/share/v/1EhMyUjPUZ/',
          description: 'Video highlights from Felicitation 2025.',
        },
        {
          url: 'https://www.facebook.com/share/v/1a4VaKxizm/',
          type: 'video',
          title: 'Felicitation 2025',
          embedUrl: 'https://www.facebook.com/share/v/1a4VaKxizm/',
          description: 'Celebration and award moments from Felicitation 2025.',
        },
        {
          url: 'https://www.facebook.com/share/p/1CrrBfxL45/',
          type: 'post',
          title: 'Felicitation 2025',
          embedUrl: 'https://www.facebook.com/share/p/1CrrBfxL45/',
          description: 'More photos from Felicitation 2025 at Subho’s Computer Institute.',
        },
      ],
      previewImages: [
        '/events/felicitation_1.jpg',
        '/events/felicitation_2.jpg',
        '/events/felicitation_3.jpg',
        '/events/felicitation_4.jpg',
        '/events/felicitation_5.jpg',
        '/events/felicitation_6.jpg',
        '/events/felicitation_7.jpg',
        '/events/felicitation_8.jpg',
      ],
      fallbackTitle: 'Felicitation 2025',
      extraDescription: 'More moments from Felicitation 2025 at Subho’s Computer Institute.',
    }),
  },
  {
    id: 'fiesta-24',
    label: "FIESTA 24'",
    title: 'Fiesta 2024',
    description:
      'Memories from Fiesta 2024, featuring special moments, student participation, and celebration.',
    items: buildEventItems({
      baseItems: [
        {
          url: 'https://www.facebook.com/share/p/17xzFtEy9R/',
          type: 'post',
          title: 'Fiesta 2024',
          embedUrl: 'https://www.facebook.com/share/p/17xzFtEy9R/',
          description: 'Event photos and student celebration moments from Fiesta 2024.',
        },
        {
          url: 'https://www.facebook.com/share/p/1CjzkUGKum/',
          type: 'post',
          title: 'Fiesta 2024',
          embedUrl: 'https://www.facebook.com/share/p/1CjzkUGKum/',
          description: 'More event memories from Fiesta 2024.',
        },
        {
          url: 'https://www.facebook.com/share/v/1979KC7vYj/',
          type: 'video',
          title: 'Fiesta 2024',
          embedUrl: 'https://www.facebook.com/share/v/1979KC7vYj/',
          description: 'Video moments from Fiesta 2024.',
        },
      ],
      previewImages: [
        '/events/fiesta_24_1.jpg',
        '/events/fiesta_24_2.jpg',
        '/events/fiesta_24_3.jpg',
        '/events/fiesta_24_4.jpg',
        '/events/fiesta_24_5.jpg',
        '/events/fiesta_24_6.jpg',
      ],
      fallbackTitle: 'Fiesta 2024',
      extraDescription: 'More moments from Fiesta 2024 at Subho’s Computer Institute.',
    }),
  },
  {
    id: 'fiesta-25',
    label: "FIESTA 25'",
    title: 'Fiesta 2025',
    description:
      'Memories from Fiesta 2025, showcasing celebration, performances, and student moments.',
    items: buildEventItems({
      baseItems: [
        {
          url: 'https://www.facebook.com/share/p/1CVcgzU4k1/',
          type: 'post',
          title: 'Fiesta 2025',
          embedUrl: 'https://www.facebook.com/share/p/1CVcgzU4k1/',
          description: 'Celebration highlights from Fiesta 2025.',
        },
        {
          url: 'https://www.facebook.com/share/v/1ZpRZB4Lan/',
          type: 'video',
          title: 'Fiesta 2025',
          embedUrl: 'https://www.facebook.com/share/v/1ZpRZB4Lan/',
          description: 'Performance and celebration video from Fiesta 2025.',
        },
        {
          url: 'https://www.facebook.com/share/v/1JL29Q4VTY/',
          type: 'video',
          title: 'Fiesta 2025',
          embedUrl: 'https://www.facebook.com/share/v/1JL29Q4VTY/',
          description: 'More Fiesta 2025 video moments.',
        },
      ],
      previewImages: [
        '/events/fiesta_25_1.jpg',
        '/events/fiesta_25_2.jpg',
        '/events/fiesta_25_3.jpg',
        '/events/fiesta_25_4.jpg',
        '/events/fiesta_25_5.jpg',
        '/events/fiesta_25_6.jpg',
      ],
      fallbackTitle: 'Fiesta 2025',
      extraDescription: 'More moments from Fiesta 2025 at Subho’s Computer Institute.',
    }),
  },
  {
    id: 'saraswati-puja',
    label: 'SARASWATI PUJA',
    title: 'Saraswati Puja',
    description: "Saraswati Puja celebration moments from Subho's Computer Institute.",
    items: buildEventItems({
      baseItems: [
        {
          url: 'https://www.facebook.com/share/p/1GiLVMaih7/',
          type: 'post',
          title: 'Saraswati Puja',
          embedUrl: 'https://www.facebook.com/share/p/1GiLVMaih7/',
          description: 'Saraswati Puja celebration moments from the institute.',
        },
      ],
      previewImages: ['/events/puja_1.jpg', '/events/puja_2.jpg'],
      fallbackTitle: 'Saraswati Puja',
      extraDescription: 'More Saraswati Puja moments from Subho’s Computer Institute.',
    }),
  },
  {
    id: 'teachers-day',
    label: "TEACHERS' DAY",
    title: "Teachers' Day",
    description: "Teachers' Day celebration and appreciation moments with students and faculty.",
    items: buildEventItems({
      baseItems: [
        {
          url: 'https://www.facebook.com/share/p/165C88KmAz/',
          type: 'post',
          title: "Teachers' Day",
          embedUrl: 'https://www.facebook.com/share/p/165C88KmAz/',
          description: "Teachers' Day appreciation moments with students and faculty.",
        },
        {
          url: 'https://www.facebook.com/share/p/17xgsWEtLs/',
          type: 'post',
          title: "Teachers' Day",
          embedUrl: 'https://www.facebook.com/share/p/17xgsWEtLs/',
          description: "Additional Teachers' Day celebration photos.",
        },
      ],
      previewImages: [
        '/events/teachers_day.jpg',
        '/events/teachers_day_2.jpg',
        '/events/teachers_day_3.jpg',
        '/events/teachers_day_4.jpg',
      ],
      fallbackTitle: "Teachers' Day",
      extraDescription: "More Teachers' Day celebration moments from Subho’s Computer Institute.",
    }),
  },
  {
    id: 'social-work',
    label: 'SOCIAL WORK',
    title: 'Social Work',
    description: "Social work activities and community-focused moments from Subho's Computer Institute.",
    items: buildEventItems({
      baseItems: [
        {
          url: 'https://www.facebook.com/share/p/18KFb2rofG/',
          type: 'post',
          title: 'Social Work',
          embedUrl: 'https://www.facebook.com/share/p/18KFb2rofG/',
          description: 'Community-focused social work activity photos.',
        },
        {
          url: 'https://www.facebook.com/share/v/1Cpch5Tawu/',
          type: 'video',
          title: 'Social Work',
          embedUrl: 'https://www.facebook.com/share/v/1Cpch5Tawu/',
          description: 'Video highlights from social work initiatives.',
        },
        {
          url: 'https://www.facebook.com/share/v/1CdUsuFP2p/',
          type: 'video',
          title: 'Social Work',
          embedUrl: 'https://www.facebook.com/share/v/1CdUsuFP2p/',
          description: 'Additional social work event video moments.',
        },
      ],
      previewImages: [
        '/events/social_work_1.jpg',
        '/events/social_work_2.jpg',
        '/events/social_work_3.jpg',
        '/events/social_work_4.jpg',
        '/events/social_work_5.jpg',
        '/events/social_work_6.jpg',
      ],
      fallbackTitle: 'Social Work',
      extraDescription: 'More community-focused moments from Social Work activities at the institute.',
    }),
  },
  {
    id: 'fiesta-23',
    label: "FIESTA 23'",
    title: 'Fiesta 2023',
    description: 'Memories from Fiesta 2023.',
    items: buildEventItems({
      baseItems: [
        {
          url: 'https://www.facebook.com/share/v/1F5aP12okA/',
          type: 'video',
          title: 'Fiesta 2023',
          embedUrl: 'https://www.facebook.com/share/v/1F5aP12okA/',
          description: 'Fiesta 2023 video memories from the institute.',
        },
      ],
      previewImages: ['/events/fiesta_23_1.jpg', '/events/fiesta_23_2.jpg'],
      fallbackTitle: 'Fiesta 2023',
      extraDescription: 'More moments from Fiesta 2023 at Subho’s Computer Institute.',
    }),
  },
];

const isEmbeddableFacebookUrl = (url = '') =>
  url.includes('facebook.com') &&
  !url.includes('/share/') &&
  (url.includes('/posts/') || url.includes('/videos/') || url.includes('/watch/'));

const getFacebookEmbedUrl = (item) => {
  const source = item.embedUrl || item.url;
  const encoded = encodeURIComponent(source);

  return item.type === 'video'
    ? `https://www.facebook.com/plugins/video.php?href=${encoded}&show_text=false&width=500`
    : `https://www.facebook.com/plugins/post.php?href=${encoded}&show_text=true&width=500`;
};

const FacebookPreviewCard = ({ item, eventTitle }) => {
  const itemLabel = item.type === 'video' ? 'Facebook Video' : 'Facebook Post';
  const canShowEmbed = isEmbeddableFacebookUrl(item.embedUrl || item.url);

  return (
    <article className="events-card events-card-preview">
      <div className="events-card-meta">
        <span className="events-card-badge">{itemLabel}</span>
      </div>

      {canShowEmbed ? (
        <div
          className={`events-preview-embed ${item.type === 'video' ? 'is-video' : 'is-post'}`}
        >
          <iframe
            src={getFacebookEmbedUrl(item)}
            title={`${item.title || eventTitle} ${itemLabel}`}
            loading="lazy"
            scrolling="no"
            allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
            allowFullScreen={item.type === 'video'}
          />
        </div>
      ) : item.previewImage ? (
        <div className="events-preview-image-wrap">
          <img
            src={item.previewImage}
            alt={`${item.title || eventTitle} - Subho's Computer Institute event preview`}
            className="events-preview-image"
          />
        </div>
      ) : (
        <div className="events-preview-placeholder">
          <span className="events-preview-placeholder-type">{itemLabel}</span>
          <strong>Subho&apos;s Computer Institute</strong>
          <p>Click to view on Facebook</p>
        </div>
      )}

      <h3>{item.title || eventTitle}</h3>
      <p className="events-card-description">
        {item.description ||
          'Preview this event update from Facebook. Click below to view the full photos or video.'}
      </p>

      <a href={item.url} target="_blank" rel="noopener noreferrer">
        View More on Facebook
      </a>
    </article>
  );
};

const EventsPage = () => {
  const [activeTab, setActiveTab] = useState(eventTabs[0].id);

  const activeEvent = useMemo(
    () => eventTabs.find((event) => event.id === activeTab) ?? eventTabs[0],
    [activeTab]
  );

  return (
    <>
      <PageSeo
        title="Events | Subho's Computer Institute Barrackpore"
        description="Explore events, student felicitation programs, alumni meets, workshops and academic activities at Subho's Computer Institute in Barrackpore, near Shyamnagar, Sodepur and Kolkata."
        path="/events"
        keywords={[
          'Subho’s Computer Institute events',
          'computer coaching in Barrackpore',
          'computer classes near Sodepur',
          'computer coaching near Sodepur',
          'programming classes near Sodepur',
          'computer classes near Sodepore',
        ]}
      />

      <main className="events-page">
        <section className="events-hero">
          <p className="page-eyebrow">Campus</p>
          <h1>Events</h1>
          <p className="page-intro">
            Explore important events, student felicitation programs, alumni meets, workshops, and
            special academic moments at Subho&apos;s Computer Institute.
          </p>
        </section>

        <section className="events-content">
          <div className="events-tablist" role="tablist" aria-label="Event categories">
            {eventTabs.map((event) => (
              <button
                key={event.id}
                type="button"
                className={`events-tab ${activeTab === event.id ? 'active' : ''}`}
                onClick={() => setActiveTab(event.id)}
                role="tab"
                aria-selected={activeTab === event.id}
              >
                {event.label}
              </button>
            ))}
          </div>

          <article className="events-preview-shell">
            <div className="events-preview-header">
              <h2>{activeEvent.title}</h2>
              <p>{activeEvent.description}</p>
            </div>

            {activeEvent.items.length ? (
              <div className="events-grid">
                {activeEvent.items.map((item, index) => (
                  <FacebookPreviewCard
                    key={`${activeEvent.id}-${item.url}-${item.previewImage || 'fallback'}-${index}`}
                    item={item}
                    eventTitle={activeEvent.title}
                  />
                ))}
              </div>
            ) : (
              <div className="events-empty-state">
                <p>Facebook event posts will be added soon.</p>
              </div>
            )}
          </article>
        </section>
      </main>
    </>
  );
};

export default EventsPage;
