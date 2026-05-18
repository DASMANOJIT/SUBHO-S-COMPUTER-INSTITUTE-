import React from 'react';
import ScrollReveal from '../scrollReveal/ScrollReveal.jsx';
import './freeStudyMaterials.css';

const studyMaterials = [
  {
    title: '25+ GForm Based Online MCQs',
    description:
      'Practice computer application concepts through online MCQ sets designed for quick revision and self-assessment.',
    buttonText: 'Open MCQs',
    link: 'https://drive.google.com/file/d/1SO95eQgJcTHUSYnBkvHx-u-CclNV4WuT/view?usp=drive_link',
    icon: '</>',
    gradient: 'linear-gradient(135deg, rgba(29, 78, 216, 0.18), rgba(59, 130, 246, 0.12), rgba(255, 255, 255, 0.94))',
  },
  {
    title: 'Chapterwise Notes for Class 9 & 10',
    description:
      'Access structured chapterwise notes for Class 9 and 10 Computer Applications to revise concepts, theory, and important definitions.',
    buttonText: 'View Notes',
    link: 'https://drive.google.com/drive/folders/1_vr6LdwkAEY4Z3O47hwv-CajU2fKOZYE?usp=sharing',
    icon: '{ }',
    gradient: 'linear-gradient(135deg, rgba(30, 64, 175, 0.18), rgba(147, 197, 253, 0.18), rgba(255, 255, 255, 0.96))',
  },
  {
    title: 'All Subjects Question Papers for Class 10 ICSE',
    description:
      'Access Class 10 ICSE question papers for all subjects to support complete board exam preparation.',
    buttonText: 'View Papers',
    link: 'https://drive.google.com/drive/folders/13oz0Xtv8MeWiDwpBfGyx3-HtpnTlPvkl?usp=drive_link',
    icon: '[ ]',
    gradient: 'linear-gradient(135deg, rgba(14, 165, 233, 0.16), rgba(29, 78, 216, 0.12), rgba(255, 255, 255, 0.95))',
  },
  {
    title: 'Previous Year Questions of Our Institute',
    description:
      'Explore previous year question collections from Subho’s Computer Institute for focused revision and exam practice.',
    buttonText: 'View Questions',
    link: 'https://drive.google.com/drive/folders/14Ogy3JrY_zu1DewRvPFaHc5wPkdb5yhP?usp=drive_link',
    icon: '< >',
    gradient: 'linear-gradient(135deg, rgba(37, 99, 235, 0.16), rgba(96, 165, 250, 0.14), rgba(255, 255, 255, 0.96))',
  },
];

const FreeStudyMaterials = ({ showHeader = true, className = '', sectionId = 'free-study-materials' }) => {
  const sectionLabelId = `${sectionId}-heading`;

  return (
    <ScrollReveal
      as="section"
      className={`free-study-materials-section ${className}`.trim()}
      animation="fade-up"
      aria-labelledby={showHeader ? sectionLabelId : undefined}
      aria-label={showHeader ? undefined : 'Free study materials'}
    >
      <div className="free-study-materials-shell">
        {showHeader && (
          <ScrollReveal
            as="div"
            className="free-study-materials-header smooth-card"
            animation="fade-up"
            duration={850}
          >
            <div className="free-study-materials-kicker-row" aria-hidden="true">
              <span className="free-study-materials-kicker">FREE STUDY MATERIALS</span>
              <span className="free-study-materials-terminal">
                <span className="free-study-materials-terminal-dot" />
                <span className="free-study-materials-terminal-dot" />
                <span className="free-study-materials-terminal-dot" />
                <span className="free-study-materials-terminal-label">
                  compiled for focused revision
                </span>
              </span>
            </div>

            <h2 id={sectionLabelId}>Free Study Materials</h2>
            <p className="free-study-materials-subtitle">
              Access curated computer education resources, practice sets, notes, and exam-focused
              materials designed for ICSE students.
            </p>
          </ScrollReveal>
        )}

        <div className="free-study-materials-grid" aria-label="Free study materials">
          {studyMaterials.map((item, index) => (
            <ScrollReveal
              as="article"
              key={item.title}
              className="free-study-materials-card smooth-card hover-lift"
              animation="fade-up"
              delay={index * 90}
              duration={800}
              style={{ '--study-gradient': item.gradient }}
            >
              <div className="free-study-materials-card-top">
                <span className="free-study-materials-icon" aria-hidden="true">
                  {item.icon}
                </span>
                <span className="free-study-materials-card-index">{String(index + 1).padStart(2, '0')}</span>
              </div>

              <h3>{item.title}</h3>

              <p>{item.description}</p>

              <a
                className="free-study-materials-button"
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${item.buttonText} for ${item.title} in a new tab`}
              >
                <span>{item.buttonText}</span>
                <span className="free-study-materials-button-arrow" aria-hidden="true">
                  ↗
                </span>
              </a>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </ScrollReveal>
  );
};

export default FreeStudyMaterials;
