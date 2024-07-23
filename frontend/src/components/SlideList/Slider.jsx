import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import Button from '../Button/Button';
import Title from '../Title/Title';
import styles from './slider.module.css';

const SlideList = () => {
  const [data, setData] = useState([]);
  const [slideWidth, setSlideWidth] = useState(0);
  const [activeId, setActiveId] = useState(0);
  const slide = useRef(null);
  const getData = async () => {
    try {
      const response = await axios.get('http://localhost:8080/slide');
      setData(response.data);
    } catch (error) {
      console.log(error, 'Произошла ошибка');
    }
  };

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    if (!slide.current) return;
    setSlideWidth(slide.current.getBoundingClientRect().width);
    const handler = (event) => {
      setSlideWidth(slide.current.getBoundingClientRect().width);
    };
    document.addEventListener('resize', handler);

    return () => document.removeEventListener('resize', handler);
  }, [data]);

  const prev = () => {
    setActiveId((activeId) => {
      if (activeId > 0) {
        return activeId - 1;
      } else {
        return activeId;
      }
    });
  };
  const next = () => {
    setActiveId((activeId) => {
      if (activeId < data.length - 1) {
        return activeId + 1;
      } else {
        return activeId;
      }
    });
  };

  return (
    <div className={styles.slider__wrapper}>
      <div className={styles.top}>
        <Title>Есть всё, чтобы наполнить жизнь счастьем </Title>
        <div className={styles.btns}>
          <Button direction="left" onClick={prev} disable={activeId === 0} />
          <Button
            direction="right"
            onClick={next}
            disable={activeId === data.length - 1}
          />
        </div>
      </div>
      <div
        className={styles.slider}
        style={{
          transform: `translate3d(${
            -slideWidth * activeId + slideWidth
          }px, 0, 0)`,
        }}
      >
        {data.map((item, idx) => (
          <div
            ref={idx === activeId ? slide : null}
            className={`${styles.slide} ${
              idx === activeId ? ` ${styles.activeSlide}` : ''
            } ${idx === activeId + 1 ? ` ${styles.nextSlide}` : ''} ${
              idx === activeId - 1 ? ` ${styles.prevSlide}` : ''
            }`}
            key={item.id}
          >
            <img className={styles.img} src={item.imageUrl} alt={item.title} />
            <div className={styles.info}>
              <h2 className={styles.title}>{item.title}</h2>
              <p className={styles.text}>{item.text}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SlideList;
