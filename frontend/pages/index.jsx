import Button from '../src/components/Button/Button';
import Slider from '../src/components/SlideList/Slider';
import Title from '../src/components/Title/Title';

const HomePage = () => (
  <div className="content">
    <h1>
      Тестовое задание:
      <span className="text-blue">Слайдер</span>
    </h1>
    <Slider />
  </div>
);

export default HomePage;
