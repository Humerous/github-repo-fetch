import React from 'react';
import Head from 'next/head';
import styles from './About.module.scss';

const About = () => {
  const journey = [
    {
      year: '2020',
      title: 'Original bootcamp build',
      text: 'Built during the Hyperion Development Bootcamp as a working GitHub repository search application.',
    },
    {
      year: '2026',
      title: 'Legacy recovery',
      text: 'The original project was recovered, repaired and preserved before any modernisation work began.',
    },
    {
      year: '2026',
      title: 'Responsive baseline',
      text: 'Fixed-width layouts and mobile overflow were corrected while keeping the original application working.',
    },
    {
      year: '2026',
      title: 'Portfolio repositioning',
      text: 'The project was reframed as a legacy-modernisation case study rather than presented as a newly built app.',
    },
    {
      year: '2026',
      title: 'UI and brand modernisation',
      text: 'The interface was rebuilt around the original charcoal and gold identity with a new logo, responsive navigation and clearer repository discovery flow.',
    },
    {
      year: '2026',
      title: 'Modernised application',
      text: 'The original idea now runs on a current React and Next.js foundation while preserving its history, API purpose and multi-framework story.',
    },
  ];

  const originalStack = [
    'Next.js 9',
    'React 16',
    'Bulma 0.9',
    'Sass',
    'Axios 0.20',
    'GitHub REST API',
    'JavaScript',
  ];

  const modernStack = [
    'Next.js 16',
    'React 19',
    'Bulma 1',
    'Sass',
    'Axios 1',
    'React Icons 5',
    'GitHub REST API',
    'JavaScript',
  ];

  return (
    <>
      <Head>
        <title>About | GitHub Repo Fetch</title>
      </Head>

      <article className={styles.page}>
        <p className={styles.eyebrow}>About GitHub Repo Fetch</p>
        <h1>From a 2020 bootcamp project to a modern GitHub discovery app.</h1>
        <p className={styles.intro}>
          Originally built in 2020 as a Hyperion Development Bootcamp project, GitHub Repo Fetch has been recovered, preserved and modernised in 2026. The goal was not to erase the original work, but to show how an older application can be understood, repaired and adapted to a current frontend stack.
        </p>

        <section className={styles.section}>
          <h2>What it does</h2>
          <ul className={styles.list}>
            <li>Search GitHub repositories</li>
            <li>Filter by programming language</li>
            <li>Inspect repository details</li>
            <li>Explore repository owners</li>
          </ul>
        </section>

        <section className={styles.section}>
          <div className={styles.sectionHeading}>
            <div>
              <p className={styles.sectionEyebrow}>2020 → 2026</p>
              <h2>Project journey</h2>
            </div>
            <p>
              Preserve what worked. Understand the legacy code. Modernise the experience without pretending the project started today.
            </p>
          </div>

          <div className={styles.journey}>
            {journey.map((step) => (
              <article className={styles.journeyCard} key={`${step.year}-${step.title}`}>
                <span className={styles.year}>{step.year}</span>
                <h3>{step.title}</h3>
                <p>{step.text}</p>
              </article>
            ))}
          </div>
        </section>

        <section className={styles.section}>
          <h2>Created by</h2>
          <div className={styles.creatorBlock}>
            <p>Chameleon Unicode Studios</p>
            <span>GitHub Repo Fetch is a Chameleon Unicode Studios project.</span>
          </div>
        </section>

        <section className={styles.section}>
          <div className={styles.sectionHeading}>
            <div>
              <p className={styles.sectionEyebrow}>Framework adaptation</p>
              <h2>Technology</h2>
            </div>
            <p>
              The modernisation keeps the project useful as evidence of working across framework generations rather than rebuilding every portfolio project with the same stack.
            </p>
          </div>

          <div className={styles.stackCompare}>
            <div className={styles.stackPanel}>
              <span className={styles.stackLabel}>Original 2020 stack</span>
              <div className={styles.stack}>
                {originalStack.map((item) => (
                  <span key={item}>{item}</span>
                ))}
              </div>
            </div>

            <div className={styles.stackPanel}>
              <span className={styles.stackLabel}>Modernised 2026 stack</span>
              <div className={styles.stack}>
                {modernStack.map((item) => (
                  <span key={item}>{item}</span>
                ))}
              </div>
            </div>
          </div>
        </section>
      </article>
    </>
  );
};

export default About;
