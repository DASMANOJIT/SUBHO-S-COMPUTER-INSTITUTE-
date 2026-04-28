import React, { useEffect, useMemo, useState } from 'react';
import { FaAward, FaGraduationCap } from 'react-icons/fa';
import { GiGraduateCap } from 'react-icons/gi';
import ScrollReveal from '../scrollReveal/ScrollReveal.jsx';
import ResultsSkeleton from '../skeletons/ResultsSkeleton.jsx';
import Title from '../title/title.jsx';
import './pastResults.css';

const boardOptions = [
  { id: 'icse', label: 'ICSE', icon: FaAward },
  { id: 'isc', label: 'ISC', icon: FaGraduationCap },
  { id: 'cbse', label: 'CBSE', icon: GiGraduateCap },
];

const yearOptions = ['2025', '2024', '2023'];

const resultsData = {
  icse: {
    2025: [
      { rank: 1, name: 'Student Name', year: '2025', score: '95%', remarks: 'ICSE Topper' },
      { rank: 2, name: 'Student Name', year: '2025', score: '93%', remarks: 'Outstanding Result' },
      { rank: 3, name: 'Student Name', year: '2025', score: '91%', remarks: 'Merit Performance' },
      { rank: 4, name: 'Student Name', year: '2025', score: '89%', remarks: 'Strong Academic Record' },
      { rank: 5, name: 'Student Name', year: '2025', score: '87%', remarks: 'Consistent Performer' },
      { rank: 6, name: 'Student Name', year: '2025', score: '85%', remarks: 'Results to be updated' },
    ],
    2024: [],
    2023: [],
  },
  isc: {
    2025: [
      { rank: 1, name: 'Student Name', year: '2025', score: '94%', remarks: 'ISC Distinction' },
      { rank: 2, name: 'Student Name', year: '2025', score: '92%', remarks: 'Excellent Performance' },
      { rank: 3, name: 'Student Name', year: '2025', score: '90%', remarks: 'Subject Excellence' },
    ],
    2024: [],
    2023: [],
  },
  cbse: {
    2025: [
      { rank: 1, name: 'Student Name', year: '2025', score: '96%', remarks: 'CBSE Top Result' },
      { rank: 2, name: 'Student Name', year: '2025', score: '93%', remarks: 'Excellent Progress' },
      { rank: 3, name: 'Student Name', year: '2025', score: '89%', remarks: 'Strong Score' },
    ],
    2024: [],
    2023: [],
  },
};

const PastResults = () => {
  const [activeBoard, setActiveBoard] = useState('icse');
  const [activeYear, setActiveYear] = useState('2025');
  const [isTableReady, setIsTableReady] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return undefined;

    const frameId = window.requestAnimationFrame(() => {
      setIsTableReady(true);
    });

    return () => window.cancelAnimationFrame(frameId);
  }, []);

  const selectedResults = useMemo(
    () => resultsData[activeBoard]?.[activeYear] ?? [],
    [activeBoard, activeYear]
  );

  return (
    <ScrollReveal as="section" className="past-results" aria-label="Past Results">
      <Title subtitle="Academic Highlights" title="Past Results" />
      <p className="past-results-intro">
        Celebrating the consistent performance and academic achievements of our students.
      </p>

      <div className="past-results-board-row" role="tablist" aria-label="Boards">
        {boardOptions.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            type="button"
            className={`past-results-board-card ${activeBoard === id ? 'active' : ''}`}
            onClick={() => setActiveBoard(id)}
            role="tab"
            aria-selected={activeBoard === id}
          >
            <span className="past-results-board-icon" aria-hidden="true">
              <Icon />
            </span>
            <span>{label}</span>
          </button>
        ))}
      </div>

      <div className="past-results-panel smooth-card hover-lift">
        <div className="past-results-year-row" role="tablist" aria-label="Result years">
          {yearOptions.map((year) => (
            <button
              key={year}
              type="button"
              className={`past-results-year-tab ${activeYear === year ? 'active' : ''}`}
              onClick={() => setActiveYear(year)}
              role="tab"
              aria-selected={activeYear === year}
            >
              {year}
            </button>
          ))}
        </div>

        {!isTableReady ? (
          <ResultsSkeleton />
        ) : selectedResults.length ? (
          <div className="past-results-table-wrap">
            <div className="past-results-table-scroll">
              <table className="past-results-table">
                <thead>
                  <tr>
                    <th>Rank / Sl. No.</th>
                    <th>Student Name</th>
                    <th>Year</th>
                    <th>Percentage / Score</th>
                    <th>Remarks</th>
                  </tr>
                </thead>
                <tbody>
                  {selectedResults.map((result) => (
                    <tr key={`${activeBoard}-${activeYear}-${result.rank}-${result.name}`}>
                      <td>{result.rank}</td>
                      <td>{result.name}</td>
                      <td>{result.year}</td>
                      <td>{result.score}</td>
                      <td>{result.remarks}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <div className="past-results-empty-state">
            <p>Results will be updated soon.</p>
          </div>
        )}
      </div>
    </ScrollReveal>
  );
};

export default PastResults;
