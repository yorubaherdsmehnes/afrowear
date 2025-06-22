import React from 'react';
import styles from './MediaLoader.module.scss';

interface MediaLoaderProps {
  style?: React.CSSProperties;
}

const MediaLoader: React.FC<MediaLoaderProps> = ({ style }) => {
  return (
    <div className={styles.mediaLoader} style={style}>
      <div className={styles.shimmer}></div>
    </div>
  );
};

export default MediaLoader;