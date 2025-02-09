import CategorySlider from "../CategorySlider/CategorySlider";
import MainSlider from "../MainSlider/MainSlider";
import ReacntProducts from "../ReacntProducts/ReacntProducts";

export default function Home() {
  return (
    <>
      <div className="mb-7 mt-2">
        <MainSlider />
        <CategorySlider />
      </div>
      <ReacntProducts />
    </>
  );
}
