import React, { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import SitePreloader from './components/SitePreloader.jsx';
import ScrollToTop from './components/ScrollToTop.jsx';
import ContactTopBar from './components/navbar/ContactTopBar.jsx';
import Navbar from './components/navbar/navbar.jsx';
import Hero from './components/hero/hero.jsx';
import AcademicExcellence from './components/academicExcellence/AcademicExcellence.jsx';
import Testimonials from './components/testimonials/Testimonials.jsx';
import PastResults from './components/results/PastResults.jsx';
import ResultsExperience from './components/results/ResultsExperience.jsx';
import Title from './components/title/title.jsx';
import Contact from './components/contact/contact.jsx';
import Footer from './components/footer/footer.jsx';
import AppDownloadFloat from './components/appDownloadFloat/AppDownloadFloat.jsx';
import EnquiryModal from './components/enquiryModal/EnquiryModal.jsx';
import WhatsAppFloat from './components/whatsappFloat/WhatsAppFloat.jsx';
import HomeSeoSection, { homepageFaqs } from './components/homeSeo/HomeSeoSection.jsx';
import PageSeo from './components/seo/PageSeo.jsx';
import { SITE_URL, createFaqSchema, createOrganizationSchema } from './lib/seo.js';
import AboutFocusPage from './pages/about/AboutFocusPage.jsx';
import AboutInstitutePage from './pages/about/AboutInstitutePage.jsx';
import Administration from './pages/administration/Administration.jsx';
import Careers from './pages/careers/Careers.jsx';
import ContactPage from './pages/contact/ContactPage.jsx';
import EventsPage from './pages/events/EventsPage.jsx';
import Faculties from './pages/faculties/Faculties.jsx';
import FacilitiesPage from './pages/facilities/FacilitiesPage.jsx';
import GalleryPage from './pages/gallery/GalleryPage.jsx';
import PrivacyPolicy from './pages/privacy/PrivacyPolicy.jsx';
import FreeStudyMaterialsPage from './pages/freeStudyMaterials/FreeStudyMaterialsPage.jsx';
import BookOrderPage from './pages/bookOrder/BookOrderPage.jsx';
import ProgramDetailPage from './pages/programs/ProgramDetailPage.jsx';
import ProgramsPage from './pages/programs/ProgramsPage.jsx';

const RoutePageShell = ({ children }) => <div className="route-page-shell">{children}</div>;

const homeSchema = [createOrganizationSchema(), createFaqSchema(homepageFaqs)];

const HomePage = () => {
  return (
    <>
      <PageSeo
        title="Subho’s Computer Institute | Best Computer Coaching in Barrackpore & Shyamnagar"
        description="Subho's Computer Institute is a trusted choice for students searching for the best computer institute in Barrackpore and computer coaching in Barrackpore and Shyamnagar. We offer ICSE, ISC and CBSE computer coaching, programming classes, Java, Python, HTML, CSS and practical IT training."
        path="/"
        keywords={[
          'best computer institute in Barrackpore',
          'computer coaching in Barrackpore',
          'computer institute in Barrackpore',
          'computer institute in Shyamnagar',
          'computer training institute in Barrackpore',
          'computer classes in Barrackpore',
          'computer classes in Shyamnagar',
          'computer coaching in Shyamnagar',
          'computer science tuition in Barrackpore',
          'ICSE computer tuition Barrackpore',
          'ICSE computer coaching in Shyamnagar',
          'ISC computer science tuition Barrackpore',
          'CBSE computer coaching Barrackpore',
          'programming classes in Barrackpore',
          'programming classes in Shyamnagar',
          'Java programming classes in Barrackpore',
          'Python programming classes in Barrackpore',
          'HTML CSS course in Barrackpore',
          'practical IT training Barrackpore',
          'computer coaching near me',
          'computer classes near me',
          'computer institute near Shyamnagar',
          'computer tuition near Shyamnagar',
          'computer institute near Sodepur',
          'computer classes near Sodepur',
          'computer coaching near Sodepur',
          'ICSE computer tuition near Sodepur',
          'ISC computer science coaching near Sodepur',
          'CBSE computer coaching near Sodepur',
          'programming classes near Sodepur',
          'Java programming classes near Sodepur',
          'Python programming classes near Sodepur',
          'HTML CSS course near Sodepur',
          'computer tuition near Sodepore',
          'computer classes near Sodepore',
          'computer classes near Kolkata',
          'best computer teacher in Barrackpore',
        ]}
        schema={homeSchema}
      />

      <div className="home-page">
        <div className="home-section home-section--hero">
          <section id="hero">
            <Hero />
          </section>
        </div>

        <div className="home-section home-section--academic">
          <AcademicExcellence />
        </div>

        <div className="home-section home-section--testimonials">
          <Testimonials />
        </div>

        <div className="home-section home-section--results">
          <PastResults />
        </div>

        <div className="home-section home-section--results-experience">
          <ResultsExperience />
        </div>

        <div className="home-section home-section--seo">
          <HomeSeoSection />
        </div>

        <div className="home-section home-section--contact">
          <section id="contact">
            <Title subtitle="Contact us" title="Campus Get In Touch" />
            <Contact />
          </section>
        </div>
      </div>
    </>
  );
};

const App = () => {
  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (window.location.hostname.endsWith('vercel.app')) {
      window.location.replace(
        `${SITE_URL}${window.location.pathname}${window.location.search}${window.location.hash}`
      );
    }
  }, []);

  return (
    <>
      <SitePreloader />
      <ScrollToTop />
      <ContactTopBar />
      <Navbar />

      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route
            path="/about/about-the-institute"
            element={
              <RoutePageShell>
                <AboutInstitutePage />
              </RoutePageShell>
            }
          />
          <Route
            path="/about/mission"
            element={
              <RoutePageShell>
                <AboutFocusPage
                  title="Our Mission"
                  description="Understand the mission of Subho's Computer Institute in Barrackpore and Shyamnagar to deliver disciplined computer coaching, practical skill development, and student-first guidance."
                  path="/about/mission"
                  intro="Our mission is to provide structured computer education in Barrackpore and Shyamnagar that helps students develop academic clarity, practical confidence, and long-term learning discipline."
                  ctaText="Mission Highlights"
                  points={[
                    'Build strong foundations in school computer subjects for ICSE, ISC, and CBSE students.',
                    'Support students with doubt-clearing, weekly tests, and practical IT training.',
                    'Create a disciplined environment where learning stays personal, ethical, and consistent.',
                  ]}
                />
              </RoutePageShell>
            }
          />
          <Route
            path="/about/vision"
            element={
              <RoutePageShell>
                <AboutFocusPage
                  title="Our Vision"
                  description="Explore the vision of Subho's Computer Institute to remain a trusted computer institute in Barrackpore and Shyamnagar for school students, programming learners, and future technology achievers."
                  path="/about/vision"
                  intro="Our vision is to remain a trusted computer institute in Barrackpore and Shyamnagar where students from Barrackpore, Shyamnagar, Kolkata, and nearby areas can prepare confidently for academics and future technology opportunities."
                  ctaText="Vision Priorities"
                  points={[
                    'Strengthen student confidence in computer application, computer science, and programming.',
                    'Combine concept clarity with practical learning and weekly performance tracking.',
                    'Help more learners access quality computer coaching near Barrackpore and North 24 Parganas.',
                  ]}
                />
              </RoutePageShell>
            }
          />
          <Route
            path="/about/achievements"
            element={
              <RoutePageShell>
                <AboutFocusPage
                  title="Our Achievements"
                  description="See how Subho's Computer Institute has supported thousands of students through trusted computer coaching, practical training, and academic mentoring in Barrackpore and Shyamnagar."
                  path="/about/achievements"
                  intro="Since 2004, Subho's Computer Institute has built a strong reputation for disciplined teaching, practical training, and long-term student support in Barrackpore and Shyamnagar."
                  ctaText="Academic Milestones"
                  points={[
                    'Guided thousands of students through school-level computer coaching and practical preparation.',
                    'Built a trusted reputation for ICSE computer tuition, ISC computer science coaching, and CBSE computer classes.',
                    'Maintained a student-first approach with consistent mentoring, doubt support, and weekly tests.',
                  ]}
                />
              </RoutePageShell>
            }
          />
          <Route
            path="/programs"
            element={
              <RoutePageShell>
                <ProgramsPage />
              </RoutePageShell>
            }
          />
          <Route
            path="/free-study-materials"
            element={
              <RoutePageShell>
                <FreeStudyMaterialsPage />
              </RoutePageShell>
            }
          />
          <Route
            path="/book-order"
            element={
              <RoutePageShell>
                <BookOrderPage />
              </RoutePageShell>
            }
          />
          <Route
            path="/programs/icse-computer"
            element={
              <RoutePageShell>
                <ProgramDetailPage
                  seoTitle="ICSE Computer Coaching in Barrackpore"
                  seoDescription="Join ICSE computer tuition in Barrackpore at Subho's Computer Institute for Class 4 to 10 students who need concept clarity, practical guidance, and exam preparation."
                  path="/programs/icse-computer"
                  h1="ICSE Computer Coaching in Barrackpore for Class 4 to 10 Students"
                  intro="Our ICSE computer coaching in Barrackpore helps school students build strong computer application fundamentals through structured lessons, practice work, doubt-clearing, and regular tests."
                  audience="This program is ideal for Class 4 to 10 students who need computer application tuition, better concept clarity, and exam-ready preparation in Barrackpore, Shyamnagar, and nearby areas."
                  topics={[
                    'Computer fundamentals and school syllabus support',
                    'Practical application concepts and step-by-step exercises',
                    'Revision, doubt-clearing, and exam-focused weekly tests',
                  ]}
                  benefits={[
                    'Build a strong academic base in computer application tuition ICSE',
                    'Improve confidence with regular practice and guided feedback',
                    'Learn in a disciplined environment close to Barrackpore and Shyamnagar',
                  ]}
                  relatedLinks={[
                    { to: '/programs/isc-computer-science', label: 'Explore ISC computer science coaching' },
                    { to: '/programs/programming', label: 'View programming classes in Barrackpore' },
                  ]}
                />
              </RoutePageShell>
            }
          />
          <Route
            path="/programs/isc-computer-science"
            element={
              <RoutePageShell>
                <ProgramDetailPage
                  seoTitle="ISC Computer Science Tuition in Barrackpore"
                  seoDescription="Get ISC computer science tuition in Barrackpore for Class 11 and 12 with concept-focused lessons, practical training, and exam preparation at Subho's Computer Institute."
                  path="/programs/isc-computer-science"
                  h1="ISC Computer Science Tuition in Barrackpore for Class 11 and 12"
                  intro="Our ISC computer science coaching helps higher-secondary students prepare for concepts, practical work, and board-style problem solving with clear guidance and regular assessment."
                  audience="This course is suited for Class 11 and 12 ISC students who need board-focused computer science coaching in Barrackpore, Shyamnagar, Kolkata, and nearby areas."
                  topics={[
                    'Computer science theory and syllabus support',
                    'Practical lab preparation and logic building',
                    'Revision strategy, test preparation, and doubt-clearing sessions',
                  ]}
                  benefits={[
                    'Improve conceptual understanding for board exams',
                    'Strengthen practical performance and programming confidence',
                    'Learn with guidance from a trusted computer science tutor near Barrackpore',
                  ]}
                  relatedLinks={[
                    { to: '/programs/cbse-computer', label: 'See CBSE computer coaching' },
                    { to: '/contact', label: 'Ask about admissions and batches' },
                  ]}
                />
              </RoutePageShell>
            }
          />
          <Route
            path="/programs/cbse-computer"
            element={
              <RoutePageShell>
                <ProgramDetailPage
                  seoTitle="CBSE Computer Coaching in Barrackpore"
                  seoDescription="Enroll in CBSE computer coaching in Barrackpore for Class 11 and 12 students who want structured syllabus support, practical work, and exam-focused guidance."
                  path="/programs/cbse-computer"
                  h1="CBSE Computer Coaching in Barrackpore for Class 11 and 12"
                  intro="Our CBSE computer coaching supports students with syllabus coverage, practical preparation, and concept clarity so they can approach exams with more confidence."
                  audience="This course is designed for Class 11 and 12 students seeking CBSE computer coaching in Barrackpore, Shyamnagar, Kolkata, and nearby North 24 Parganas areas."
                  topics={[
                    'CBSE syllabus support and chapter-wise coverage',
                    'Computer science fundamentals and problem solving',
                    'Practical preparation, revision support, and tests',
                  ]}
                  benefits={[
                    'Gain confidence for board assessments and internal practicals',
                    'Learn through guided explanations, practice, and corrections',
                    'Stay connected to a student-first computer coaching environment in Barrackpore',
                  ]}
                  relatedLinks={[
                    { to: '/programs/icse-computer', label: 'View ICSE computer coaching' },
                    { to: '/programs/programming', label: 'Explore Java and Python classes' },
                  ]}
                />
              </RoutePageShell>
            }
          />
          <Route
            path="/programs/programming"
            element={
              <RoutePageShell>
                <ProgramDetailPage
                  seoTitle="Programming Classes in Barrackpore | Java, Python, HTML & CSS"
                  seoDescription="Explore programming classes in Barrackpore with Java, Python, HTML, CSS and practical IT training at Subho's Computer Institute."
                  path="/programs/programming"
                  h1="Programming Classes in Barrackpore for Java, Python, HTML, CSS & Practical IT Skills"
                  intro="Our programming classes in Barrackpore help students build logic, coding confidence, and practical IT understanding through guided exercises in Java, Python, HTML, CSS, and core computer skills."
                  audience="This course is ideal for students who want to begin programming, strengthen computer application skills, or build practical IT confidence alongside school academics."
                  topics={[
                    'Java programming fundamentals and logic building',
                    'Python basics, syntax, and problem solving',
                    'HTML and CSS for clean web page structure and styling',
                    'Practical IT training, exercises, and concept application',
                  ]}
                  benefits={[
                    'Develop confidence in coding and structured problem solving',
                    'Learn practical skills that support both academics and future study goals',
                    'Access programming classes near Barrackpore and Shyamnagar with guided mentorship',
                  ]}
                  relatedLinks={[
                    { to: '/programs/icse-computer', label: 'See ICSE computer tuition' },
                    { to: '/programs/isc-computer-science', label: 'See ISC computer science coaching' },
                  ]}
                />
              </RoutePageShell>
            }
          />
          <Route
            path="/gallery"
            element={
              <RoutePageShell>
                <GalleryPage />
              </RoutePageShell>
            }
          />
          <Route
            path="/events"
            element={
              <RoutePageShell>
                <EventsPage />
              </RoutePageShell>
            }
          />
          <Route
            path="/facilities"
            element={
              <RoutePageShell>
                <FacilitiesPage />
              </RoutePageShell>
            }
          />
          <Route
            path="/privacy-policy"
            element={
              <RoutePageShell>
                <PrivacyPolicy />
              </RoutePageShell>
            }
          />
          <Route
            path="/faculties"
            element={
              <RoutePageShell>
                <Faculties />
              </RoutePageShell>
            }
          />
          <Route
            path="/faculties/administration"
            element={
              <RoutePageShell>
                <Administration />
              </RoutePageShell>
            }
          />
          <Route
            path="/contact"
            element={
              <RoutePageShell>
                <ContactPage />
              </RoutePageShell>
            }
          />
          <Route
            path="/careers"
            element={
              <RoutePageShell>
                <Careers />
              </RoutePageShell>
            }
          />
        </Routes>
      </main>

      <Footer />
      <EnquiryModal />
      <WhatsAppFloat />
      <AppDownloadFloat />
    </>
  );
};

export default App;
