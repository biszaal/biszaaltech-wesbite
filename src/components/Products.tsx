import React from 'react';
import { useReveal } from '../hooks/useReveal';
import './Products.css';

const roadmap = [
  { title: 'Open Banking connections', status: 'In development' },
  { title: 'Android app', status: 'In development' },
  { title: 'Richer analytics', status: 'Planned' },
];

const Products: React.FC = () => {
  const headRef = useReveal<HTMLDivElement>();
  const gridRef = useReveal<HTMLDivElement>();
  const roadRef = useReveal<HTMLDivElement>();

  return (
    <section id="products" className="products">
      <div className="container">
        <div className="products-head reveal" ref={headRef}>
          <span className="eyebrow">The product</span>
          <h2>One app, a clear picture of your money.</h2>
          <p className="products-lead">
            Expenzez keeps expense tracking honest and simple: you add transactions,
            it shows you what's really happening. No noise, no upsells — the core is
            free.
          </p>
        </div>

        <div className="bento reveal" ref={gridRef}>
          <article className="shell bento-card bento-card--wide">
            <div className="shell-core bento-core">
              <div className="bento-chart" aria-hidden="true">
                <div className="bento-bars">
                  <span style={{ height: '46%' }} />
                  <span style={{ height: '72%' }} />
                  <span style={{ height: '38%' }} />
                  <span style={{ height: '84%' }} />
                  <span style={{ height: '58%' }} />
                  <span style={{ height: '64%' }} />
                  <span style={{ height: '92%' }} />
                  <span style={{ height: '49%' }} />
                </div>
                <div className="bento-chart-label mono-meta">Mar — Jul spending</div>
              </div>
              <h3>Spending, made visible</h3>
              <p>
                Charts and monthly summaries that show where your money actually goes —
                by category, merchant, and month.
              </p>
            </div>
          </article>

          <article className="shell bento-card">
            <div className="shell-core bento-core">
              <span className="bento-glyph" aria-hidden="true">✎</span>
              <h3>Manual entry</h3>
              <p>Add a transaction in seconds. Fast enough that you'll actually do it.</p>
            </div>
          </article>

          <article className="shell bento-card">
            <div className="shell-core bento-core">
              <span className="bento-glyph" aria-hidden="true">⇅</span>
              <h3>CSV import &amp; export</h3>
              <p>Bring in bank statements in bulk, and take your data anywhere — it's yours.</p>
            </div>
          </article>

          <article className="shell bento-card">
            <div className="shell-core bento-core">
              <span className="bento-glyph" aria-hidden="true">▦</span>
              <h3>Smart categories</h3>
              <p>Sensible defaults plus your own custom categories, so reports mean something.</p>
            </div>
          </article>

          <article className="shell bento-card">
            <div className="shell-core bento-core">
              <span className="bento-glyph" aria-hidden="true">◈</span>
              <h3>Private by design</h3>
              <p>Encrypted in transit and at rest. Your financial data is never for sale.</p>
            </div>
          </article>
        </div>

        <div className="roadmap reveal" ref={roadRef}>
          <h3 className="roadmap-title">What's next</h3>
          <ol className="roadmap-list">
            {roadmap.map((item, i) => (
              <li key={item.title} className="roadmap-item">
                <span className="roadmap-index mono-meta">{String(i + 1).padStart(2, '0')}</span>
                <span className="roadmap-name">{item.title}</span>
                <span className="roadmap-status mono-meta">{item.status}</span>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
};

export default Products;
