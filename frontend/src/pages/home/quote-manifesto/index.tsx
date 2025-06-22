import React from "react";
import styles from "./QuoteManifesto.module.scss";

interface QuoteProps {
  quote: string;
  quoteAuthor: string;
}

const QuoteManifesto: React.FC<QuoteProps> = ({
  quote,
  quoteAuthor,
}) => {
  return (
    <section className={styles.quote_manifesto}>
      <h1>{quote}</h1>
      <p>{quoteAuthor}</p>
    </section>
  );
};

export default QuoteManifesto;
